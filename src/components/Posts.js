import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { deletePost } from '../api';
import { TextField, Button } from '@mui/material';


const Post = ({ posts, token })=>{
    const[search, setSearch]=useState(posts)

    const Searchbar = ()=>{
        const [queryString, setQueryString]= useState('')
        
        const handleSubmit= ()=>{
            if (search===''){
                return posts
            }else{
            setSearch(posts.filter(post=>{post.title.includes(posts.queryString)
            })
        )}}
        return(
            <form 
            onSubmit={event=>{
                event.preventDefault();
                handleSubmit()
            console.log(search)}}
            >
                <TextField
                type="text"
                label="search"
                value={queryString}
                onChange={(event)=>setQueryString(event.target.value)}
                />
                <Button type='submit'>search</Button>
            </form>
        )
    }
    
    return(
        <div id="outer"> 
        <h1 id="pageTitle">Posts</h1>
        <Searchbar />
        <Link className="addPost" to = './createPost'><Button >add post</Button></Link>
    <div className="postContainer">
        {
            //I tried switching posts.map to search.map but the site crashed of refresh
            posts.map((post)=>{ 
                const {description, location, price, title, _id, isAuthor} = post;
            return(
                <Fragment key={_id}>
                <div className="posts">
                    <h3>{title}</h3>
                    <p>Description: {description}</p>
                    <div>
                    <p>Price: {price}</p>
                    <p>Location: {location}</p>
                    </div>
                    {isAuthor ? (
                            <>
                            <Link to ={`/posts/edit-post/${_id}`}><button>edit</button></Link>
                            <button onClick={(event)=>{
                                event.preventDefault
                                deletePost(token, _id)}}>delete</button>
                            </>
                        ):(<Link to={`/posts/${_id}`}><button>View</button></Link>)}
                </div>
                </Fragment>
            )
        })
        
            }
        </div>
        </div>
    )
}

export default Post