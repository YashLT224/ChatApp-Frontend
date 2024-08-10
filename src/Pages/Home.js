import React from 'react'
import ChatBox from '../Components/ChatBox'
const Home = () => {
  const username = localStorage.getItem('username');
  return (
    <div>
    <h1 className='heading'>Hello {username}. I am Ayna, How May I assist you</h1>
    <ChatBox/>
    </div>
      
   
  )
}

export default Home
