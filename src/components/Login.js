import React, {useState} from 'react';
import { loginUser } from '../api';
import { Button, Snackbar } from '@mui/material';
import {TextField} from '@mui/material';


const Login = ({setToken, history})=>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    let isLogin = false
    const handleSubmit = async()=>{
        const results= await loginUser(username, password);
        if (results.success){
            setToken(results.data.token)
            window.localStorage.setItem('token', results.data.token)
            isLogin = true
            history('/profile');
        }else{
            console.log(results.error.message)
        }
        
    }
    
        
    return(

        <div className='container'>
            <h1>Login</h1>
            <form className='userForm' onSubmit={(event)=>{ 
        event.preventDefault();
        handleSubmit();}}>
            <TextField type='text'
            className='input'
            label='username'
            onChange={(event)=> setUsername(event.target.value)}/>
            <TextField type='password'
            className='input'
            label="password"
            onChange={(event)=> setPassword(event.target.value)}/>
            <Button type='submit'>Submit</Button>
            </form>
            <Snackbar 
            open={isLogin} 
            message="logged in successfully"
            anchorOrigin={{
                vertical:'top',
                horizontal:'center'
            }}
            />
        </div>
    )
}

export default Login;
