import "./App.css";
import { useState, useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import NavBar from "./components/NavBar";
import AllPosts from "./components/AllPosts";
import PostById from "./components/PostById";
import NewPostForm from "./components/NewPostForm";
import EditForm from "./components/EditForm";
import Messages from "./components/Messages";
import Profile from "./components/Profile";

function App() {
  const { token, setToken, user } = useAuth();
  console.log("User", user);

  return (
    <div className="App">
      {/* <h4>{user?.username}</h4> */}
      <NavBar setToken={setToken} user={user} />
      <Routes>
        <Route path="/auth/:method" element={<Auth setToken={setToken} />} />
        <Route path="/user/me" element={<Profile />} />
        <Route path="/posts" element={<AllPosts />} />
        <Route path="/posts/:id" element={<PostById />} />
        <Route path="/posts/create_new_post" element={<NewPostForm />} />
        <Route path="/posts/edit/:id" element={<EditForm token={token} />} />
        <Route
          path="/posts/:id/messages"
          element={<Messages token={token} />}
        />
      </Routes>
    </div>
  );
}

export default App;
