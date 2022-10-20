import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Params } from "react-router-dom";
import { createMessage } from "../api/message";
import { useNavigate } from "react-router-dom";

export default function Message({ postId }) {
  const [message, setMessage] = useState();
  const { token } = useAuth();
  const [content, setContent] = useState();
  const [params, setParams] = useState();

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await createMessage(token, postId, message.content);
          console.log(result);
        }}
      >
        <input placeholder="Write message here" type="text"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
