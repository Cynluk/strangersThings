import { useState, useEffect } from "react";
import { fetchAllPosts, fetchPostById } from "../api/post";
import { useNavigate, useParams } from "react-router-dom";

function SinglePost() {
  const [post, setPost] = useState({});
  const params = useParams();

  useEffect(() => {
    async function getPostById() {
      const result = await fetchAllPosts();
      const [singlePost] = result.data.posts.filter((post)=>{
        return post._id === params.id
      });
      setPost(singlePost)
     
    }
    getPostById();
  }, []);

  return (
    <div>
      <h5>{post.title}</h5>
      <h3>{post.description}</h3>
      <h3>{post.price}</h3>
      <h3>{post.willDeliver}</h3>
    </div>
  );
}
export default SinglePost;
