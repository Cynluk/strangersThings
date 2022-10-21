import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { createPost } from "../api/post";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function NewPost() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);

  return (
    <div>
      <Form
        style={{ width: "800px" }}
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await createPost(
            token,
            title,
            description,
            price,
            location,
            willDeliver
          );
          navigate("/posts");
          console.log(result);
        }}
      >
        <h3>Create a New Post</h3>
        <Form.Label>Title:</Form.Label>
        <Form.Control
          value={title}
          type="text"
          placeholder="Enter a name for your post. (Required)"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></Form.Control>
        <Form.Label>Description:</Form.Label>
        <Form.Control
          value={description}
          type="text"
          placeholder="Enter a description for your post. (Required)"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          as="textarea"
          rows={5}
        />
        <Form.Label>Price:</Form.Label>
        <Form.Control
          value={price}
          type="text"
          placeholder="How much is the item? (Required)"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        ></Form.Control>
        <Form.Label>Location:</Form.Label>
        <Form.Control
          value={location}
          type="text"
          placeholder="The location of the post.(Optional)"
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
          Create
        </Button>
      </Form>
    </div>
  );
}
