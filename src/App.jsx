import "./App.scss";
import SideBar from "./Components/sidebar";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCw8wTLEV9RvPNNHeNR24WNiRxhXPaYmas",
  authDomain: "chat-application-3b73d.firebaseapp.com",
  projectId: "chat-application-3b73d",
  storageBucket: "chat-application-3b73d.appspot.com",
  messagingSenderId: "748602953797",
  appId: "1:748602953797:web:32fe22a45ff9faec4d932c",
  measurementId: "G-V5XJVHYLW3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export const handleLogout = () => {
  signOut(auth)
    .then(() => {
      console.log("Signed out successfully");
    })
    .catch((error) => {
      // An error happened.
    });
};

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

const signinwithemailandpass = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Handle successful sign-in
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      // Handle sign-in error
      console.error(error);
    });
};


const signUpWithEmailAndPassword = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Handle successful sign-up
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      // Handle sign-up error
      console.error(error);
    });
};
function SignUpPage({ setCurrentPage, signInWithGoogle, signUpWithEmailAndPassword }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h1 className="logintitle">Login To Chat With Others!</h1>
      <div className="buttoncontainer"></div>
      <div className="formcontainer">
        <form className="loginform">
          <div className="googlebuttoncontainer">
            <button
              type="button"
              className="signinwithgoogle"
              onClick={signInWithGoogle}
            >
              Sign Up with Google
            </button>
          </div>
          <label htmlFor="username" className="usernamelabel">
            Username
          </label>
          <input
            className="username"
            id="username"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="passwordlabel">
            Password
          </label>
          <input
            className="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="signinbuttoncontainer">
            <button
              className="signinbutton"
              type="button"
              onClick={() => setCurrentPage("signin")}
            >
              Sign In
            </button>
          </div>
          <div className="signupbuttoncontainer">
            <button
              className="signupbutton"
              type="button"
              onClick={() => signUpWithEmailAndPassword(email, password)}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPage, setCurrentPage] = useState("signin");
  console.log(currentPage);

  return currentPage === "signin" ? (
    <>
      <h1 className="logintitle">Login To Chat With Others!</h1>
      <div className="buttoncontainer"></div>
      <div className="formcontainer">
        <form className="loginform">
          <div className="googlebuttoncontainer">
            <button
              type="button"
              className="signinwithgoogle"
              onClick={signInWithGoogle}
            >
              Sign in with Google
            </button>
          </div>
          <label htmlFor="username" className="usernamelabel">
            Username
          </label>
          <input
            className="username"
            id="username"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="passwordlabel">
            Password
          </label>
          <input
            className="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="signinbuttoncontainer">
            <button
              className="signinbutton"
              type="button"
              onClick={() => signinwithemailandpass(email, password)}
            >
              Sign In
            </button>
          </div>
          <div className="signupbuttoncontainer">
            <button
              className="signupbutton"
              type="button"
              onClick={() => setCurrentPage("signup")}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  ) : (
    <SignUpPage
      setCurrentPage={setCurrentPage}
      signInWithGoogle={signInWithGoogle}
      signUpWithEmailAndPassword={signUpWithEmailAndPassword}
    />
  );
}

export function EmailSearch() {
  const db = firebase.firestore();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const querySnapshot = await db
        .collection("users")
        .where("email", "==", searchTerm)
        .get();

      const results = querySnapshot.docs.map((doc) => doc.data());
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching emails:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {searchResults.map((user) => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  );
}


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
  );
  return user ? Application : <LoginPage />;
}

export default App;
