const User = require("../Models/User");
const Item = require("../Models/Item");
const Order = require("../Models/Order");

module.exports.item = async (req, res) => {
    let data = await Item.find();
    res.status(200).json(data);
}

module.exports.getdata = async (req, res) => {
    let { id } = req.params;
    let data = await Item.findById(id);
    res.status(200).json(data);
}

module.exports.update = async (req, res) => {
    const { Itemname, ItemPrice, ItemImage } = req.body;

    try {
        if (!Itemname || !ItemPrice || !ItemImage) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            { Itemname, ItemPrice, ItemImage },
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.json(updatedItem);
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports.deletedata = async (req, res) => {
    let { id } = req.params;
    await Item.findOneAndDelete(id);
    res.status(200).json({ data: "succesfully deleted !" })
}