import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
    Button,Grid
  } from "@mui/material";
import '../css/Success.css'
import $ from "jquery";
  // DISCLAIMER: This function does require jQuery. I've used it here because the project I'm building this for already uses jQuery, so I thought why not. It can be modified quite simply to be done in raw JavaScript.  Just thought I'd let you know.




// This is the funtion you need to copy
// Copy from line 9 to 34

function autoType(elementClass, typingSpeed){
    var thhis = $(elementClass);
    thhis.css({
      "position": "relative",
      "display": "inline-block"
    });
    thhis.prepend('<div class="cursor" style="right: initial; left:0;"></div>');
    thhis = thhis.find(".text-js");
    var text = thhis.text().trim().split('');
    var amntOfChars = text.length;
    var newString = "";
    thhis.text("|");
    setTimeout(function(){
      thhis.css("opacity",1);
      thhis.prev().removeAttr("style");
      thhis.text("");
      for(var i = 0; i < amntOfChars; i++){
        (function(i,char){
          setTimeout(function() {        
            newString += char;
            thhis.text(newString);
          },i*typingSpeed);
        })(i+1,text[i]);
      }
    },1500);
  }

$(document).ready(function(){
  // Now to start autoTyping just call the autoType function with the 
  // class of outer div
  // The second paramter is the speed between each letter is typed.   
  autoType(".type-js",100)
});

export default function SuccessPage() {
        
    React.useEffect(()=>{
        const authChannel = new BroadcastChannel("auth")
        authChannel.postMessage({success:true})
        window.setTimeout(()=>{window.close()}, 6500);
    },[])
    
    return (
      
        <div class="main">
         
            <div class ="body">
            
            <Grid container sx={{alignItems:"center",margin:"100px 0 0 0"}} direction={"column"}>
              <Grid xs={12}  item>
<div class="type-js headline">
  <h1 class="text-js">Thank you for using Jett AirLines :)</h1>
  
</div>
</Grid>
</Grid>
<Grid item xs={12} sx={{justifyContent:"center"}}>
        <div class="row justify-content-center">
            <div class="col-md-5">
                <div class="message-box _success">
                     <i class="fa fa-check-circle" aria-hidden="true"></i>
                     <CheckCircleIcon sx={{color:"#28a745",fontSize: 60 }}></CheckCircleIcon>
                    <h2> Your payment was successful </h2>
                   <p> Thank you for your payment. We will <br/>
redirect you to the Home page shortly.... </p>      
            </div> 
        </div> 
    </div> 
  
  

  
 
  
</Grid> 


        </div></div>
    )
}
