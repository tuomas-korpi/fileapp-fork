// client/src/App.js
import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import Create from "./components/create"
import blobs from "./components/blobs"
import { PageLayout } from "./components/PageLayout";

//change proxy too
const baseUrl = "http://localhost:3001"
//const baseUrl = "https://api321tuomas.azurewebsites.net"




function App() {
  const [container, setContainers] = useState([]);
  const [blob, setBlob] = useState([]);
  const [loading, setLoading] = useState(false);


  //GET
  useEffect(() => {
    console.log('effect')
    getBlob()
  }, [])

  const getBlob = () => {
    setLoading(true);
    blobs.getAll().then(initialBlobs => {
      console.log(initialBlobs);
      setBlob(initialBlobs)
      console.log(blob);
      setLoading(false);
    })
  }



  //DELETE storage based on url - event syncs the sql
  const handleDelete = (event, id) => {
    blobs.remove(id).then(returnedBlob => {
      console.log(returnedBlob);
      setBlob(blob.filter(p => p.id !== id))
    })
  }


  return (
    <PageLayout>
    <div className="App">
      <h1>My Files</h1>
      {loading ? (
        <div>...Data Loading.....</div>
      ) : (
      <table>
        <tbody>
          <tr>
            <th>File name</th>
            <th>File url</th>
            <th>last modified</th>
            <th>delete</th>
          </tr>
          {blob.map(x =>
            <tr key={Math.random() * 9999}>
              <td key={Math.random() * 9999}>
                {x.file_name}
              </td>
              <td key={Math.random() * 9999}>
                {x.url}
              </td>
              <td key={Math.random() * 9999}>
                {x.lastmodified}
              </td>
              <td key={Math.random() * 9999}>
                <button onClick={event => handleDelete(event, x.id)}>
                  delete
                </button>
              </td>
            </tr>
          )
          }
        </tbody>
      </table>)}


      <hr />
      <div>
        <Create />
      </div>
    </div>
    </PageLayout>
  );
}
export default App;