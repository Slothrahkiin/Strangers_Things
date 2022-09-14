

const baseURL = 'https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-PT'


export const getPosts = async (token) =>{
    try{
        const response = await fetch(`${baseURL}/posts`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }});
        const results = response.json();
        return (results);
    }catch(ex){
        console.log('error getting all posts')
    }
}
export const getMessages = async (token) =>{
    try{
        const response = await fetch(`${baseURL}/posts/messages`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }});
        const results = response.json();
        return (results);
    }catch(ex){
        console.log('error getting messages')
    }
}

export const registerUser = async(username, password)=>{
    try{
    const response = await fetch(`${baseURL}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password
          }
        })
    })
    
    const results = await response.json();
    return results;
    }catch(error){
        console.log('error registering user')
    }
}
export const loginUser = async(username, password)=>{
    try{
    const response = await fetch(`${baseURL}/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password
        }
    })
  })
  const result = await response.json();
  return result;
} catch(error) {
  console.log('error logging in')
}
}
export const getMyProfile = async(token)=>{
    try{
        const response = await fetch(`${baseURL}/users/me`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })
          const result = await response.json()
          return result
    }catch(error){
        console.log('error getting profile')
    }
}
export const addPost = async(token, title, description, price, location) =>{
    try{
        const response = await fetch(`${baseURL}/posts`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              post: {
                title: title,
                description: description,
                price: price,
                location: location,
                willDeliver: true
              }
            })})
            const result = await response.json()
            return result
      }catch(error){
          console.log('error adding post')
      }
}
export const deletePost = async(token, POST_ID)=>{
    try{
    const response = await fetch(`${baseURL}/posts/${POST_ID}`, {
  method: "DELETE",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
})
const result = await response.json()
            return result
    }catch(error){
        console.log(error.message)
    }
}
export const updatePosts = async (token, {title, description, price, location,_id})=>{
  try{ const response = await fetch(`${baseURL}/posts/${_id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      post: {
        title: title,
        description: description,
        price: price,
        location: location,
        willDeliver: true
      }
    })})
  }catch(error){
    console.log(error.message)
  }
}
export const createMessage = async({postID, token, message})=>{
  try{
    const response = await fetch(`${baseURL}/posts/${postID}/messages`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        message
      })
    })
  }catch(error){console.log('error creating message')}
}