import React from 'react'
import './style.css'


function Message(props){
  return(
     <div className="message">
         <div className="messageUserName"> {props.username} </div>
         <div className="messageText"> {props.text}</div>
     </div>
   )
}

export default Message
