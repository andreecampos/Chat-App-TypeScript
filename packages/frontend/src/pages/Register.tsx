import React from 'react'
//import { UserInfo } from 'os';
import { useState } from "react"
import axios from 'axios'
import { UserItem } from '@chat-app/shared';



export default  function Register() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const createUser = (username: string): void => {
        const user: UserItem = {
          username,
          password
        }
        axios.post<UserItem>("/register", user)
        .then((response => console.log(response)))
      }
    
  return (
    <div className='Register'>register

        <div>
        Username:{" "}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        Password:{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={(e) => createUser(username)}>Register</button>
      </div>
        
    </div>
  )
}

