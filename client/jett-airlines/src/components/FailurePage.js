import React from 'react'
import '../css/Failure.css';
import CancelIcon from '@mui/icons-material/Cancel';

export default function FailurePage() {
    React.useEffect(()=>{
        const authChannel = new BroadcastChannel("auth")
        authChannel.postMessage({failure:true})
        window.setTimeout(()=>{window.close()}, 5000);
    },[])
    return (
      <div class="main">
          <div class="body">
           <div class="row justify-content-center">
            <div class="col-md-5">
                <div class="message-box _failure _failed">
                     <i class="fa fa-times-circle" aria-hidden="true"></i>
                     <CancelIcon sx={{color:"#ff0000",fontSize: 60 }}></CancelIcon>
                    <h2> Your payment failed </h2>
             <p>  Try again later. We will <br/>
redirect you to the Home Page shortly.... </p> 
         
            </div> 
        </div> 
    </div> 
    </div>
</div> 
       
    )
}
