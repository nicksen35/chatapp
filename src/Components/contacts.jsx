import React, { useState } from "react";
function Contacts()
{  
    const [messages, setmessages] = useState([]);
    const initialmessages = [
        {
            userid: 1, sender:"John Doe", content:"Hello!!", timesent:"11:59pm"
        },
        {
            userid: 2, sender:"John Lollllzers", content:"Hello!!", timesent:"11:59pm"
        },
        {
            userid: 3, sender:"John Doe", content:"Hello!! How are you doing?", timesent:"11:59pm"
        },
    ];
    useState(()=> {
        setmessages(initialmessages)
    },[] );

    const ContactPage = (
        <>
        <div className="messagelistcontainer"> 
            <input className="searchbar" placeholder="Find a Friend" type="text" name="FriendFind" />
            <h1> Messages </h1>
        </div>
        <div className="contactlistcontainer">
            {messages.map((message) => (
            <div className="messagebox" key={message.id}>
                <div className="topportion"> 
                    <p className="sender">{message.sender}</p>
                    <p className="time"> {message.timesent} </p>
                </div>
                    <div className="bottomportion"> 
                    <p className="message">{message.content}</p>
                </div>
            </div>
            ))}
            </div>
            
        </>
    )

    return ContactPage

}

export default Contacts