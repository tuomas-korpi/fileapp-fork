// client/src/App.js
import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import Upload from "./components/Upload"
import blobs from "./components/blobs"
import { PageLayout } from "./components/PageLayout";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal  } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import Button from "react-bootstrap/Button";

//change proxy too
const baseUrl = "http://localhost:3001"
//const baseUrl = "https://api321tuomas.azurewebsites.net"


function ProfileContent() {
  const { instance, accounts, inProgress } = useMsal();
  const [accessToken, setAccessToken] = useState(null);

  const name = accounts[0] && accounts[0].name;

  function RequestAccessToken() {
      const request = {
          ...loginRequest,
          account: accounts[0]
      };

      // Silently acquires an access token which is then attached to a request for Microsoft Graph data
      instance.acquireTokenSilent(request).then((response) => {
          setAccessToken(response.accessToken);
        
      }).catch((e) => {
          instance.acquireTokenPopup(request).then((response) => {
              setAccessToken(response.accessToken);
          });
      });

  }

  if(accessToken == null){
      RequestAccessToken()
  }
  else{
    console.log("Access token: ", accessToken);
    console.log("Accounts: ", accounts);
  }


  return (
      <>
          <h5 className="card-title">Welcome {name}</h5>
          {accessToken ? 
              <p>Access Token Acquired!</p>
              :        
              <p>No Access token</p>      
          }
           <Upload accessToken={accessToken}/>
      </>
  );
};



function App() {
  const [container, setContainers] = useState([]);
  const [blob, setBlob] = useState([]);
  const [loading, setLoading] = useState(false);

  


  //GET
/*   useEffect(() => {
    console.log('effect')
    getBlob()
  }, []) */

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
      <AuthenticatedTemplate>
      <ProfileContent />
        <div className="App">
          <h1>My Files</h1>
{/*           {loading ? (
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
            </table>)} */}


          <hr />
          
         
          
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>You are not signed in! Please sign in.</p>
      </UnauthenticatedTemplate>
    </PageLayout>
  );
}
export default App;