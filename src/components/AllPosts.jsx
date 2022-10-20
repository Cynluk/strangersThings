import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { fetchAllPosts } from "../api/post";
import styles from "../styles/AllPosts.module.css";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

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

  // function postMatches(post, text) {
  //   if (
  //     searchTerm === post.title ||
  //     post.description ||
  //     post.price ||
  //     post.location
  //   )
  //     return filteredPosts;
  //   else {
  //     return postsToDisplay;
  //   }
  // }
  // const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
  // const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  // return true if any of the fields you want to check against include the text
  // strings have an .includes() method

  return (
    <Card style={{ width: "800px" }}>
      <Card.Body>
        <input
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />

        {/* postsToDisplay.map */}
        {posts.map((post) => {
          return (
            <div key={post._id} className={styles.container}>
              <Card.Title>{post.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Description: {post.description}
              </Card.Subtitle>
              <Card.Text>Price: {post.price}</Card.Text>
              <Card.Text>Location: {post.location}</Card.Text>
              <Card.Text>{post.willDeliver}</Card.Text>
              <Button
                variant="primary"
                onClick={() => {
                  navigate(`/posts/${post._id}`);
                }}
              >
                See Details
              </Button>
            </div>
          );
        })}
      </Card.Body>
    </Card>
  );
}
