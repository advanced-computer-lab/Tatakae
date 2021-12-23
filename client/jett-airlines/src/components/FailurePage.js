import React from 'react'

export default function FailurePage() {
    React.useEffect(()=>{
        const authChannel = new BroadcastChannel("auth")
        authChannel.postMessage({failure:true})
        window.setTimeout(()=>{window.close()}, 5000);
    },[])
    return (
        <div>
            <h1 className='center'>Fail ybasha</h1>
        </div>
    )
}
