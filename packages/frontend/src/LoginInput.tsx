import { useState } from "react";
import { Link } from "react-router-dom";


type LoginInputProps = {
  onLogin: (username: string, password: string) => Promise<void>;
};

export const LoginInput = (props: LoginInputProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");


  const attemptLogin = async () => {
    console.log(`Login with ${username} and ${password}`);
    props.onLogin(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="loginForm">
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
        <button className="ButtonLogin" onClick={attemptLogin}>
          Login
        </button>
      </div>
      <Link className="Link" to="/register">
        REGISTER
      </Link>
    </div>
  );
};
