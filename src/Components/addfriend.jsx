import { EmailSearch } from "../Auth/auth"
import { useState } from "react"
function AddFriend()
{
    return (
        <>
        
        <div className="friendlistdiv">
        <div className="buttonlistdiv"> 
        <ul className="buttonlist"> 
            <h1 className="friendslistheader"> Friends </h1> 
            <li> <button className="friendbutton" id="activebutton"> Active </button> </li>
            <li> <button className="friendbutton" id="allbutton"> All </button></li>
            <li><button className="friendbutton" id="pendingbutton"> Pending </button> </li>
            <li><button className="friendbutton" id="blockedbutton"> Blocked </button> </li>
            <li> <button className="friendbutton" id="addfriendsbutton"> Add Friends </button></li>
        </ul>
        </div>
        <input placeholder="Find your Friends" type="email"/> 
        </div>
        
        </>
    )
}
export default AddFriend