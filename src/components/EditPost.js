import React, { useState } from "react";
import { useParams } from "react-router-dom";

const EditPost = ({posts, token})=>{
    const {postID} = useParams();
    const [currentPost] = posts.filter(post => post._id === postID);
    const {title, description, location, price } = currentPost;
    const [newTitle, setNewTitle] = useState(title);
    const [newDesc, setNewDesc] =useState(description)
    const [newLocation, setNewLocation] = useState(location)
    const [newPrice, setNewPrice] = useState(price)
    async function editPost(){
        const updatePosts={
            token:token,
            title:newTitle,
            description:newDesc,
            location:newLocation,
            price:newPrice,
            __id:postID
        }
        await updatePosts(updatePosts)
    }
    return(
        <form onSubmit={(event)=>{
            event.preventDefault();
            editPost()
        }
        }>
            <input
            type='text'
            placeholder={title}
            onChange={(event)=> {setNewTitle(event.target.value)}}/>
            <input
            type='text'
            placeholder={description}
            onChange={(event)=> {setNewDesc(event.target.value)}}/>
            <input
            type='text'
            placeholder={location}
            onChange={(event)=> {setNewLocation(event.target.value)}}/>
            <input
            type='text'
            placeholder={price}
            onChange={(event)=> {setNewPrice(event.target.value)}}/>
            <button type='submit'>Edit Post</button>
        </form>
    )
}
export default EditPost;