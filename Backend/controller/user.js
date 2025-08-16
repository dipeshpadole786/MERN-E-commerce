const User = require("../Models/User");
module.exports.getUser = async (req, res) => {
    let { username } = req.params;
    console.log(username + "  username ");
    const user = await User.findOne({ username }).populate("Address");
    res.status(200).json({ data: user });
}