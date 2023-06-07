import React, { useEffect, useState } from 'react'
import { auth,db} from './FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
    query,
    orderBy,
    onSnapshot,
    limit,
  } from "firebase/firestore";
const ChatScreen = ({user,setUser,userDetails}) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const navigate=useNavigate()
    const handleSignout=()=>{
          signOut(auth)
          setUser(false)
          navigate("/")
    }
    const { uid,photoURL} = auth.currentUser;
    const handleSubmit=(e)=>{
        e.preventDefault()
        addDoc(collection(db, "messages"), {
            text: message,
            name: userDetails.displayName,
            avatar: userDetails.photoURL,
            createdAt: serverTimestamp(),
            uid,
          });
    }
    useEffect(() => {
        const q = query(
          collection(db, "messages"),
          orderBy("createdAt"),
          limit(50)
        );
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
          let messages = [];
          QuerySnapshot.forEach((doc) => {
            messages.push({ ...doc.data(), id: doc.id });
          });
          setMessages(messages);
        });
        return () => unsubscribe;
      }, []);
  return (
        <>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
           <a class="navbar-brand" href="#">Welcome</a>{userDetails&&userDetails.displayName}
           <img src={photoURL}/>
                  {user ?
                    <button onClick={handleSignout} className="sign-out" type="button">
                      Sign Out
                    </button>
                    :""
           }
        </nav>
        <form style={{marginTop:"85vh",float:"right",marginRight:"10px" }}>
        <input onChange={(e) => setMessage(e.target.value)}/>
        <button onClick={handleSubmit}>ENTER</button>
        </form>
        <div className='row'>
            <div className='col-4' style={{float:"right",marginRight:"10px"}}>
            {messages.filter((ele)=>ele.uid==userDetails.uid).map((message) => (
              <div style={{float:"right"}}>
              <img
                src={message.avatar}
                alt="user avatar"
              />
              <div className="chat-bubble__right">
                <p className="user-name">{message.name}</p>
                <p className="user-message">{message.text}</p>
              </div>
            </div>
        ))}
            </div>
            <div className='col-4'style={{float:"left",marginLeft:"10px"}}>
            <div style={{marginRight:"20px"}}>
            {messages.filter((ele)=>ele.name!==userDetails.displayName).map((message) => (
              <div style={{float:"left"}}>
              <img
                src={message.avatar}
                alt="user avatar"
              />
              <div className="chat-bubble__right">
                <p className="user-name">{message.name}</p>
                <p className="user-message">{message.text}</p>
              </div>
            </div>
        ))}
            </div>

            </div>
        </div>


</>
  )
}
export default ChatScreen