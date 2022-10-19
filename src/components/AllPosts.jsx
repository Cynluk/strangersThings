import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { fetchAllPosts } from "../api/post";

export default function AllPosts() {
  const { setToken } = useAuth();
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    async function getAllPosts() {
      const post = await fetchAllPosts();
      setPosts(post.data.posts);
    }
    getAllPosts();
  }, []);

  function postMatches(post, text) {
    if (
      searchTerm === post.title ||
      post.description ||
      post.price ||
      post.location
    )
      return filteredPosts;
    else {
      return postsToDisplay;
    }
  }
  const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  // return true if any of the fields you want to check against include the text
  // strings have an .includes() method

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />

      {postsToDisplay.map((post) => {
        return (
          <div key={post._id}>
            <h5>{post.title}</h5>
            <h3>{post.description}</h3>
            <h3>{post.price}</h3>
            <h3>{post.location}</h3>
            <h3>{post.willDeliver}</h3>
            <button
              onClick={() => {
                navigate(`/posts/${post._id}`);
              }}
            >
              See Details
            </button>
          </div>
        );
      })}
    </div>
  );
}
