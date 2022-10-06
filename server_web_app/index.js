
// server/index.js

const cors = require('cors');
const bodyParser = require('body-parser');
const multipart = require("parse-multipart");
const { getContainerList, uploadBlob } = require('./blobStorage.js')
const { dbTest, dbUpload } = require('./dbQuery.js')


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
    "fileName": "testFile1",
    "ownerId": "testUser1",
    "blobURL": "https://file1.url"
  });

  files.push({
    "fileName": "testFile2",
    "ownerId": "testUser2",
    "blobURL": "https://file2.url"
  });

  files.push({
    "fileName": "testFile3",
    "ownerId": "testUser3",
    "blobURL": "https://file3.url"
  });

  res.send(files);
})

app.get("/dbTest", async (req, res) => {
  dbTest().then(results => {
    res.send(results);
  }).catch(err => {
    console.error(err);
  })
})

app.post("/dbUpload", async (req, res) => {
  const fileName = req.body.fileName;
  const ownerId = req.body.ownerId;
  const blobURL = req.body.blobURL;

  dbUpload(fileName, ownerId, blobURL).then(() => {
    res.send("good");
  }).catch(err => {
    console.error(err);
    res.send("bad");
  });
})

app.get("/getAll", async (req, res) => {
  const blobs = await getContainerList()
  res.send(blobs);
});

//Multer parses form data
let multer = require('multer');
let upload = multer().single("file");
//let getTenantId = multer().single("tenantId");
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).send("Something went wrong!");
    }

    try {
      const up = uploadBlob(req.file, req.body.localAccountId);
      res.send(up)
    } catch (err) {
      res.status(400).send("Something went wrong!");
    }
  })

  /*   getTenantId(req, res, (err) => {
      if (err) {
        res.status(400).send("Something went wrong!");
      }
      console.log("TENANT ID: "+req.tenantId);
    }) */

});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

