const { DefaultAzureCredential } = require("@azure/identity");
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
require('dotenv').config() 
const account = process.env.STOR_ACCOUNT;
const accountKey = process.env.SHARED_KEY;
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);

const getContainerList = async function () {
  let i = 1;
  let containers = blobServiceClient.listContainers();
  let cont = []
  for await (const container of containers) {
    //get blobs in this cont
    let blob = await getBlobList(container.name)

    cont.push({contName: container.name, blob: blob})
    //console.log(`Container ${i++}: ${container.name}`);
  }
  console.log("CONTAINER ARRAY: ", cont);
  //return object 
  return cont
}

const getBlobList = async function (containerName) {


    console.log("\nListing blobs...");
    const containerClient = blobServiceClient.getContainerClient(containerName);
    //blob properties
    blobArr = []
    // List the blob(s) in the container.
    for await (const blob of containerClient.listBlobsFlat()) {
      // Get Blob Client from name, to get the URL
      const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);
        //put to obj
        let blobObj = {name:"",url:""}
        blobObj.name = blob.name
        blobObj.url= tempBlockBlobClient.url
        blobArr.push(blobObj)
      // Display blob name and URL
      //console.log(`\n\tname: ${blob.name}\n\tURL: ${tempBlockBlobClient.url}\n`);
    }
    // return array of objects
    return await blobArr
}



const uploadBlob = async function(blobFile, loacalAccountId) {

  try{
  const containerName = "class1";
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobName = blobFile.originalname
  console.log(blobFile.originalname);
  const content = blobFile.buffer
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
  //url construction https://storcafla426wsqmw.blob.core.windows.net/class1/azuresql.png
    const blobUrl = `https://storcafla426wsqmw.blob.core.windows.net/${containerName}/${blobName}`
    console.log(blobUrl);
  console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse);
  //const msg = `Upload block blob ${blobName} successfully`;
  return uploadBlobResponse
  }catch(err){
    console.log("Error uplosd");
  }

}





module.exports = {getContainerList, uploadBlob}