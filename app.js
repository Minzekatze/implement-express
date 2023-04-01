const fs = require("fs");
const axios = require("axios");
const express = require("express");
const app = express();
const port = 9000;
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.set("view engine", "ejs");

//6
app.use(methodOverride("X-HTTP-Method-Override"));

//2
app.put("/", (req, res) => {
  res.sendFile("./index.html", { root: __dirname });
});

//3
app.delete("/", (req, res) => {
  res.json({ good: "yep" });
});

//4
app.get("/test-ejs", (req, res) => {
  res.render("index", { myTitle: "my first Title" });
});

//5
app.get("/test-ejs2", (req, res) => {
  res.render("index2", { users: ["Bob", "John", "Jane"] });
});

//7

app.get("/showPost2", (req, res) => {
  res.render("index3");
});

app.post("/showPost2", (req, res) => {
  const inputFirst = req.body.first;
  const inputLast = req.body.last;
  res.render("submit", { myfirst: inputFirst, mylast: inputLast });
});

app.post("/posting", (req, res) => {
  res.render("index3");
  console.log(req.body);
});

//8
app.get("/showGet", (req, res) => {
  res.render("index4");
  console.log(req.query);
});

//9
app.get("/number/:id", (req, res) => {
  const myID = parseInt(req.params.id);
  res.render("index5", { numberDisplay: myID });
});

//10//11
app.get("/postlist", (req, res) => {
  axios
    .get("http://jsonplaceholder.typicode.com/posts/1")
    .then((response) => {
      const myData = JSON.stringify(response.data);
      fs.writeFile("post.json", myData, (err) => {
        if (err) return console.log(err);
        console.log(`The file has been saved and --> ${myData} <-- was added!`);
      });

      res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Document</title>
      </head>
      <body>
        <h1>Post number ${response.data.id}</h1>
        <p>userId: ${response.data.userId}</p>
        <p>title: ${response.data.title}</p>
        <p>body: ${response.data.body}</p>
      </body>
      </html>`);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
