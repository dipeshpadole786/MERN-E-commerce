const mongoose = require("mongoose");
const Item = require("./Item");
const Schema = mongoose.schema;
const passport_local = require("passport-local-mongoose");
const Address = require("./Address");

const Userschema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item",
        }
    ],
    order: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        }
    ],
    Address: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
        }
    ],
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }

});

Userschema.plugin(passport_local);
const User = mongoose.model("User", Userschema);

module.exports = User;