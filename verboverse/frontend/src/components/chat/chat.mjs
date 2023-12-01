import React, { useEffect, useState } from "react";
import {translate} from '../../services/translateApiService.js';
const messageinput = React.createRef();
const Chat = ({channel, targetlanguage}) =>{
    const [disabled, setdisabled] = useState(true);
    const chatchannel = channel;
    chatchannel.onopen = () => {
        setdisabled(false);
    }
    const sendmessage = () => {
        if(messageinput.current.value === '')
            return;
        if(chatchannel.readyState === 'open'){
            const messageinfo={
                username: "The other side: ",
                message: messageinput.current.value
            }
            chatchannel.send(JSON.stringify(messageinfo));

            const MessageInfodiv = document.createElement("div");
            MessageInfodiv.className = "MessageInfo";

            const myUsernamediv = document.createElement("div");
            myUsernamediv.className = "MyUsername";
            myUsernamediv.innerHTML = "Me: ";
            MessageInfodiv.appendChild(myUsernamediv);

            const myMessagediv = document.createElement("div");
            myMessagediv.className = "MyMessage";
            myMessagediv.innerHTML = messageinput.current.value;
            MessageInfodiv.appendChild(myMessagediv);

            document.getElementById("Chat").appendChild(MessageInfodiv);
            messageinput.current.value = "";
        }
    }
    chatchannel.onmessage = (event) =>{
        const messageinfo = JSON.parse(event.data);
        const MessageInfodiv = document.createElement("div");
        MessageInfodiv.className = "MessageInfo";

        const theirUsernamediv = document.createElement("div");
        theirUsernamediv.className = "TheirUsername";
        theirUsernamediv.innerHTML = messageinfo.username;
        MessageInfodiv.appendChild(theirUsernamediv);

        const theirMessagediv = document.createElement("div");
        theirMessagediv.className = "TheirMessage";
        translate(messageinfo.message, targetlanguage).then((translatedmessage)=>{
            theirMessagediv.innerHTML = translatedmessage.translation;
            MessageInfodiv.appendChild(theirMessagediv);
            document.getElementById("Chat").appendChild(MessageInfodiv);   
        })
     
    }
    return(
        <div>
            <div className="Chat" id="Chat">
            </div>
            <input placeholder="Enter message" ref={messageinput}/>
            <button onClick={sendmessage} disabled={disabled}>Send</button>
        </div>
    )
}
export default Chat;
//When I send the message:

