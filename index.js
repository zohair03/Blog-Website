import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";


const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const blogArrary = new Array();

app.get("/", (req, res) => {
  res.render("homePage.ejs");
});

app.post("/writeBlogPage", (req, res) => {
  res.render("writeBlogPage.ejs");
});

app.post("/createBlog", (req, res) => {
  const blogAuthor = req.body["author"];
  const blogTilte = req.body["title"];
  const blogContent = req.body["content"];

  blogArrary.push({
    author: blogAuthor,
    title: blogTilte,
    content: blogContent,
  });

  console.log(blogArrary);

  res.render("homePage.ejs", {
    data: blogArrary,
  });
});

app.post("/edit", (req, res) => {
  const index = req.body["index"];

  const author = blogArrary[index].author;
  const title = blogArrary[index].title;
  const content = blogArrary[index].content;

  console.log(index);
  res.render("editBlogPage.ejs", {
    author: author,
    title: title,
    content: content,
    index: index,
  });
});

app.post("/updatePost", (req, res) => {
  const author = req.body["author"];
  const title = req.body["title"];
  const content = req.body["content"];
  const index = req.body["index"];

  blogArrary[index].author = author;
  blogArrary[index].title = title;
  blogArrary[index].content = content;

  res.render("homePage.ejs", {
    data: blogArrary,
  });
});

app.post("/", (req, res) => {
  
  const index = req.body["index"];
  blogArrary.splice(index, 1);
  console.log(blogArrary + "del");
  res.render("homePage.ejs", {
    data: blogArrary,
  });
  
});

app.listen(port, () => {
  console.log(`Listening on ${port}.`);
});
