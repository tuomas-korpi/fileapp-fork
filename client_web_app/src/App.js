// client/src/App.js
import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import Upload from "./components/Upload"
import blobs from "./components/blobs"
import { PageLayout } from "./components/PageLayout";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import Button from "react-bootstrap/Button";
import DisplayFiles from "./components/DisplayFiles";



//change proxy too
const baseUrl = "http://localhost:3001"
//const baseUrl = "https://api321tuomas.azurewebsites.net"


function ProfileContent() {
  const { instance, accounts, inProgress } = useMsal();
  const [accessToken, setAccessToken] = useState(null);
  const [localAccountId, setLocalAccountId] = useState(null);

  const name = accounts[0] && accounts[0].name;

  useEffect(() => {
    RequestAccessToken()

  }, [])



  function RequestAccessToken() {
    const request = {
      ...loginRequest,
      account: accounts[0]
    };

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance.acquireTokenSilent(request).then((response) => {
      setAccessToken(response.accessToken);
      setLocalAccountId(accounts[0].localAccountId)

    }).catch((e) => {
      instance.acquireTokenPopup(request).then((response) => {
        setAccessToken(response.accessToken);
        setLocalAccountId(accounts[0].localAccountId)
      });
    });

  }

  //console.log("Access token: ", accessToken);
  console.log("Accounts: ", accounts);
  console.log("TLocal account ID: ", localAccountId);


  return (
    <>
      <h5 className="card-title">Welcome {name}</h5>
      {accessToken ?
        <p>Access Token Acquired!</p>
        :
        <p>No Access token</p>
      }
      <Upload localAccountId={localAccountId} />
      <DisplayFiles  />
    </>
  );
};



function App() {



  return (
    <PageLayout>
      <AuthenticatedTemplate>
        <ProfileContent />
       
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>You are not signed in! Please sign in.</p>
      </UnauthenticatedTemplate>
    </PageLayout>
  );
}
export default App;