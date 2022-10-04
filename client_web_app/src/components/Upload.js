import React from "react"
import { useState, useEffect } from "react";
import axios from 'axios';

const baseUrl = "http://localhost:3001"

export default function Upload({accessToken}) {
    const [file, setFile] = useState()
    let accessToken = accessToken

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
            <div>
                <form onSubmit={handleSubmit}>
                    <h1>React File Upload</h1>
                    <input encType="multipart/form-data" name="file" type="file" onChange={handleChange} />
                    <button type="submit">Upload</button>
                </form>
            </div>
        )
    
}