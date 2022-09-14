import React, {useState} from "react";
import {TextField} from '@mui/material';
import {Button} from '@mui/material';
import { addPost } from "../api";

const CreatePost = ({token, setPosts, fetchPosts, history})=>{
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [location, setLocation] = useState('')
    
    const handleSubmit = async()=>{
        const result = await addPost(token, title, description, price, location)
        if(result.success){
            setPosts(result.data.posts)
            fetchPosts()
            history('/posts')
        }
        
    }
    return(
        <div>
            <h3>Add Post</h3>
            <form onSubmit={(event)=>{ 
        event.preventDefault();
        handleSubmit();}}>
                <TextField 
                type='text'
                className='input'
                label='Title'
                onChange={(event)=> setTitle(event.target.value)}/>
                <TextField 
                type='text'
                className='input'
                label='Description'
                onChange={(event)=> setDescription(event.target.value)}/>
                <TextField 
                type='text'
                className='input'
                label='Price'
                onChange={(event)=> setPrice(event.target.value)}/>
                <TextField 
                type='text'
                className='input'
                label='Location'
                onChange={(event)=> setLocation(event.target.value)}/>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}
export default CreatePost;