const mongoose = require("mongoose");

// MongoDB Connection Function

// Mongoose Schema Definition
const Itemschema = new mongoose.Schema({
    Itemname: {
        type: String,
        required: true,
    },
    ItemImage: {
        type: String,
        required: true,
    },
    ItemPrice: {
        type: Number,
        required: true
    },
    Item_dis: {
        type: String,
        required: true,
    },
    ItemCategory: {
        type: String,
        required: true,
        enum: ['electronics', 'fashion', 'home'],
    }
});

const Item = mongoose.model("Item", Itemschema);

// Sample Data with Corrected Image Links
const sampleItems = [
    {
        Itemname: "Wireless Bluetooth Headphones",
        ItemImage: "https://images.pexels.com/photos/374777/pexels-photo-374777.jpeg?auto=compress&cs=tinysrgb&w=600",
        ItemPrice: 2999,
        Item_dis: "Premium sound with noise cancellation and 40-hour battery life.",
        ItemCategory: "electronics"
    },
    {
        Itemname: "Smart Fitness Band",
        ItemImage: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=600",
        ItemPrice: 1799,
        Item_dis: "Track steps, heart rate, and sleep with stylish design.",
        ItemCategory: "electronics"
    },


    {
        Itemname: "Men's Analog Watch",
        ItemImage: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=600",
        ItemPrice: 2299,
        Item_dis: "Elegant stainless steel watch for formal and casual wear.",
        ItemCategory: "fashion"
    },


    {
        Itemname: "Sunglasses for Men & Women",
        ItemImage: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=600",
        ItemPrice: 799,
        Item_dis: "UV-protected sunglasses with sleek, unisex design.",
        ItemCategory: "fashion"
    },
    {
        Itemname: "Electric Kettle",
        ItemImage: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&cs=tinysrgb&w=600",
        ItemPrice: 999,
        Item_dis: "1.5L stainless steel electric kettle with auto shut-off.",
        ItemCategory: "home"
    },
    {
        Itemname: "Casual Cotton T-shirt",
        ItemImage: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600",
        ItemPrice: 499,
        Item_dis: "100% cotton T-shirt for men, comfortable and breathable.",
        ItemCategory: "fashion"
    },
    {
        Itemname: "Office Chair",
        ItemImage: "https://images.pexels.com/photos/1438752/pexels-photo-1438752.jpeg?auto=compress&cs=tinysrgb&w=600",
        ItemPrice: 6499,
        Item_dis: "Ergonomic mesh chair with lumbar support and adjustable height.",
        ItemCategory: "home"
    },

    {
        Itemname: "Yoga Mat",
        ItemImage: "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=600",
        ItemPrice: 899,
        Item_dis: "Non-slip yoga mat for fitness and home workout routines.",
        ItemCategory: "home"
    },
    {
        Itemname: "Smartphone Tripod Stand",
        ItemImage: "https://images.pexels.com/photos/2115217/pexels-photo-2115217.jpeg?auto=compress&cs=tinysrgb&w=600",
        ItemPrice: 599,
        Item_dis: "Lightweight and adjustable tripod for mobile photography.",
        ItemCategory: "electronics"
    },
    {
        Itemname: "LED Table Lamp",
        ItemImage: "https://images.pexels.com/photos/1571450/pexels-photo-1571450.jpeg?auto=compress&cs=tinysrgb&w=600",
        ItemPrice: 899,
        Item_dis: "Rechargeable LED lamp with brightness control.",
        ItemCategory: "home"
    },
    {
        Itemname: "Wireless Router",
        ItemImage: "https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=600",
        ItemPrice: 2399,
        Item_dis: "Dual-band WiFi router with high-speed internet support.",
        ItemCategory: "electronics"
    },
    {
        Itemname: "Coffee Mug Set (Pack of 2)",
        ItemImage: "https://images.pexels.com/photos/208463/pexels-photo-208463.jpeg?auto=compress&cs=tinysrgb&w=600",
        ItemPrice: 399,
        Item_dis: "Ceramic coffee mugs with matte finish and ergonomic handle.",
        ItemCategory: "home"
    },

    {
        Itemname: "Hair Dryer",
        ItemImage: "https://images.pexels.com/photos/534153/pexels-photo-534153.jpeg?auto=compress&cs=tinysrgb&w=600",
        ItemPrice: 1199,
        Item_dis: "Compact and foldable hair dryer with cold air mode.",
        ItemCategory: "fashion"
    },
    {
        Itemname: "Stainless Steel Bottle",
        ItemImage: "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=600",
        ItemPrice: 699,
        Item_dis: "Leak-proof 1L insulated bottle for hot and cold beverages.",
        ItemCategory: "home"
    },
    {
        Itemname: "Women's Handbag",
        ItemImage: "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=compress&cs=tinysrgb&w=600",
        ItemPrice: 1699,
        Item_dis: "Stylish handbag with spacious compartments and zipper closure.",
        ItemCategory: "fashion"
    },

];

