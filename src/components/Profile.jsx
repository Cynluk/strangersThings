import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { fetchMe } from "../api/auth";
import styles from "../styles/Profile.module.css";
import Card from "react-bootstrap/Card";

export default function Messages() {
  const { token } = useAuth();
  const [message, setMessage] = useState([]);

  useEffect(() => {
    async function getAllMessages() {
      const userData = await fetchMe(token);
      setMessage(userData.data.messages);
    }
    getAllMessages();
  }, []);
  return (
    <Card style={{ width: "800px" }}>
      <Card.Body>
        {message.map((arr) => {
          return (
            <div key={arr._id} className={styles.container}>
              <Card.Title>Post Title: {arr.post.title}</Card.Title>
              <Card.Subtitle>From: {arr.fromUser.username}</Card.Subtitle>
              <Card.Text>Message: {arr.content}</Card.Text>
            </div>
          );
        })}
      </Card.Body>
    </Card>
  );
}
