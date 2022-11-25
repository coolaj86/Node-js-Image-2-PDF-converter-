const express = require("express");
const app = express();
const port = process.env.PORT || 3519;
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { converter } = require("./converter");
const imgToPDF = require("image-to-pdf");
const fs = require("fs");
// const fs = require("fs");
const out_path = path.join(__dirname, "/output.pdf");

app.use("/", express.static("./public"));

app.post("/converter", upload.array("image", 1), async (req, res, next) => {
  if (req.files.length === 0) {
    res.statusCode = 400;
    res.end("Files not uploaded");
    return;
  }
  
  let ws = converter(req.files[0].filename);
  ws.pipe(res);
});

// TODO use 'http.createServer(app).listen()'
app.listen(port, () => {
  console.log(`Listening at port${port}`);
});
