import { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import useAuth from "./hooks/useAuth";
import {Routes, Route} from "react-router-dom";
import NavBar from "./components/NavBar";
import AllPosts from "./components/AllPosts";
import "./App.css";


function App() {
  const{user} =useAuth();
  console.log("user: ",user);

  return (
    <div className="App">
      <h4>{user?.username}</h4>
      <NavBar/>
      <Routes>
        <Route path = "/users/login" element = { <Login />}/> 
        <Route path = "/users/register" element = {<Register />}/>
        <Route path = "/user/me" element = {"Profile"}/>
        <Route path = "/posts" element = {"posts"}/>
        <Route path = "/posts/post_id" element={"singlePost"}/>
        <Route path = "/posts/post_id/messages" element = {"messages"}/>      
       </Routes>
    </div>
  );
}

export default App;
