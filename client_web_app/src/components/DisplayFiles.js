import React from "react"
import { useState, useEffect } from "react";
import axios from 'axios';
import blobs from "./blobs"


export default function DisplayFiles({newBlob}) {
    const [container, setContainers] = useState([]);
    const [blob, setBlob] = useState([]);
    const [loading, setLoading] = useState(false);
  
  
    //GET
    useEffect(() => {
      console.log('effect')
      //getSQL
      /*       axios.get('http://localhost:3001/dbTest').then(resp => {
      
          console.log(resp.data);
      }); */
      getBlob()
    }, [])
  
    const getBlob = async () => {
      setLoading(true);
      blobs.getAll().then(initialBlobs => {
        console.log(initialBlobs);
        setBlob(initialBlobs)
        console.log(blob);
        setLoading(false);
      })
    }
  
  
  
    //DELETE storage based on url - event syncs the sql
    const handleDelete = (event, BlobURL, FileName) => {
      if (window.confirm(`Are you sure you want to delete ${FileName}`)) {
        setBlob(blob.filter(p => p.BlobURL !== BlobURL))
        console.log('Deleted');
      } else {
        // Do nothing!
        console.log('Thing was not deleted');
      }
  /*     blobs.remove(BlobURL).then(returnedBlob => {
        console.log(returnedBlob);
        setBlob(blob.filter(p => p.BlobURL !== BlobURL))
      }) */
      
    }


    
        return (
            <div className="App">
            <h1>All Files</h1>
                       {loading ? (
              <div>...Data Loading.....</div>
            ) : (
              <table className="fileTable">
                <tbody>
                  <tr>
                    <th>File name</th>
                    <th>Owner Id</th>
                    <th>Blob url</th>
                    <th>delete</th>
                  </tr>
                  {blob.map(x =>
                    <tr key={Math.random() * 9999}>
                      <td key={Math.random() * 9999}>
                        {x.FileName}
                      </td>
                      <td key={Math.random() * 9999}>
                        {x.OwnerId}
                      </td>
                      <td key={Math.random() * 9999}>
                        {x.BlobURL}
                      </td>
                      <td key={Math.random() * 9999}>
                        <button onClick={event => handleDelete(event, x.BlobURL, x.FileName)}>
                          delete
                        </button>
                      </td>
                    </tr>
                  )
                  }
                </tbody>
              </table>)} 
  
  
            <hr />
  
  
  
          </div>
        )
    
}