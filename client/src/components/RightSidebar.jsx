import React from 'react'
import assets, { imagesDummyData } from '../assets/assets'

const RightSidebar = ({selectedUser}) => {
  return selectedUser && (
    <div className={`bg-[#8185b2]/10 text-white w-full relative overflow-y-auto border-l border-white/10
    ${selectedUser ? "max-md:hidden":""}`}>


    <div className='pt-14 px-6 flex flex-col items-center gap-2 text-center mx-auto'>
      <img src={selectedUser?.profilePic || assets.avatar_icon} alt="Profile" 
      className='w-24 h-24 rounded-full object-cover ring-2 ring-white/20 shadow-lg shadow-black/20'/>
      <div className='mt-2 flex items-center gap-2'>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]"></span>
        <h1 className='text-lg font-semibold tracking-tight'>{selectedUser?.fullName}</h1>
      </div>
      <p className='text-sm text-white/80 leading-relaxed max-w-[26ch]'>{selectedUser.bio}</p>
    </div>
    <hr className="border-[#ffffff50] my-4"/>
    <div className="px-5 pb-6 text-xs">
      <p className='text-white/80 uppercase tracking-wide'>Media</p>
      <div className='mt-3 max-h-[220px] overflow-y-auto grid grid-cols-2 gap-2 opacity-90 pr-1'>
      {imagesDummyData.map((url, index) => (
        <div key={index} onClick={()=> window.open(url)}
        className='cursor-pointer rounded-md overflow-hidden bg-white/5'>
        <img src={url} alt="Media" className='w-full h-24 object-cover rounded-md transition-transform duration-200 hover:scale-105'/>

        </div>
        ))}
      </div>
    </div>
    <div>
      <button className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400
      to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer'>
        Logout
      </button>
    </div>
    </div>

  )
}

export default RightSidebar