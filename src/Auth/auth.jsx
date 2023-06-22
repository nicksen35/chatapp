import '../App.scss'
import SideBar from "../Components/sidebar";
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
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/firestore";
import { addDoc, collection, query } from "firebase/firestore";
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
const app = firebase.initializeApp(firebaseConfig)
const analytics = getAnalytics(app);
const auth = getAuth();
const db = firebase.firestore()


export const handleLogout = () => {
  signOut(auth)
    .then(() => {
      console.log("Signed out successfully");
    })
    .catch((error) => {
      // An error happened.
    });
};

const getCurrentUserId = () =>
{
  const currentuser = auth.currentUser;
  if (currentuser)
  {
    return currentuser.uid;
  }
  return null; 
}
const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Create user document in Firestore
    if (result.uid != null)
    {
      const userDocRef = await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
        // Add any other user data you want to store
      });
      console.log("User document created with ID: ", userDocRef.id);
    }
    
    // Continue with any other necessary logic or redirect to the signed-in page
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }

    
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


const signUpWithEmailAndPassword = async (email, password) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (user.uid != null)
    {
      const userDocRef = await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
        // Add any other user data you want to store
      });
      console.log("User document created with ID: ", userDocRef.id);
    }
    else
    {
      console.log("You have already signed up")
    }
  } catch (error) {
    console.error("Error signing up:", error);
  }
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

export function FriendRequests()
{
  const [senderID, getSenderID] = useState([])
  const [recieverID, getRecieverID] = useState([])
  const senderid = getCurrentUserId()
  const friendrequests = firebase.firestore().collection('friendrequests')
  useEffect(() => {
    const fetchUserIds = async () => {

      try {
        const senderquerySnapshot = await friendrequests.where('senderid', '==', senderid).get();
        const senderids = senderquerySnapshot.docs.map((doc) => doc.data().senderid);
        getSenderID(senderids);
      } catch (error) {
        console.error('Error retrieving user IDs: ', error);
      }
    };
    const fetchRecieverIds = async () => {
      try{
        const recieverquerySnapshot = await friendrequests.where('requestedUser', '==', senderid).get();
          const recieverids = recieverquerySnapshot.docs.map((doc) => doc.data().requestedUser);
          getRecieverID(recieverids);
        }
      catch (error)
      {
        console.error("Error retrieving reciever IDs", error)
      }
    }

    fetchUserIds();
    fetchRecieverIds();
  }, 
  []);


  return (
    <div>
      <h1 className='pendingheader'>User IDs:</h1>
      <div className='friendreqcardcontainer'>
        {senderID.map((userId) => (
          <>
          <div className='friendreqcard'> 
          {userId}
          <button>Cancel Friend Request</button>
          </div>
          </>
        ))}
      </div> 
      <h1 className='pendingheader'>Recieved User IDs:</h1> 
      <div className='friendreqcardcontainer'>
        {recieverID.map((userId) => (
          <>
          <div className='friendreqcard'> 
          {userId} 
          <button> Accept </button>
          <button> Decline </button>
          </div>
          </>
        ))}
      </div> 
    </div>
  );
};
export function EmailSearch() {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [requestedUser, setRequestedUser] = useState("");

  const handleSearch = async () => {
    try {
      console.log(db)
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
  const sendFriendRequest = async (user) => {
    setRequestedUser(user)
    const senderid = getCurrentUserId()
    const friendrequests = firebase.firestore().collection('friendrequests')
    console.log('Current User:', senderid)
    try
    {
      
      console.log(friendrequests)
      await friendrequests.add({
        senderid, 
        requestedUser,
        status: 0
    });
    console.log("Request Sent Successfully!")

    }
    catch (error)
    {
      console.error("Error Sending Friend Request" + error)
    }
  }

  return (
    <div className="friendsearchdiv">
      <div className="friendsearchupper">
      <input
        type="text"
        placeholder='Add your Friends via Email!'
        className="friendsearchbox"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="friendsearchbutton" onClick={handleSearch}>Search</button>
      </div>
      <div className="friendsearchlower">
      {searchResults.map((user) => (
        <div className="userprofile" key={user.uid}>
          <h1> {user.email}  </h1>
          <button onClick={() => sendFriendRequest(user.uid)}> Send a Friend Request </button>
        </div>
      ))}
      </div>
    </div>
  );
}

export function Homepage()
{
    const [user, setUser] = useState(null);
    console.log(user)
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