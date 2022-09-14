import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { createMessage } from "../api";


const SendMessage =( {postID, token} )=>{
    const [message, setMessage] = useState({content:''});
    async function addMessage(){
        await createMessage({postID, token, message})
    }
    return(
        <form onSubmit={(event)=>{
            event.preventDefault();
            addMessage();
        }}>
            <h3>message</h3>
            <input
            type='text'
            placeholder='message'
            onChange={(event)=> setMessage({content: event.target.value})}
            />
            <button type='submit'>send</button>
        </form>
    )
}

const SinglePost = ({posts, token})=>{
    const [activate, setActivate] = useState(false)
    const {postID} = useParams();
    const [currentPost] = posts.filter(post => post._id === postID);
    const {title, description, location, price } = currentPost;

    return(
        <div>
            <h3>{title}</h3>
            <p>Description: {description}</p>
            <p>Price: {price}</p>
            <p>Location: {location}</p>
            <button onClick={()=>setActivate(!activate)}>message</button>
            {activate && <SendMessage token={token} postID={postID}/>}
        </div>
    )
}
export default SinglePost;