// server/index.js

const cors = require('cors');
const bodyParser = require('body-parser');
const multipart = require("parse-multipart");
const { getContainerList, uploadBlob } = require('./blobStorage.js')




const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/getFilesByOwnerId/:ownerId", async (req, res) => {
  const files = [];

  const ownerId = req.params.ownerId
  console.log(ownerId);

  files.push({
    "FileName": "testFile1",
    "ownerId": "testUser1",
    "BlobURL": "https://file1.url"
  });

  files.push({
    "FileName": "testFile2",
    "ownerId": "testUser2",
    "BlobURL": "https://file2.url"
  });

  files.push({
    "FileName": "testFile3",
    "ownerId": "testUser3",
    "BlobURL": "https://file3.url"
  });

  res.send(files);
})


app.get("/getAll", async (req, res) => {
  const blobs = await getContainerList()
  res.send(blobs);
});

//Multer parses fornData
let multer = require('multer');
let upload = multer().single("file");
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).send("Something went wrong!");
    }
    console.log(req.file);

    uploadBlob(req.file)

  });

});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});