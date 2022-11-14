import React, { useEffect, useState } from "react";
import { MessageItem, UserItem } from "@chat-app/shared";
import "../App.css";
import axios from "axios";
import { LoginInput } from "../LoginInput";

axios.defaults.baseURL =
  process.env.REACT_APP_MESSAGE_API || "http://localhost:4000";
axios.interceptors.request.use((config) => {
  if (!config?.headers) {
    config.headers = {};
  }
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    config.headers["authorization"] = `Bearer ${jwt}`;
  }
  return config;
});

const fetchMessages = async (): Promise<MessageItem[]> => {
  const response = await axios.get<MessageItem[]>("/api/messages");
  return response.data;
};

const MessageList = ({
  message,
  error,
}: {
  message: MessageItem[];
  error?: string;
}) => {
  if (error) {
    return <div>{error}</div>;
  } else if (message) {
    return (
      <div>
        {message.map((item, index) => {
          return (
            <div key={index}>
              <div className="MessageList">
                <p>
                  <div className="MessageText">{item.text}</div>
                  <div className="MessageAuthor">
                    {item.author} -
                    {item.timeStamp.toString().split("T")[0].substring(0, 10)} -{" "}
                    {item.timeStamp.toString().split("T")[1].substring(0, 5)}
                  </div>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>'Waiting for messages'</div>;
  }
};

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
      <button className="ButtonCreate" onClick={(e) => onCreate(messageText)}>
        Create Message
      </button>
    </>
  );
};

export default function HomePage() {
  const [messageText, setMessageText] = useState<string>("");
  const [message, setMessage] = useState<MessageItem[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  const createMessage = async (messageText: string): Promise<void> => {
    const messageItem: MessageItem = {
      text: messageText,
      timeStamp: new Date(),
      author: "",
    };
    try {
      await axios.post("/api/messages", messageItem);
      const response = await axios.get<MessageItem[]>("/api/messages");
      setMessage(response.data);
    } catch (err) {
      setMessage([]);
      setError("SOMETHING WENT WRONG FETCHING MESSAGES..");
    } finally {
      setMessageText("");
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages()
        .then(setMessage)
        .catch((error) => {
          setMessage([]);
          setError("Something went wrong when fetching messages...");
        });
    }, 2500);
  }, []);

  const performLogin = async (
    username: string,
    password: string
  ): Promise<void> => {
    const loginResponse = await axios.post("/login", {
      username: username,
      password: password,
    });

    if (loginResponse && loginResponse.status === 200) {
      localStorage.setItem("jwt", loginResponse.data);
      setLoggedIn(true);
      setError("");
      const response = await axios.get<MessageItem[]>("/api/messages");
      setMessage(response.data);
    }
  };

  return (
    <div className="App">
      <header className="App-header"> Chatt App </header>
      <section className="App-content">
        <div>
          {isLoggedIn ? (
            <MessageList message={message} error={error} />
          ) : (
            <LoginInput onLogin={performLogin} />
          )}
        </div>
      </section>
      <footer className="App-footer">
        <MessageInput
          onCreate={createMessage}
          setMessageText={setMessageText}
          messageText={messageText}
        />
      </footer>
    </div>
  );
}
