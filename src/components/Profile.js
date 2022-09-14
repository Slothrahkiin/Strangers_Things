import React  from 'react';


const Profile = ({user})=>{
    const messages = user.messages;
    const userID = user._id
    return(
        <div>
        <h1>Profile</h1>
        <div className='profile'>
            <h3>Messags to you</h3>
        {messages && messages.map(message=>{
            const fromUserID = message.fromUser._id;
            const {username} = message.fromUser;
            const {title} = message.post;
            if (userID !== fromUserID){
            return(<div className="messages" key={message._id}>
                <h4>From:{username}</h4>
                <h6>Post:{title}</h6>
                <p>Message:{message.content}</p>
                </div>)
            }
        })}
            <h3>Messages from you</h3>
            {messages && messages.map(message=>{
                const fromUserID = message.fromUser._id
                if (userID === fromUserID){
                return(<div className='messages' key={message._id}>
                    <h2>Post:{title}</h2>
                    <p>{message.content}</p>
                    </div>)
                }
        })}
        </div>
        </div>
    )
}

export default Profile