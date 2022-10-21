import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editPost, fetchAllPosts } from "../api/post";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function EditPost({ token }) {
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const params = useParams();
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [price, setPrice] = useState(post.price);
  const [location, setLocation] = useState(post.location);
  const [willDeliver, setWillDeliver] = useState(false);

  useEffect(() => {
    async function getPostById() {
      const result = await fetchAllPosts();
      const [singlePost] = result.data.posts.filter((post) => {
        return post._id === params.id;
      });

      setPost(singlePost);
      setTitle(singlePost.title);
      setDescription(singlePost.description);
      setPrice(singlePost.price);
      setLocation(singlePost.location);
      setWillDeliver(singlePost.willDeliver);
    }
    getPostById();
  }, []);

  return (
    <div>
      <Form
        style={{ width: "800px" }}
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await editPost(
            params.id,
            token,
            title,
            description,
            price,
            location,
            willDeliver
          );
          navigate("/posts");
        }}
      >
        <h3>Edit the Post</h3>
        <Form.Label>Title:</Form.Label>
        <Form.Control
          value={title || ""}
          type="text"
          placeholder={post.title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></Form.Control>

        <Form.Label>Description:</Form.Label>
        <Form.Control
          value={description || ""}
          type="text"
          placeholder={post.description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          as="textarea"
          rows={5}
        />
        <Form.Label>Price:</Form.Label>
        <Form.Control
          value={price || ""}
          type="text"
          placeholder={post.price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        ></Form.Control>
        <Form.Label>Location:</Form.Label>
        <Form.Control
          value={location || ""}
          type="text"
          placeholder={post.location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        ></Form.Control>
        <Form.Label>Willing to Deliver:</Form.Label>
        <Form.Check
          value={willDeliver}
          type="checkbox"
          onChange={() => {
            setWillDeliver(!willDeliver);
          }}
        ></Form.Check>
        <Button variant="primary" type="submit">
          Update Post
        </Button>
      </Form>
    </div>
  );
}
