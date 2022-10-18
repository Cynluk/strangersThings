import { useReducer } from "react";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function NavBar({ user, setToken }) {
  return (
    <nav>
      <h3>Welcome, {user.username}</h3>
      <Link to="/posts">Home</Link>
      {user.username === "Guest" ? (
        <>
          {" "}
          <Link to="/auth/register">Register</Link>
          <Link to="/auth/login"> Login</Link>
        </>
      ) : null}

      {user.username !== "Guest" ? (
        <>
          <Link to="/user/me">Profile </Link>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              setToken("");
            }}
          >
            Log Out
          </button>
        </>
      ) : null}
    </nav>
  );
}