const extraItems = [
    {
        Itemname: "Digital Bathroom Scale",
        ItemImage: "https://images.pexels.com/photos/3963087/pexels-photo-3963087.jpeg?auto=compress&cs=tinysrgb&w=600",
        ItemPrice: 1099,
        Item_dis: "Accurate digital scale with backlit display for home use.",
        ItemCategory: "home"
    },
    {
        Itemname: "Men's Sports Shoes",
        ItemImage: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
        ItemPrice: 2499,
        Item_dis: "Lightweight running shoes with extra cushioning.",
        ItemCategory: "fashion"
    },
    {
        Itemname: "Electric Rice Cooker",
        ItemImage: "https://images.pexels.com/photos/4194620/pexels-photo-4194620.jpeg?auto=compress&cs=tinysrgb&w=600",
        ItemPrice: 1799,
        Item_dis: "Easy-to-use rice cooker with keep-warm function.",
        ItemCategory: "home"
    },
    {
        Itemname: "Laptop Cooling Pad",
        ItemImage: "https://images.pexels.com/photos/3782222/pexels-photo-3782222.jpeg?auto=compress&cs=tinysrgb&w=600",
        ItemPrice: 899,
        Item_dis: "Silent cooling pad with adjustable fans for laptops.",
        ItemCategory: "electronics"
    },
    {
        Itemname: "Women's Sling Bag",
        ItemImage: "https://images.pexels.com/photos/8613037/pexels-photo-8613037.jpeg?auto=compress&cs=tinysrgb&w=600",
        ItemPrice: 899,
        Item_dis: "Trendy sling bag with zipper and adjustable strap.",
        ItemCategory: "fashion"
    },
    {
        Itemname: "Smart LED Bulb",
        ItemImage: "https://images.pexels.com/photos/577514/pexels-photo-577514.jpeg?auto=compress&cs=tinysrgb&w=600",
        ItemPrice: 499,
        Item_dis: "WiFi-enabled LED bulb, supports app and voice control.",
        ItemCategory: "home"
    },
    {
        Itemname: "Bluetooth Keyboard",
        ItemImage: "https://images.pexels.com/photos/1229455/pexels-photo-1229455.jpeg?auto=compress&cs=tinysrgb&w=600",
        ItemPrice: 1399,
        Item_dis: "Portable Bluetooth keyboard for tablets and phones.",
        ItemCategory: "electronics"
    },
    {
        Itemname: "Sports Water Bottle",
        ItemImage: "https://images.pexels.com/photos/416780/pexels-photo-416780.jpeg?auto=compress&cs=tinysrgb&w=600",
        ItemPrice: 349,
        Item_dis: "750ml BPA-free bottle with flip-top lid for active use.",
        ItemCategory: "home"
    },

];


// Seeding Function
const adddata = async () => {
    await Item.deleteMany({});
    await Item.insertMany(sampleItems);
    await Item.insertMany(extraItems);
    console.log("Data added successfully with categories.");
};

// Uncomment to seed data:
// adddata().catch(err => {
//     console.error("Error seeding data:", err);
// });

module.exports = Item;
