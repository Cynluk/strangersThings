// import { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

export default function NavBar({ user, setToken }) {
  const navigate = useNavigate();
  return (
    <Nav fill variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <h3>Welcome, {user.username}</h3>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/posts">Home</Nav.Link>
      </Nav.Item>
      {user.username === "Guest" ? (
        <>
          {" "}
          <Nav.Item>
            <Nav.Link href="/auth/register">Register</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/auth/login"> Login</Nav.Link>
          </Nav.Item>
        </>
      ) : null}

      {user.username !== "Guest" ? (
        <>
          <Nav.Item>
            <Nav.Link href="/user/me">Profile </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/posts/create_new_post">Create a Post</Nav.Link>
          </Nav.Item>
          <Button
            variant="primary"
            onClick={() => {
              localStorage.removeItem("token");
              setToken("");
              navigate("/auth/login");
            }}
          >
            Log Out
          </Button>{" "}
        </>
      ) : null}
    </Nav>
  );
}
