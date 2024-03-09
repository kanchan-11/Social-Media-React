import React from 'react'
import { useSelector } from 'react-redux'

const ChatMessage = ({item}) => {
  const {message,auth} = useSelector(Store=>Store)
  const isReqUserMessage=auth.user?.id===item.user?.id
  return (
    <div className={`flex ${!isReqUserMessage?"justify-start":"justify-end"} text-white`}>
        <div className={`p-1 ${item.image?"rounded-md":"px-5 rounded-full"} bg-[#191c29]`}>
            {item.image && <img src={item.image} 
                        alt="" className='w-[12rem] h-[17rem] object-cover rounded-md'/>}
            <p className={`${true?"py-2":"py-1"}`}>{item.content}</p>
        </div>
    </div>
  )
}

export default ChatMessage