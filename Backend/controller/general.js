const User = require("../Models/User");
const Item = require("../Models/Item");
const Order = require("../Models/Order");
const Address = require("../Models/Address");
const nodemailer = require("nodemailer");




module.exports.signup = async (req, res) => {
    let { username, email, password } = req.body;
    console.log(username, email, password);
    let user = new User({
        username: username,
        email: email,
    });
    let newUseer = await User.register(user, password);

    res.status(200).json({ message: "User signup succesfully ! " });
}

module.exports.login = async (req, res) => {
    console.log(req.user); let data = req.user;
    res.status(200).json({ message: "User Login succesfully ! ", data: data });
}

module.exports.cart = async (req, res) => {
    let { id } = req.params;
    let { username } = req.body;
    let item = await Item.findById(id);
    let user = await User.findOne({ username: username });
    console.log(item._id);
    let data = await user.cart.push(item._id);
    console.log(data);
    await user.save();
    res.status(200).json({ message: "Item added in cart succesfully !" });
}
module.exports.cartpost = async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }

        const user = await User.findOne({ username })
            .populate("cart");   // ✅ full item docs
        console.log(user);

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ user: user });
    } catch (err) {
        console.error("Fetch‑cart error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.cartRemove = async (req, res) => {
    let { username, itemId } = req.body;
    console.log(itemId);
    const user = await User.findOneAndUpdate(
        { username: username },
        { $pull: { cart: itemId } },
        { new: true }
    )
    res.status(200).json({ message: "Removed Item from your cart" });
}


// ✅ Payment Controller
module.exports.payment = async (req, res) => {
    const {
        itemId,
        itemName,
        itemPrice,
        itemImage,
        fullName,
        phone,
        address,
        city,
        state,
        zip,
        username,
        email
    } = req.body;

    // ✅ Setup transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // ✅ Email templates
    const msgToOwner = `
    📦 New Order Received!

    Customer: ${fullName}
    Phone: ${phone}
    Address: ${address}, ${city}, ${state}, ${zip}

    Item: ${itemName}
    Price: ₹${itemPrice}
    Username: ${username}
    `;

    const msgToCustomer = `
    Hi ${fullName},

    ✅ Thank you for your order!

    Item: ${itemName}
    Price: ₹${itemPrice}
    Delivery Address: ${address}, ${city}, ${state}, ${zip}

    We’ll deliver your order soon 🚚

    – Dipesh's E-Commerce Team
    `;

    try {
        // Email to owner
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.OWNER_EMAIL,  // shop owner email
            subject: "🛒 New Customer Order",
            text: msgToOwner,
        });

        // Email to customer
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "✅ Order Confirmation",
            text: msgToCustomer,
        });

        // ✅ Save Order in DB
        const new_order = new Order({
            itemId,
            itemName,
            itemPrice,
            itemImage,
        });

        await new_order.save();

        // ✅ Push order to user
        const user = await User.findOne({ email });
        if (user) {
            user.order.push(new_order._id);
            await user.save();
        }

        res.json({ success: true, message: "Order confirmed and emails sent." });
    } catch (error) {
        console.error("Email error:", error);
        res.status(500).json({ success: false, message: "Email sending failed" });
    }
};

module.exports.paymentprocces = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Item.findById(id);
        if (!data) return res.status(404).json({ error: "Item not found" });

        res.status(200).json(data);
    } catch (error) {
        console.error("Error in /payment/:id", error);
        res.status(500).json({ error: "Server error" });
    }
}

module.exports.addres = async (req, res) => {
    try {
        const { username } = req.params;
        const { phone, address, fullName, city, state, zip } = req.body;

        const user = await User.findOne({ username });

        if (!user) return res.status(404).json({ error: "User not found" });

        if (user.Address) {
            const existingAddress = await Address.findById(user.Address);
            if (existingAddress) {
                existingAddress.name = fullName;
                existingAddress.number = phone;
                existingAddress.address = address;
                existingAddress.city = city;
                existingAddress.state = state;
                existingAddress.Zip = zip;
                await existingAddress.save();
                return res.status(200).json({ data: "Updated existing address successfully" });
            }
        }

        const newAddress = new Address({
            name: fullName,
            number: phone,
            address,
            city,
            state,
            Zip: zip,
        });

        await newAddress.save();
        user.Address = newAddress._id;
        await user.save();

        res.status(200).json({ data: "Saved new address successfully" });
    } catch (error) {
        console.error("Error saving address:", error);
        res.status(500).json({ error: "Server error" });
    }
}

module.exports.user_by_username = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username }).populate("Address");
        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Server error" });
    }
}

module.exports.getOrder = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username }).populate("order");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        console.log("Populated orders:", user.order); // ✅ Must show full documents
        res.status(200).json({ orders: user.order });
    } catch (err) {
        console.error("Fetch order error:", err);
        res.status(500).json({ error: "Server error" });
    }
}