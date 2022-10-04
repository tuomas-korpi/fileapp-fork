// client/src/App.js
import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";

//test
//const baseUrl = "https://api123tuomas.azurewebsites.net"
const baseUrl = "https://api123tuomas.azurewebsites.net"




function App() {
  const [container, setContainers] = useState([]);
  const [file, setFile] = useState()


/*   useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setContainers(data.containers));
  }, []); */



  function getContainers() {
    axios.get("/getAll")
    .then((res) => {
      setContainers(res.data)
      console.log(res.data);
    })
  }
 
  const mapBlobs = container.map(cont => 
    <div key={Math.floor(Math.random() * 99999)}>
      <h1>{cont.contName}</h1>
        <ul>
          {cont.blob.map(blob=>
            <li key={ Math.floor(Math.random() * 99999)}>
              Blob name: {blob.name} <br/>
              Blob url: {blob.url}
            </li>
          )}
        </ul>
    </div>)


function handleChange(event) {
  setFile(event.target.files[0])
} 

 async function handleSubmit(event) {
  console.log(typeof file);
  event.preventDefault()
  const url = `${baseUrl}/upload`;
  console.log(file);
  let formData = new FormData()
  formData.append('file', file)
  console.log(formData);
  await axios({
      method: 'post',
      url: url,
      data: formData,
      headers: {
          "Content-Type": "multipart/form-data",
      }
  });

}



  return (
    <div className="App">
      <button onClick={getContainers}>
        Get All blobs
      </button>
      {mapBlobs}
      <hr/>
      <form onSubmit={handleSubmit}>
          <h1>React File Upload</h1>
          <input encType="multipart/form-data" name="file" type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>


    </div>
  );
}
export default App;