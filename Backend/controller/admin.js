const Item = require("../Models/Item");
const Order = require("../Models/Order");
const User = require("../Models/User");

module.exports.getProduct = async (req, res) => {
    try {
        const result = await Order.aggregate([
            {
                $group: {
                    _id: "$itemId",
                    itemName: { $first: "$itemName" },
                    itemPrice: { $first: "$itemPrice" },
                    itemImage: { $first: "$itemImage" },
                    totalOrders: { $sum: 1 }
                }
            },
            { $sort: { totalOrders: -1 } } // optional: sort by most ordered
        ]);

        res.json(result);
    } catch (err) {
        console.error("Failed to fetch product order count:", err);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports.additem = async (req, res) => {
    try {
        const product = new Item(req.body);
        await product.save();
        res.status(201).json({ message: "Item added successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to add item", error: err });
    }
}
module.exports.dashboard = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Item.countDocuments();
        const totalUsers = await User.countDocuments();

        // Get top selling products
        const topProducts = await Order.aggregate([
            {
                $group: {
                    _id: "$itemId",
                    itemName: { $first: "$itemName" },
                    itemPrice: { $first: "$itemPrice" },
                    itemImage: { $first: "$itemImage" },
                    totalOrders: { $sum: 1 }
                }
            },
            { $sort: { totalOrders: -1 } },
            { $limit: 5 } // top 5 products
        ]);

        res.json({
            totalOrders,
            totalProducts,
            totalUsers,
            topProducts
        });

    } catch (err) {
        console.error("Failed to fetch dashboard summary:", err);
        res.status(500).json({ message: "Server error" });
    }
};