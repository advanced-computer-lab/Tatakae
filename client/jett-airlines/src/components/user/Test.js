import React from 'react'
import {
    Button,
  } from "@mui/material";

export default function Test() {
    

    const HandleClick=()=>{
        const authChannel = new BroadcastChannel("auth")
        authChannel.postMessage("hello")
    }
        
    
    
    return (
        <div>
            <Button onClick={HandleClick}>YYAAALLAAA</Button>
        </div>
    )
}
