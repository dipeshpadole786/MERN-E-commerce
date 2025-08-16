const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    name: String,
    number: String,
    address: String,
    city: String,
    state: String,
    Zip: String,
});

module.exports = mongoose.model("Address", addressSchema);
