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

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));


app.get("/getAll", async(req, res) => {
    const blobs = await getContainerList()
    res.send(blobs);
  });

  //Multer parses form data
  let multer = require('multer');
  let upload = multer().single("file");
  app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
      if(err) {
        res.status(400).send("Something went wrong!");
      }
      console.log(req.file);
      
      const up = uploadBlob(req.file)
      res.send(up)
      
    });

  });


  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });