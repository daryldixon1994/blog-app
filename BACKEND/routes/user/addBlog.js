const Blog = require("../../models/Blog");
const fs = require("fs");
const path = require("path");
const Binary = require("mongoose").Binary
module.exports = async (req, res) => {
  try {
    let { title, body, desc } = req.body;
    let { id } = req.params;
    const imgBuffer = fs.readFileSync(
      path.join(
        "D:/Dévelopement WEB/GOMYCODE Coaching/Full Stack/BLOG-APP/BACKEND/",
        "uploads",
        req.file.filename
      )
    );
    const base64Image = await imgBuffer.toString("base64");
    const newBlog = new Blog({
      title,
      body,
      desc,
      user: id,
      imgUrl: base64Image,
    });
    await newBlog.save();
    res.status(200).json({ status: true, message: "Your blog was added successfully" });
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
