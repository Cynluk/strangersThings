import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { fetchMe } from "../api/auth";
import styles from "../styles/Profile.module.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function Messages() {
  const { token } = useAuth();
  const [message, setMessage] = useState([]);
  const [post, setPost] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllMessages() {
      const userData = await fetchMe(token);
      setMessage(userData.data.messages);
      console.log(userData);
    }
    getAllMessages();

    async function getUserPosts() {
      const userData = await fetchMe(token);
      setPost(userData.data.posts);
    }
    getUserPosts();
  }, []);
  return (
    <Card style={{ width: "800px" }}>
      <Card.Body>
        <Card.Title className={styles.title}> Messages</Card.Title>
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
      <Card.Body>
        <Card.Title className={styles.title}>My Posts</Card.Title>
        {post
          .filter((post) => post.active)
          .map((arr) => {
            return (
              <div key={arr._id} className={styles.container}>
                <Card.Title>Post Title: {arr.title}</Card.Title>
                <Card.Subtitle>Description {arr.description}</Card.Subtitle>
                <Card.Text>Price {arr.price}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => {
                    console.log(arr);
                    navigate(`/posts/${arr._id}`);
                  }}
                >
                  See Details
                </Button>
              </div>
            );
          })}
      </Card.Body>
    </Card>
  );
}
