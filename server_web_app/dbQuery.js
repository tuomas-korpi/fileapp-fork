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
  console.log(123);
  const value = 123;
  let pool = await sql.connect(sqlConfig);
  try {
    let result1 = await pool.request()
      // .input('input_parameter', sql.Int, value)
      .query('select * from Files');

    // console.log(typeof result1);
    return result1.recordset;
  } catch (err) {
    // ... error checks
    console.error(err);
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
