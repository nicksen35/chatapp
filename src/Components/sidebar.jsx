function SideBar() {
  const condensedmenu = (
    <div className="outerdiv">
      <ul>
        <li> Logo </li>
    </ul>
    <hr className="dividers"/> 
    <ul> 
        <li>
          <span id="addfriend" className="material-symbols-outlined">person_add</span>
        </li>
        <li>
          <span id="calendar "className="material-symbols-outlined">calendar_month</span>
        </li>
    </ul>
    <hr className="dividers"/>
    <ul> 
        <li>
          <span id="person" className="material-symbols-outlined">person</span>
        </li>
        <li>
          <span id="logout "className="material-symbols-outlined">logout</span>
        </li>
        </ul>
    </div>
  );
  return condensedmenu;
}
export default SideBar;
