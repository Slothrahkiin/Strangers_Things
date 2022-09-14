import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { deletePost } from '../api';
import { TextField, Button } from '@mui/material';
const Searchbar = ({ posts, setSearch }) => {
    const [queryString, setQueryString] = useState('')

    const handleSubmit = () => {
        if (queryString === '') {
            return
        } else {
            
            setSearch(posts.filter(post => post.title.includes(queryString)))
        }
    }
    return (
        <form
            onSubmit={event => {
                event.preventDefault();
                handleSubmit()

            }}
        >
            <TextField
                type="text"
                label="search"
                value={queryString}
                onChange={(event) => setQueryString(event.target.value)}
            />
            <Button type='submit'>search</Button>
        </form>
    )
}

const Post = ({ posts, token }) => {
    const [search, setSearch] = useState(posts)


    
    return (
        <div id="outer">
            <h1 id="pageTitle">Posts</h1>
            <Searchbar setSearch={setSearch} posts={posts} />
            <Link className="addPost" to='./createPost'><Button >add post</Button></Link>
            <div className="postContainer">
                {

                    search.map((post) => {
                        const { description, location, price, title, _id, isAuthor } = post;
                        return (
                            <Fragment key={_id}>
                                <div className="posts">
                                    <h3>{title}</h3>
                                    <p className='black'>Description: {description}</p>
                                    <div className='black'>
                                        <p className='black'>Price: {price}</p>
                                        <p className='black'>Location: {location}</p>
                                    </div>
                                    {isAuthor ? (
                                        <>
                                            <Link to={`/posts/edit-post/${_id}`}><button className='white'>edit</button></Link>
                                            <button className='white' onClick={(event) => {
                                                event.preventDefault
                                                deletePost(token, _id)
                                            }}>delete</button>
                                        </>
                                    ) : (<Link to={`/posts/${_id}`}><button className='white'>View</button></Link>)}
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