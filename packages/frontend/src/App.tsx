import React, { useEffect, useState } from "react";
import MessageItem from '@chat-app/shared'
import './App.css';
import axios from "axios";


axios.defaults.baseURL = 'http://localhost:4000/api/messages'




const fetchMessages = async (): Promise<MessageItem[]> =>{
  const response = await axios.get<MessageItem[]>("/")
  return response.data
}


const MessageList = ({ message, error }: { message: MessageItem[]; error?: string}) =>{
  if (error) {
    return<div>{error}</div>;
  }else if (message){
    return (<div>{message.map((item)=>{
      return <p key={item._id}>{item.text} by {item.userName}</p>
    })}</div>);
  }else {
    return <div>'Waiting for messages'</div>
  }
}

const MessageInput = ({
  messageText,
  setMessageText,
  onCreate,
}: {
  messageText: string;
  setMessageText: (text: string) => void;
  onCreate: (text: string) => void;
}) => {
  return (
    <>
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <button onClick={(e) => onCreate(messageText)}>Create Message</button>
    </>
  );
};







function App() {
const [messageText, setMessageText]= useState<string>("");
const [message, setMessage] = useState<MessageItem[]>([]);
const [error, setError] = useState<string | undefined>();


const createMessage = async (messageText: string): Promise<void> => {
  const messageItem: MessageItem = {
      userName: 'Andree',
      text: messageText,
      timeStamp: new Date()
  }
  try {
    await axios.post("/", messageItem);
    const response = await axios.get<MessageItem[]>("/");
    setMessage(response.data);
  }catch(err){
    setMessage([])
    setError("SOMETHING WENT WRONG FETCHING MESSAGES..");
  }finally{
    setMessageText("")
  }
}







useEffect(()=>{
  fetchMessages()
    .then(setMessage)
    .catch((error) =>{
      setMessage([]);
      setError("Something went wrong when fetching my messages...")
    })
  },[])




  return (
    <div className="App">
      <header className="App-header">
       <div className="Title">
           CHAT APP
        </div> 
        <div className="Message-List">
          <section>
               <MessageList message={message} error={error}/>
          </section>
         </div>


     <div className="Users">
   
     <div className="User-One">
     <footer>
     <MessageInput
          onCreate={createMessage}
          setMessageText={setMessageText}
          messageText={messageText}
        />
     </footer>
     </div>  
     <div className="User-two">
     <footer>
     <MessageInput
          onCreate={createMessage}
          setMessageText={setMessageText}
          messageText={messageText}
        />
     </footer>
     </div>   

     </div>   
      </header>
    </div>
  );
}

export default App;
