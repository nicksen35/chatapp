import "../App.scss";
import SideBar from "../Components/sidebar";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { signOut } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { doc, setDoc } from "firebase/firestore";
import "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { getDatabase, ref as sRef, set, onValue } from "firebase/database";
import { onSnapshot } from "firebase/firestore";

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
const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth();
const db = firebase.firestore();
const database = getDatabase();

export const handleLogout = () => {
  signOut(auth)
    .then(() => {
      console.log("Signed out successfully");
    })
    .catch((error) => {
      // An error happened.
    });
};

export const getCurrentUserId = () => {
  const currentuser = auth.currentUser;
  if (currentuser) {
    return currentuser.uid;
  }
  return null;
};
const getCurrentEmail = () => {
  const currentuser = auth.currentUser;
  if (currentuser) {
    return currentuser.email;
  }
  return null;
};
const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Create user document in Firestore
    if (result.uid != null) {
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
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    if (user.uid != null) {
      const userDocRef = await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
        // Add any other user data you want to store
      });
      console.log("User document created with ID: ", userDocRef.id);
    } else {
      console.log("You have already signed up");
    }
  } catch (error) {
    console.error("Error signing up:", error);
  }
};
function SignUpPage({
  setCurrentPage,
  signInWithGoogle,
  signUpWithEmailAndPassword,
}) {
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
export function FriendRequests() {
  const [isUpdated, setIsUpdated] = useState(false);
  const [data, getData] = useState({});
  const [documentData, getDocumentData] = useState([]);
  let [receiverData, getReceiverData] = useState([]);
  let [senderData, getSenderData] = useState([]);
  const [refresh, setRefresh] = useState({});

  const removeDataFromArray = (dataToRemove, dataArray) => {
    const index = dataArray.indexOf(dataToRemove);
    if (index > -1) {
      dataArray.splice(index, 1);
    }
  };

  const handleFriendRequests = async (documentid, state) => {
    try {
      const docref = doc(db, "friendrequests", documentid);
      let data = {};

      if (state === "accepted") {
        data = {
          status: "accepted",
        };
        getData(data);
        //console.log("Doc Ref", docref);
        removeDataFromArray(data, receiverData);
        removeDataFromArray(data, senderData);
        //console.log()
      } else if (state === "rejected") {
        data = {
          status: "rejected",
        };
        getData(data);
        removeDataFromArray(data, receiverData);
        removeDataFromArray(data, senderData);
      } else if (state === "cancelled") {
        data = {
          status: "cancelled",
        };
        getData(data);
        removeDataFromArray(data, receiverData);
        removeDataFromArray(data, senderData);
      }

      setDoc(docref, data, { merge: true }).then((docref) => {
        //console.log("Document has been updated accordingly");
      });
    } catch (error) {
      //console.log(error);
    }
    getSenderData(
      senderData.filter(
        (item) =>
          item.senderid === getCurrentUserId() && item.status === "pending"
      )
    );

    getReceiverData(
      receiverData.filter(
        (item) =>
          item.senderid === getCurrentUserId() && item.status === "pending"
      )
    );
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const friendrequests = firebase.firestore().collection("friendrequests");
      const friendsdocref = firebase.firestore().collection("friends");
      const results = [];
      const sentRequests = [];
      const receivedRequests = [];

      try {
        const unsubscribe = friendrequests.onSnapshot((snapshot) => {
          snapshot.docs.forEach(async (doc) => {
            const data = doc.data();
            const values = Object.values(data);
            const {
              recieveremail,
              senderemail,
              senderid,
              requestedUser,
              status,
            } = data;

            if (values.includes(getCurrentUserId())) {
              const documentId = doc.id;
              const mappedData = {
                documentId,
                senderid,
                requestedUser,
                status,
                recieveremail,
                senderemail,
              };

              if (senderid === getCurrentUserId()) {
                sentRequests.push(mappedData);
              } else {
                receivedRequests.push(mappedData);
              }

              results.push(mappedData);
            }

            if (status === "accepted") {
              if (values.includes(getCurrentUserId())) {
                const documentId = doc.id;
                const mappedData = {
                  UserID: senderid,
                  FriendID: requestedUser,
                  FriendEmail: recieveremail,
                  UserEmail: senderemail,
                };
                await friendsdocref
                  .doc(documentId)
                  .set(mappedData, { merge: true });
              }
            }
          });
          getSenderData([...sentRequests]);
          getReceiverData([...receivedRequests]);

          // Trigger component reload by updating state
          // You may need to modify the state objects to prevent stale data issues
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error retrieving user IDs: ", error);
      }
    };

    fetchUserData();
  }, []); // No need to include 'isUpdated' in dependency array since it is handled internally
  //console.log(senderData)
  //console.log(receiverData)
  console.log(senderData, "Sender Data", receiverData, "RecieverData");
  const FriendRequestPage = (
    <div>
      <h1 className="pendingheader">Sent Friend Requests: </h1>
      <div className="friendreqcardcontainer">
        {senderData.map((docdata) => (
          <div key={`sender` + docdata.documentId}>
            <div
              className={
                docdata.status === "pending"
                  ? "friendreqcard"
                  : "friendreqcardhidden"
              }
            >
              <p className="friendreqpara">
                {" "}
                {docdata.recieveremail} {docdata.status}{" "}
              </p>
              <button
                className="cancelfriendreq"
                onClick={() =>
                  handleFriendRequests(docdata.documentId, "cancelled")
                }
              >
                Cancel Friend Request
              </button>
            </div>
          </div>
        ))}
      </div>

      <div>
        {receiverData.map((docdata) => (
          <div
            key={docdata.documentId}
            className={
              docdata.status === "pending"
                ? "friendreqcard"
                : "friendreqcardhidden"
            }
          >
            <p className="friendreqpara"> {docdata.senderemail}</p>
            <div className="friendreqbuttoncontainer">
              <button
                className="acceptfriendreq"
                onClick={() =>
                  handleFriendRequests(docdata.documentId, "accepted")
                }
              >
                {" "}
                Accept{" "}
              </button>
              <button
                className="declinefriendreq"
                onClick={() =>
                  handleFriendRequests(docdata.documentId, "rejected")
                }
              >
                {" "}
                Decline{" "}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  return FriendRequestPage;
}

export function FriendsList() {
  const [FriendsList, getFriendsList] = useState([]);
  useEffect(() => {
    try {
      const friendsdocref = firebase.firestore().collection("friends");
      friendsdocref
        .get()
        .then((snapshot) => {
          const emailList = [];
          snapshot.docs.forEach((doc) => {
            const data = doc.data();
            const values = Object.values(data);
            const { FriendEmail, FriendID, UserID, UserEmail } = data;
            const senderMappedData = { UserID, UserEmail };
            const recieverMappedData = { FriendEmail, FriendID };
            if (values.includes(getCurrentUserId())) {
              FriendID === getCurrentUserId()
                ? emailList.push(senderMappedData)
                : emailList.push(recieverMappedData);
            }
          });
          getFriendsList(emailList);
          console.log("e")
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);
  
  return (
    <>
      <div>
        <h1 className="friendslistheader"> Friends' List </h1>
        {FriendsList.map((doc) => (
          <>
            <div id="senderbox" className="friendbox">
              <div className="textcontainer">
                <p> Friend ID: {doc.UserID} </p>
                <p> Friend Email: {doc.UserEmail} </p>
              </div>
            </div>
            <div id="recieverbox" className="friendbox">
              <div className="textcontainer">
                <p> Friend ID: {doc.FriendID} </p>
                <p> Friend Email: {doc.FriendEmail} </p>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
export function EmailSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      console.log(db);
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

  const sendFriendRequest = async (user, email) => {
    const senderid = getCurrentUserId();
    const senderemail = getCurrentEmail();
    const friendrequests = firebase.firestore().collection("friendrequests");
    //console.log('Current User:', senderid)

    try {
      const existingRequest = await friendrequests
        .where("senderid", "==", senderid)
        .where("requestedUser", "==", user)
        .where("senderemail", "==", senderemail)
        .where("recieveremail", "==", email)
        .get();
      if (!existingRequest.empty) {
        console.log("Friend request already sent to this user.");
        return;
      } else if (senderid === user) {
        console.log(
          "Friend request cannot be sent to this user. It is yourself."
        );
        return;
      }
      console.log(friendrequests);
      await friendrequests.add({
        senderid,
        requestedUser: user,
        senderemail,
        recieveremail: email,
        status: "pending",
      });

      //console.log("Request Sent Successfully!")
    } catch (error) {
      console.error("Error Sending Friend Request" + error);
    }
  };

  return (
    <div className="friendsearchdiv">
      <div className="friendsearchupper">
        <input
          type="text"
          placeholder="Add your Friends via Email!"
          className="friendsearchbox"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="friendsearchbutton" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="friendsearchlower">
        {searchResults.map((user) => (
          <div className="userprofile" key={user.uid}>
            <h1>
              {" "}
              {user.email} {user.uid}{" "}
            </h1>
            <button onClick={() => sendFriendRequest(user.uid, user.email)}>
              {" "}
              Send a Friend Request{" "}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Homepage() {
  const [user, setUser] = useState(null);
  console.log(user);
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
