import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { fetchAllPosts } from "../api/post";
import styles from "../styles/AllPosts.module.css";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

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

  const filteredPosts = posts.filter((post) => post.title.includes(searchTerm));
  console.log("posts", posts);
  // return true if any of the fields you want to check against include the text
  // strings have an .includes() method

  return (
    <Card style={{ width: "800px" }}>
      <Card.Body>
        <InputGroup className="searchBar">
          <Form.Control
            placeholder="Search Posts by Title."
            // {" "}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </InputGroup>

        {posts && searchTerm
          ? posts
              .filter((post) => post.title.toLowerCase().includes(searchTerm))
              .map((post) => {
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
              })
          : posts.map((post) => {
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
