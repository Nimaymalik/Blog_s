const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },

  author: {
    type: String,
    trim: true,
    required: true,
  },
  comment: {
    type: String,
    trim: true,
    required: true,
  },
});
const Blog = mongoose.model("blog",blogSchema);
module.exports=Blog;