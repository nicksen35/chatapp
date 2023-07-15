import { EmailSearch, FriendRequests, FriendsList } from "../Auth/auth";
import { useState } from "react";
function AddFriend() {
  const [clickedId, setClickedId] = useState("activebutton");
  const handleClick = (id) => {
    setClickedId(id);
    console.log(id);
    console.log("WasClicked");
  };
  const FriendList = (
<div className="friendlistdiv">
        <div className="buttonlistdiv">
          <ul className="buttonlist">
            <h1 className="friendslistheader"> Friends </h1>
            <li>
              <button
                className={`friendbutton${
                  clickedId === "activebutton" ? "clicked" : ""
                }`}
                id="activebutton"
                onClick={() => handleClick("activebutton")}
              >
                Active
              </button>
            </li>
            <li>
              <button
                className={`friendbutton${
                  clickedId === "allbutton" ? "clicked" : ""
                }`}
                id="allbutton"
                onClick={() => handleClick("allbutton")}
              >
                All
              </button>
            </li>
            <li>
              <button
                className={`friendbutton${
                  clickedId === "pendingbutton" ? "clicked" : ""
                }`}
                id="pendingbutton"
                onClick={() => handleClick("pendingbutton")}
              >
                Pending
              </button>
            </li>
            <li>
              <button
                className={`friendbutton${
                  clickedId === "blockedbutton" ? "clicked" : ""
                }`}
                id="blockedbutton"
                onClick={() => handleClick("blockedbutton")}
              >
                Blocked
              </button>
            </li>
            <li>
              <button
                className={`friendbutton${
                  clickedId === "addfriendsbutton" ? "clicked" : ""
                }`}
                id="addfriendsbutton"
                onClick={() => handleClick("addfriendsbutton")}
              >
                Add Friends
              </button>
            </li>
          </ul>
        </div>
        <div className="searchingforfriend">
          <input
            className="friendbar"
            placeholder="Find your Friends"
            type="email"
          />
        </div>
      </div>
  )
  return (
    <>
    <div className="addfriendpagecontainer">
    {FriendList}
      {clickedId === "addfriendsbutton" ? 
      (
        <>
        <h1 className="addfriendheader">Add Friends</h1>
        <h2 className="addfriendheader"> Input your Friends' Emails and Find Them!</h2>
        <EmailSearch/>
      </>
      ):(
        ""
       ) }
      {clickedId === "pendingbutton" ? 
      (
        <>
        <h1 className="pendingheader"> Pending </h1>
        <h2 className="pendingheader"> Check your Pending Friend Requests Here! </h2>
        <FriendRequests />
        </>
      ):
      (
        ""
      )}
      {clickedId === "allbutton" ? (
        <>
        <FriendsList /> 
        </>
      ):
      (
        ""
      )
      }
    </div>
    </>
  );
}
export default AddFriend;
