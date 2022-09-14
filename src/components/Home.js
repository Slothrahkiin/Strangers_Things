import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({token})=>{
    return(
        <div >
        <h1>Stranger's things</h1>
        <div className='home'>
        <h2>Welcome to stranger's things!</h2>
        <nav className='homeNav'>
            <Link to='/'>Home</Link>
            <Link to='/posts'>Posts</Link>
            <Link to='/profile'>Profile</Link>

            {
                token?(
                    <Link to='/' onClick={()=> {logout()}}>Logout</Link>

                ):(
                    <>
                    <Link to='/register'>Register</Link>
                    <Link to='/login'>Login</Link>
                    </>
                )
            }
            
            </nav>
            </div>
        </div>
    )
}

export default Home