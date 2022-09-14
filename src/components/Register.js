import React from "react";
import {useState} from "react";
import { registerUser } from "../api";
import { Button, TextField } from "@mui/material";


const Register = ({setToken, history})=>{
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = async()=>{
        const results = await registerUser(username, password);
        if (results.success){
            setToken(results.data.token)
            window.localStorage.setItem('token', results.data.token)
            history('/profile')
        }else{
            console.log(results.error.message)
        }
        
    }

    return(
        <div className="pageContainer">
            <h1 id='pageTitle'>Register</h1>
        <form className='userForm' onSubmit={(event)=>{ 
        event.preventDefault();
        handleSubmit();
        
        }}>
            <TextField
            type='text'
            label='username'
            onChange={(event)=> setUsername(event.target.value)}
            />
            <TextField
            type='password'
            label="password"
            onChange={(event)=> setPassword(event.target.value)}
            />
            <Button type='submit'>Submit</Button>
        </form>
        </div>
    )
}
export default Register;