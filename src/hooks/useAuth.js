import { useState, useEffect } from "react";
import { fetchMe } from "../api/auth";

export default function useAuth() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({ username: "Guest" });

  useEffect(() => {
    async function getMe() {
      console.log("Token before fetch");
      const result = await fetchMe(token);
      console.log(result);
      setUser(result.data);
    }
    if (token) {
      getMe();
    } else {
      setUser({ username: "Guest" });
    }
  }, [token]);

  console.log("user currently is: ", user);

  return {
    token,
    setToken,
    user,
    setUser,
  };
}
