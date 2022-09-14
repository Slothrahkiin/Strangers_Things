import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom/client";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import {Snackbar} from '@mui/material';
import {
    Navbar,
    Posts,
    Profile, 
    Home,
    Register,
    Login,
    CreatePost,
    SinglePost,
    EditPost
}from "./components";
import {
    getPosts,
    getMyProfile
} from './api';
import { CssBaseline } from "@mui/material";
import style2 from "/style2.css"




const App = ()=>{
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});
    
    const history = useNavigate();
    
    function logout(){
        window.localStorage.removeItem('token');
         setToken('');
         setUser({});
    }

    async function fetchPosts() {
        const results = await getPosts(token)
        setPosts(results.data.posts)
        
    }

    async function getMe(){
        const storeToken = window.localStorage.getItem('token')
        if(!token){
            if(storeToken){
            setToken(storeToken);
        }
            return
        }

        const results = await getMyProfile(token)
        if(results.success) {
            setUser(results.data);
        }else{
        console.log(results.error.message)
        }
} 
    useEffect(()=>{
    fetchPosts()},[token])

    useEffect(()=>{
        getMe();
    },[token])


    return(
        <div className="main_container">
        <Navbar className="navbar" logout={logout} token={token}/>
        <Routes>
        <Route path="/" element={<Home token={token}/>} />
        <Route path="posts" element={<Posts posts={posts} token={token} />} />
        <Route path="/posts/:postID" element={<SinglePost posts={posts} token={token}/>} />
        <Route exact path="/posts/edit-post/:postID" element={<EditPost posts={posts} token={token}/>}/>
        <Route path="profile" element={<Profile history={history} posts={posts} user={user}/>} />
        <Route path="login" element={<Login setToken={setToken} history={history} Snackbar={Snackbar}/>} />
        <Route path="register"
         element={<Register 
            setToken={setToken}
            token = {token}
            history = {history}
          />} />
        <Route exact path="posts/createPost" element={<CreatePost token={token} setPosts={setPosts} history={history} fetchPosts={fetchPosts}/>}/>
        </Routes>
        <Snackbar />
        </div>
    )
}

const container = document.querySelector("#container");
const root = ReactDOM.createRoot(container);
root.render(
    <CssBaseline>
<BrowserRouter>
<App />
</BrowserRouter>
</CssBaseline>
);
