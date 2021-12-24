import React from 'react'
import {
    Button,
  } from "@mui/material";

export default function SuccessPage() {
        
    React.useEffect(()=>{
        const authChannel = new BroadcastChannel("auth")
        authChannel.postMessage({success:true})
        window.setTimeout(()=>{window.close()}, 5000);
    },[])
    
    return (
        <div>
            <h1 className='center'>Ya hala</h1>
        </div>
    )
}
