import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { createMessage } from "../api/message";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Message({ postId }) {
  const { token } = useAuth();
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await createMessage(token, postId, content);
          setContent("");
          navigate(`/posts/${postId}`);
        }}
      >
        <Form.Control
          placeholder="Write message here"
          type="text"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          as="textarea"
          rows={5}
        />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
