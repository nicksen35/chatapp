import React, { useState } from "react";

function Contacts() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [messages, setmessages] = useState([]);
  const initialmessages = [
    {
      userimage: "nothing.png",
      userid: 1,
      sender: "John Doe",
      content: "Hello!!",
      timesent: "11:59pm",
    },
    {
      userimage: "nothing.png",
      userid: 2,
      sender: "John Lollllzers",
      content: "Hello!!",
      timesent: "11:59pm",
    },
    {
      userimage: "nothing.png",
      userid: 3,
      sender: "John Doe",
      content: "Hello!! How are you doing?",
      timesent: "11:59pm",
    },
  ];
  useState(() => {
    setmessages(initialmessages);
  }, []);

  const ContactPage = (
    <>
    <div className="messagesparentcontainer"> 
      <div className="messagelistcontainer">
        <div className="searchfilter">
          <input
            className="searchbar"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <h1>Messages</h1>
      </div>
      <div className="contactlistcontainer">
        {messages
          .filter(
            (message) =>
              message.sender
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              message.content.toLowerCase().includes(searchQuery.toLowerCase())

          )
          .map((message) => (
            <div className="messagebox" key={message.id}>
              <div className="userimage">
                <img className="image" src={message.userimage} alt="" />
              </div>
              <div className="content">
                <div className="topportion">
                  <p className="sender">{message.sender}</p>
                  <p className="time">{message.timesent}</p>
                </div>
                <div className="bottomportion">
                  <p className="message">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      </div>
    </>

  );

  return ContactPage;
}

export default Contacts;
