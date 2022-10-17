import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { fetchAllPosts } from "../api/post";

export default function AllPosts (){
    const {setToken}= useAuth();
    const [posts, setPosts]= useState([]);

    useEffect(()=>{
        async function getAllPosts(){
            const post = await fetchAllPosts();
            setPosts(post);
        } 
        getAllPosts();
    },[]);

return (
    <div >
{posts.map ((post)=>{
    return(
        <div>
            <h3>{post.title}</h3>
            <h3>{post.description}</h3>
            <h3>{post.price}</h3>
            <h3>{post.willDeliver}</h3>
        </div>
    )
})}
    </div>
)    

};
