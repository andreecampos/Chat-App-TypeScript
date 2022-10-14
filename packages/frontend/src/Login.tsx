import React, { useEffect, useState } from "react";
import { UserItem } from '@chat-app/shared'
import axios from "axios";


axios.defaults.baseURL = 'http://localhost:4000/api/login'



const fetchUsers = async (): Promise<UserItem[]> =>{
    const response = await axios.get<UserItem[]>("/")
    return response.data
}

// const UserInput = ({
//   userText,
//   setUserText,
//   onCreate,
// }: {
//   userText: string;
//   setUserText: (user: string) => void;
//   onCreate: (text: string) => void;
// }) => {
//   return (
//     <>
//       <input
//         type="text"
//         value={userText}
//         onChange={(e) => setUserText(e.target.value)}
//         placeholder="username"
//       />
//       <input 
//       type="password"
//       value={password}
//       onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={(e) => onCreate( userText)}>register login</button>
//     </>
//   );
// };









function Login() {
    const [username, setUsername] = useState<UserItem[]>([]);
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | undefined>();
    const [userText, setUserText]= useState<string>("");
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

    const createUser = async (userText: string): Promise<void> => {
        const userItem: UserItem = {
          username: userText,
          password: "",
        }
        try {
          await axios.post("/", userItem);
          const response = await axios.get<UserItem[]>("/");
          setUsername(response.data);
        }catch(err){
            setUsername([])
          setError("SOMETHING WENT WRONG FETCHING MESSAGES..");
        }finally{
            setUserText("")
        }
      }
        
      const UserInput = ({
        userText,
        setUserText,
        onCreate,
      }: {
        userText: string;
        setUserText: (user: string) => void;
        onCreate: (text: string) => void;
      }) => {
        return (
          <>
            <input
              type="text"
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder="username"
            />
            <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={(e) => onCreate( userText)}>register login</button>
          </>
        );
      };


useEffect(()=> {
    fetchUsers()
        .then(setUsername)
        .catch((error)=>{
            setUsername([]);
            setError("Something wnet wrong fetching users")
        })
}, [])

const performLogin = async (
  username: string,
  password: string
): Promise<void> => {
  const loginResponse = await axios.post("/", {
    username: username,
    password: password,
  });
  if (loginResponse && loginResponse.status === 200) {
    localStorage.setItem("jwt", loginResponse.data);
    setLoggedIn(true);
    setError("");
    const response = await axios.get<UserItem[]>("/");
    setUsername(response.data);
  }
};



    return (
        <div className="loginForm">
          {/* <div>
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
            <button onClick={attemptLogin}>Login</button>
          </div> */}

          <footer className="App-footer">
       <UserInput
          onCreate={createUser}
          setUserText={setUserText}
          userText={userText}
        />
     </footer>
        </div>
      );
}
export default Login;