import "./App.scss";
import SideBar from "./Components/sidebar";
import Contacts from "./Components/contacts";
function App() {
  return (
    <div className="appcontainer">
      <div className="sidebarparentcontainer">
        <SideBar />
      </div>
      <div className="messagesparentcontainer">
        <Contacts />
      </div>
    </div>
  );
}

export default App;
