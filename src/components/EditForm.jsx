import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { editPost } from "../api/post";
import { fetchAllPosts } from "../api/post";

export default function EditPost({token}) {
 
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const params = useParams();
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [price, setPrice] = useState(post.price);
  const [location, setLocation] = useState(post.location);
  const [willDeliver, setWillDeliver] = useState(false);
console.log(token)

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
      <form
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
          console.log(result);
        }}
      >
        <h3>Edit the Post</h3>
        <label>Title:</label>
        <input
          value={title}
          type="text"
          placeholder={post.title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <label>Description:</label>
        <input
          value={description}
          type="text"
          placeholder={post.description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
        <label>Price:</label>
        <input
          value={price}
          type="text"
          placeholder={post.price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        ></input>
        <label>Location:</label>
        <input
          value={location}
          type="text"
          placeholder={post.location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        ></input>
        <label>Willing to Deliver:</label>
        <input
          value={willDeliver}
          type="checkbox"
          onChange={() => {
            setWillDeliver(!willDeliver);
          }}
        ></input>
        <button type="submit">Updated Post</button>
      </form>
    </div>
  );
}
