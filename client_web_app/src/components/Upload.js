import React from "react"
import { useState, useEffect } from "react";
import axios from 'axios';

const baseUrl = "http://localhost:3001"

export default function Upload({localAccountId}) {
    const [file, setFile] = useState()
    function handleChange(event) {
        setFile(event.target.files[0])
    }

    async function handleSubmit(event) {
        console.log(typeof file);
        console.log("localAccountId IN UPLOAD:", localAccountId);
        event.preventDefault()
        const url = `${baseUrl}/upload`;
        console.log(file);
        let formData = new FormData()
        formData.append('localAccountId', localAccountId)
        formData.append('file', file)
        
        console.log(formData);
        await axios({
            method: 'post',
            url: url,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then((res)=>{alert("Upload status: "+ res.status);})
        


    }
        return (
            <div style={{paddingBottom:100}}>
                <form onSubmit={handleSubmit}>
                    <h1>React File Upload</h1>
                    <input encType="multipart/form-data" name="file" type="file" onChange={handleChange} />
                    <button type="submit">Upload</button>
                </form>
            </div>
        )
    
}