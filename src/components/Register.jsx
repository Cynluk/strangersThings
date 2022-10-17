import { useState, useEffect } from "react";
import { registerUser } from "../api/auth";

export default function Register({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          console.log({ username, password });
          // hit the register api route
          const result = await registerUser(username, password);
          console.log(result);
          const token = result.data.token;
          localStorage.setItem("token", token);
          setToken(token);
        }}
      >
        <h3>Create a New User</h3>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="email"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
