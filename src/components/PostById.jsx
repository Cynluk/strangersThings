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

function SinglePost() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const params = useParams();
  const { token } = useAuth();

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
    console.log("Username:", post.isAuthor);
  }

  return (
    <Card style={{ width: "800px" }}>
      <Card.Title>{post.title}</Card.Title>
      <Card.Text>Description: {post.description}</Card.Text>
      <Card.Text>Price: {post.price}</Card.Text>
      <Card.Text>{post.willDeliver}</Card.Text>

      <Button variant="primary" onClick={handleDelete}>
        Delete
      </Button>
      <Button variant="primary" onClick={handleEdit}>
        Edit
      </Button>
    </Card>
  );
}

export default SinglePost;
