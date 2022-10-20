import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { fetchMe } from "../api/auth";

export default function Messages() {
  const { token, user, setToken } = useAuth();
  const [message, setMessage] = useState([]);

  useEffect(() => {
    async function getAllMessages() {
      const userData = await fetchMe(token);
      setMessage(userData.data.messages);
      console.log("UserData", userData.data.messages);
    }
    getAllMessages();
  }, []);
  return (
    <div>
      {message.map((arr) => {
        return (
          <div>
            {/* <label>Title: {userData.title}</label>
            <h3>From: {userData.username}</h3> */}
            <h3>Message: {arr.content}</h3>
          </div>
        );
      })}
    </div>
  );
  //   return (
  // <div>
  //   {content.map((user) => {
  //     return <div>{user.content}</div>;
  //   })}
  // </div>
  //   );
}
