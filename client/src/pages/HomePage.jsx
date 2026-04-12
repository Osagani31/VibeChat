import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'

const Home = () => {


const [selectedUser, setSelectedUser] = useState(null)

  return (
    <div className='w-full h-screen p-3 sm:p-6 lg:p-8'>
      <div className={`max-w-6xl mx-auto backdrop-blur-xl bg-[#151a2e]/70 border-2 border-gray-600 rounded-2xl
      overflow-hidden h-[100%] grid grid-cols-1 relative ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]':'md:grid-cols-2'} `}>
      <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
      <ChatContainer/>
      {selectedUser && <RightSidebar/>}
      </div>
    </div>
  )
}

export default Home