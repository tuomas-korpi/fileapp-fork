require('dotenv').config();
const sql = require('mssql');

const sqlConfig = {
  user: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  server: process.env.SQL_SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
};

sql.on('error', err => {
  // ... error handler
  console.error(err);
})

async function dbTest () {
  let pool = await sql.connect(sqlConfig);
  try {
    let result = await pool.request()
      .query('select * from Files');
    return result.recordset;
  } catch (err) {
    // ... error checks
    throw err;
  } finally {
    pool.close();
  }
}

async function dbInsertTest(fileName, ownerId, blobUrl) {
  let pool = await sql.connect(sqlConfig);
  try {
    const request = await pool.request()
    .input('FileName', sql.NVarChar, fileName)
    .input('OwnerId', sql.NVarChar, ownerId)
    .input('BlobUrl', sql.NVarChar, blobUrl)
    .query('insert into Files (FileName, OwnerId, BlobUrl) values (@FileName, @OwnerId, @BlobUrl)');
    console.log(request);
  } catch (err) {
    // ... error checks
    throw err;
  } finally {
    pool.close();
  }
}

module.exports = { dbTest, dbInsertTest};
