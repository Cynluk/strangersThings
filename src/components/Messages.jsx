import { useState } from "react";
import useAuth from "../hooks/useAuth";
// import { Params } from "react-router-dom";
import { createMessage } from "../api/message";
import { useNavigate } from "react-router-dom";

export default function Message({ postId }) {
  const { token } = useAuth();
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  // const params = useParams();
  // console.log("content", message);

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await createMessage(token, postId, content);
          setContent("");
          navigate(`/posts/${postId}`);
          console.log(result);
        }}
      >
        <input
          placeholder="Write message here"
          type="text"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></input>
        <button type="submit">Submit</button>
        {/* {posts && content? content.map(() => {
            return (
              <div>{content}</div>):null}
            })} */}
      </form>
    </div>
  );
}
