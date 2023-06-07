import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import ChatScreen from './ChatScreen';
const Chat_Route_Table = () => {
    const [user, setUser] = useState(false)
    const [userDetails, setUserDetails] = useState("")

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home setUser={setUser} setUserDetails={setUserDetails}/>} />
            {
               user?
            <Route path="/chat" element={<ChatScreen user={user}setUser={setUser} userDetails={userDetails}/>} />
:""
            }
          </Routes>
        </BrowserRouter>
    </div>
  )
}
export default Chat_Route_Table