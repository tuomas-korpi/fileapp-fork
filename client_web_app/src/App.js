// client/src/App.js
import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import Create from "./components/create/create"
import blobs from "./components/blobs"

//change proxy too
const baseUrl = "http://localhost:3001"
//const baseUrl = "https://api321tuomas.azurewebsites.net"




function App() {
  const [container, setContainers] = useState([]);
  const [blob, setBlob] = useState([]);


  //GET
  useEffect(() => {
    console.log('effect')
    blobs.getAll().then(initialBlobs => {
      console.log(initialBlobs);
      setBlob(initialBlobs)
      console.log(blob);
    })
  }, [])



  //DELETE storage based on url - event syncs the sql
  const handleDelete = (event, id) => {
    blobs.remove(id).then(returnedBlob => {
      console.log(returnedBlob);
      setBlob(blob.filter(p => p.id !== id))
    })
  }


  return (
    <div className="App">

      <table>
        <tr>
          <th>File name</th>
          <th>File url</th>
          <th>last modified</th>
          <th>delete</th>
        </tr>
        {blob.map(x =>
        <tr>
          <td key={x.file_name}>
            {x.file_name}
          </td>
          <td key={x.file_name}>
            {x.url}
          </td>
          <td key={x.file_name}>
            {x.lastmodified}
          </td>
          <td key={x.file_name}>
          <button onClick={event => handleDelete(event, x.id)}>
              delete
            </button>
          </td>
          </tr>
        )
  
        }


      </table>
      <hr />
      <div>
        <Create />
      </div>


    </div>
  );
}
export default App;