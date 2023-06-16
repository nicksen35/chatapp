import React, { useState } from "react";

function SideBar() {
  const [clickedId, setClickedId] = useState(null);

  const handleClick = (id) => {
    setClickedId(id);
    console.log(id);
    console.log("WasClicked");
  };

  const condensedmenu = (
    <div className="outerdiv">
      <ul>
        <li>Logo</li>
      </ul>
      <hr className="dividers" />
      <ul>
        <li
          id="contacts"
          onClick={() => handleClick("contacts")}
          className={`sidebarcontainer${
            clickedId === "contacts" ? "clicked" : ""
          }`}
        >
          <span class="material-symbols-outlined">contacts</span>
          <p> Contacts </p>
        </li>
        <li
          id="addsidebar"
          onClick={() => handleClick("addsidebar")}
          className={`sidebarcontainer${
            clickedId === "addsidebar" ? "clicked" : ""
          }`}
        >
          <span id="addfriend" className="material-symbols-outlined">
            person_add
          </span>
          <p className="sidebarlabel">Add Friend</p>
        </li>
        <li
          id="calendarsidebar"
          className={`sidebarcontainer${
            clickedId === "calendarsidebar" ? "clicked" : ""
          }`}
          onClick={() => handleClick("calendarsidebar")}
        >
          <span id="calendar" className="material-symbols-outlined">
            calendar_month
          </span>
          <p className="sidebarlabel">Calendar</p>
        </li>
      </ul>
      <hr className="dividers" />
      <ul>
        <li
          id="accountsidebar"
          className={`sidebarcontainer${
            clickedId === "accountsidebar" ? "clicked" : ""
          }`}
          onClick={() => handleClick("accountsidebar")}
        >
          <span id="person" className="material-symbols-outlined">
            person
          </span>
          <p className="sidebarlabel">Account</p>
        </li>
        <li
          id="logoutsidebar"
          className={`sidebarcontainer${
            clickedId === "logoutsidebar" ? "clicked" : ""
          }`}
          onClick={() => handleClick("logoutsidebar")}
        >
          <span id="logout" className="material-symbols-outlined">
            logout
          </span>
          <p className="sidebarlabel">Logout</p>
        </li>
      </ul>
    </div>
  );

  return condensedmenu;
}

export default SideBar;
