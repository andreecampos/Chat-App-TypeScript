import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { UserItem } from "@chat-app/shared";

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const createUser = (username: string): void => {
    const user: UserItem = {
      username,
      password,
    };
    axios
      .post<UserItem>("/register", user)
      .then((response) => console.log(response));
  };

  return (
    <div className="loginForm">
      Register Page
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
        <button className="ButtonLogin" onClick={(e) => createUser(username)}>
          Register
        </button>
      </div>
      <br />
      <Link className="Link" to="/">
        LOGIN
      </Link>
    </div>
  );
}
