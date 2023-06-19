import "./App.scss";
import SideBar from "./Components/sidebar";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState, useEffect,  } from "react";
import { onAuthStateChanged } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCw8wTLEV9RvPNNHeNR24WNiRxhXPaYmas",
  authDomain: "chat-application-3b73d.firebaseapp.com",
  projectId: "chat-application-3b73d",
  storageBucket: "chat-application-3b73d.appspot.com",
  messagingSenderId: "748602953797",
  appId: "1:748602953797:web:32fe22a45ff9faec4d932c",
  measurementId: "G-V5XJVHYLW3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // Handle successful sign-in
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      // Handle sign-in error
      console.error(error);
    });
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);
  const Application = (
    <div className="appcontainer">
      <SideBar />
    </div>
  )
  return (
    user ? (
      Application
    ) : (
      <>
      <div className="buttoncontainer">
        <button className="signinbutton"onClick={signInWithGoogle}>Sign in with Google</button>
      </div> 
      <div className="formcontainer">
      <form className="loginform"> 
        <label for="username"> Username </label>
        <input className="username" id="username" type="text"/>
        <br /> 
        <input className="password" type="password" />
        </form>
        </div>
       </>
    )
  );
}

export default App;
