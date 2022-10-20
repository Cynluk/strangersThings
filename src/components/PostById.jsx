import { useState, useEffect } from "react";
import {
  fetchAllPosts,
  fetchPostById,
  deletePost,
  editPost,
} from "../api/post";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

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
  console.log(user);

  const searchBar = () => {};

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
    console.log(result);
    navigate("/posts");
  }

  async function handleEdit() {
    const result = await editPost(
      token,
      post._id,
      post.title,
      post.description,
      post.price,
      post.willDeliver
    );
    console.log(result);
    console.log("token: ", token);
    console.log("post: ", post);
    navigate(`/posts/edit/${post._id}`);
  }

  async function handleMessage() {
    const result = await createMessage(token, post._id, post.title);
    navigate(`/posts/${post._id}/messages`);
    console.log(result);
  }
  console.log("The post", post);
  return (
    <Card style={{ width: "800px" }}>
      <Card.Title>{post.title}</Card.Title>
      <Card.Text>Description: {post.description}</Card.Text>
      <Card.Text>Price: {post.price}</Card.Text>
      <Card.Text>{post.willDeliver}</Card.Text>

      {user?._id === post.author?._id && (
        <div>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Edit
          </Button>
        </div>
      )}
      <Message postId={post._id} />
    </Card>
  );
}
export default SinglePost;
