import { useState, useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import AllPosts from "./components/AllPosts";
import "./App.css";
import Auth from "./components/Auth";

function App() {
  const { setToken, user } = useAuth();
  console.log("user: ", user);

  return (
    <div className="App">
      <h4>{user?.username}</h4>
      <NavBar setToken={setToken} user={user} />
      <Routes>
        <Route path="/auth/:method" element={<Auth setToken={setToken} />} />
        <Route path="/user/me" element={"Profile"} />
        <Route path="/posts" element={<AllPosts />} />
        <Route path="/posts/post_id" element={"singlePost"} />
        <Route path="/posts/post_id/messages" element={"messages"} />
      </Routes>
    </div>
  );
}

export default App;
