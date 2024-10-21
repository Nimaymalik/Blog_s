const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const PORT = 5454;
const Blog = require("./models/blogs");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

mongoose
  .connect(
    "mongodb+srv://idname:<password>@cluster0.pld6z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connection found");
  })
  .catch((err) => {
    console.log("Connection not found", err);
  });

app.get("/blogs/new", (req, res) => {
  res.render("new");
});

// Adding a blog
app.post("/blogs", async (req, res) => {
  let { title, author, comment } = req.body;
  try {
    await Blog.create({ title, author, comment });
    res.redirect("/blogs");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating blog");
  }
});

// getting a blog on frontend
app.get("/blogs", async (req, res) => {
  try {
    let allBlogs = await Blog.find({});
    res.render("index", { allBlogs });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving blogs");
  }
});

// show a blog
app.get("/blogs/:id", async (req, res) => {
  let { id } = req.params;
  let foundProduct = await Blog.findById(id);
  res.render("show", { foundProduct });
});

// edit all the blog
app.get("/blogs/:id/edit", async (req, res) => {
  let { id } = req.params;
  let foundProduct = await Blog.findById(id);
  res.render("edit", { foundProduct });
});

// update the data
app.patch("/blogs/:id", async (req, res) => {
  let { id } = req.params;
  let { comment } = req.body;

  await Blog.findByIdAndUpdate(id, { comment });
  res.redirect("/blogs");
});

// delete the data
app.delete("/blogs/:id", async (req, res) => {
  let { id } = req.params;
  await Blog.findByIdAndDelete(id);
  res.redirect("/blogs");
});

app.listen(PORT, () => {
  console.log("MINI_PROJECT running on port " + PORT);
});
