const mongoose = require("mongoose")




const OrderSchema = new mongoose.Schema({
    itemId: String,
    itemName: String,
    itemPrice: String,
    itemImage: String,
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;