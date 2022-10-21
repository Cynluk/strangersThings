import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { fetchAllPosts, deletePost, editPost } from "../api/post";

import styles from "../styles/PostById.module.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { createMessage } from "../api/message";
import Message from "./Messages";

function SinglePost() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const params = useParams();
  const { token, user } = useAuth();

  useEffect(() => {
    async function getPostById() {
      const result = await fetchAllPosts();
      const [singlePost] = result.data.posts.filter((post) => {
        return post._id === params.id;
      });
      setPost(singlePost);
    }
    getPostById();
  }, []);

  async function handleDelete() {
    const result = await deletePost(token, post._id);

    navigate("/posts");
  }

  async function handleEdit() {
    navigate(`/posts/edit/${post._id}`);
  }

  async function handleMessage() {
    const result = await createMessage(token, post._id, post.title);
    navigate(`/posts/${post._id}/messages`);
  }

  return (
    <Card style={{ width: "800px" }}>
      <Card.Title>{post.title}</Card.Title>
      <Card.Text>Description: {post.description}</Card.Text>
      <Card.Text>Price: {post.price}</Card.Text>
      <Card.Text>
        Will Deliver?: {post.willDeliver === true ? "Yes" : "No"}
      </Card.Text>

      {user?._id === post.author?._id && (
        <div>
          <Button
            className={styles.button}
            variant="primary"
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button
            className={styles.button}
            variant="primary"
            onClick={handleEdit}
          >
            Edit
          </Button>
        </div>
      )}
      {user?.username !== "Guest" ? (
        <>
          <Message postId={post._id} />
        </>
      ) : null}
    </Card>
  );
}
export default SinglePost;
