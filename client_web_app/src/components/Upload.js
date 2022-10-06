import React from "react"
import { useState, useEffect } from "react";
import axios from 'axios';
import DisplayFiles from "./DisplayFiles";
import blobs from "./blobs";

const baseUrl = "http://localhost:3001"

export default function Upload({ localAccountId }) {
    const [file, setFile] = useState()
    const [uploaded, setUploaded] = useState(false)
    const [containers, setContainer] = useState([])
    const [selectedContainer, setSelectedContainer] = useState()

    //Handle file selection
    function handleChange(event) {
        setFile(event.target.files[0])
    }
    //handle dropdow select
    const handleSelect =  (event) => {
        console.log("Handle select");
         setSelectedContainer(event.target.value)
                
    }
    //Get all containers here 
    useEffect(() => {
        console.log('effect')
        blobs.getContainer().then(conts => {
            console.log(conts);
            setContainer(conts)
            setSelectedContainer(conts[0].contName)
            console.log("CONTAINERS:", containers);

        })
    }, [])


    async function handleSubmit(event) {
        console.log("SELECTED CONT: ", selectedContainer);
        console.log(typeof file);
        console.log("localAccountId IN UPLOAD:", localAccountId);
        event.preventDefault()
        const url = `${baseUrl}/upload`;
        console.log(file);
        let formData = new FormData()
        formData.append('localAccountId', localAccountId)
        formData.append('file', file)
        formData.append('containerName', selectedContainer)
        console.log(formData);
        await axios({
            method: 'post',
            url: url,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(results => {
            alert(JSON.stringify(results.data));
            setUploaded(true)
        }).catch(err => {
            alert("Upload Error");
        })
    }


    return (
        <>
            <div style={{ paddingBottom: 100 }}>
                <form onSubmit={handleSubmit}>
                    <h1>File Upload</h1>
                    <label>Choose a Conainer</label>
                    <select
                        onChange={handleSelect}
                        value={selectedContainer}>
                        {containers.map((x, i) =>
                            <option key={i} value={x.contName}>{x.contName}</option>
                        )}
                    </select>
                    <input encType="multipart/form-data" name="file" type="file" onChange={handleChange} />
                    <button type="submit">Upload</button>
                </form>
            </div>
            <DisplayFiles uploaded={uploaded} />
        </>
    )

}