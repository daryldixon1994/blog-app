const Blog = require("../../models/Blog");
const fs = require("fs")
const path = require("path")
module.exports = async (req, res) => {
  try {
    let { userId, blogId } = req.query;
    const imgBuffer = fs.readFileSync(
      path.join(
        __dirname.substr(0, __dirname.length - 11),
        "uploads",
        req.file.filename
      )
    );
    const base64Image = await imgBuffer.toString("base64");
    const newBlog = await Blog.findOneAndUpdate(
      { user: userId, _id: blogId },
      {
        $set: { imgUrl: base64Image },
      },
      { new: true }
    );
    res.status(200).json({ status: true, data: newBlog });
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
