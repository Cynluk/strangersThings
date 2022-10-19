import { useState, useEffect } from "react";
import {
  fetchAllPosts,
  fetchPostById,
  deletePost,
  editPost,
} from "../api/post";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function SinglePost() {
  const[searchInput, setSearchInput]=useState("");
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const params = useParams();
  const { token } = useAuth();

const searchBar=()=>{

}

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
    navigate(`/posts/edit/${post._id}`);
  }

  return (
    <div>
      <h5>{post.title}</h5>
      <h3>{post.description}</h3>
      <h3>{post.price}</h3>
      <h3>{post.willDeliver}</h3>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}
export default SinglePost;
