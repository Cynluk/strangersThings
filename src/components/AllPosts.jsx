import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import  {useNavigate} from "react-router-dom";
import { fetchAllPosts } from "../api/post";

export default function AllPosts() {
  const { setToken } = useAuth();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getAllPosts() {
      const post = await fetchAllPosts();
      setPosts(post.data.posts);
      
    }
    getAllPosts();
  }, []);

  return (
    <div>
      {posts.map((post, index) => {
        return (
        <div key= {post._id}>
            <h5>{post.title}</h5>
            <h5>{post._id}</h5>
            <h3>{post.description}</h3>
            <h3>{post.price}</h3>
            <h3>{post.willDeliver}</h3>
            <button onClick={()=>{
                navigate(`/posts/${post._id}`)
            }}>See Details </button>
        </div>
        );
      })}
    </div>
  );
}
