const User = require("../../models/User");
const fs = require("fs");
const path = require("path");
module.exports = async (req, res) => {
  try {
    let { id } = req.query;
    const imgBuffer = fs.readFileSync(
      path.join(
        __dirname.substr(0, __dirname.length - 11),
        "uploads",
        req.file.filename
      )
    );
    const base64Image = await imgBuffer.toString("base64");
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: { imgUrl: base64Image },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: true,
      message: "Your profile picture has been updated successfully",
    });
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
