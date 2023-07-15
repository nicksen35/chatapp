import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { getCurrentUserId } from "../Auth/auth";
import { useRef } from "react";
import {
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
function Contacts() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [messages, setmessages] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [chats, setChats] = useState([]);
  // State to track the selected user ID
  const messageInputRef = useRef(null);
  const db = firebase.firestore();
  const OpenChatWindow = async (userId) => {
    await setSelectedUserId(userId); // Update the state with the selected user ID
    const combinedID =
      getCurrentUserId() > userId
        ? getCurrentUserId() + userId
        : userId + getCurrentUserId();

    console.log(combinedID);

    try {
      const res = await getDoc(doc(db, "messages", combinedID));

      if (!res.exists()) {
        await setDoc(doc(db, "messages", combinedID), { messages: [] });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsub = onSnapshot(
      doc(
        db,
        "messages",
        getCurrentUserId() > selectedUserId
          ? getCurrentUserId() + selectedUserId
          : selectedUserId + getCurrentUserId()
      ),
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          console.log(data.messages);
          setChats(data.messages || []);
        }
      }
    );
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        console.log(messageInputRef.current.value);
        sendMessages();
        console.log(chats);
      }
    };

    const sendMessages = async () => {
      const combinedID =
        getCurrentUserId() > selectedUserId
          ? getCurrentUserId() + selectedUserId
          : selectedUserId + getCurrentUserId();
      const message = messageInputRef.current.value;

      try {
        await updateDoc(doc(db, "messages", combinedID), {
          messages: firebase.firestore.FieldValue.arrayUnion({
            content: message,
            sender: getCurrentUserId(),
          }),
        });

        // Clear the input field after sending the message
        messageInputRef.current.value = "";
      } catch (error) {
        console.error(error);
      }
    };
    try {
      console.log(chats);
      console.log(messageInputRef);
      if (messageInputRef.current !== null) {
        messageInputRef.current.addEventListener("keydown", keyDownHandler);
      }
      const friendsdocref = firebase.firestore().collection("friends");
      friendsdocref
        .get()
        .then((snapshot) => {
          const emailList = [];
          snapshot.docs.forEach((doc) => {
            const data = doc.data();
            const values = Object.values(data);
            const { FriendEmail, FriendID, UserID, UserEmail } = data;
            const senderMappedData = {
              UserID: FriendID,
              UserEmail: FriendEmail,
              FriendEmail: UserEmail,
              FriendID: UserID,
            };
            const recieverMappedData = {
              UserID,
              UserEmail,
              FriendEmail,
              FriendID,
            };
            console.log(senderMappedData);
            if (values.includes(getCurrentUserId())) {
              FriendID === getCurrentUserId()
                ? emailList.push(senderMappedData)
                : emailList.push(recieverMappedData);
            }
          });
          setmessages(emailList);
          console.log(messages);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }, [selectedUserId]);

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
            .filter((message) => message.FriendEmail.includes(searchQuery))
            .map((message) => (
              <div
                className="messagebox"
                key={message.id}
                onClick={() => OpenChatWindow(message.FriendID)}
              >
                <div className="userimage">
                  <img className="image" src={message.userimage} alt="" />
                </div>
                <div className="content">
                  <div className="topportion">
                    <p className="sender">{message.FriendEmail}</p>
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
      {selectedUserId != null ? (
        <>
          <div className="chatcontainer">
            {messages.map((message, index) => (
              <>
                <div key={index} className="chatheader">
                  <h1>{message.FriendEmail}</h1>
                </div>
                <div className="messagescontainer">
                  {chats.map((chatmessage, index) => (
                    <div key={index} className="messages">
                      <p id="messagesender">
                        {" "}
                        {chatmessage.sender === getCurrentUserId()
                          ? "You"
                          : message.FriendEmail }{" "}
                      </p>
                      <p>{chatmessage.content} </p>
                    </div>
                  ))}
                </div>
              </>
            ))}

            <div className="messageboxcontainer">
              <input
                id="messageinput"
                ref={messageInputRef}
                className="messageinputbox"
                placeholder="Enter Your Message Here"
              />
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );

  return ContactPage;
}

export default Contacts;
