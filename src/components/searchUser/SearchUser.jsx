import { Avatar, Card, CardHeader } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchUser } from '../../redux/Auth/auth.action'
import { createChat } from '../../redux/Message/message.action'

const SearchUser = () => {
  const [username,setUsername]=useState('')
  const dispatch=useDispatch()
  const {message,auth}=useSelector(Store=>Store)

  const handleSearchUser = (e) => {
      setUsername(e.target.value)
      console.log("search user...")
      dispatch(searchUser(e.target.value))
  }
  const handleClick = (id) => {
    const chat={
      requestedUserId: id
    }
    dispatch(createChat(chat))
  }
  return (
    <div>
<div className='py-5  relative'>
      <input className='bg-transparent border border=[#3b4054] outline-none w-full px-5 py-3 rounded-full'
        placeholder='Search User...' onChange={handleSearchUser} type='text' />
       {
        (username && 
          auth.searchUser.map((item)=><Card className='absolute w-full z-10 top-[4.5rem] cursor-pointer'>
          <CardHeader onClick={() => {
            handleClick(item.id)
            setUsername("")
          }}
            avatar={<Avatar src={item.profilePicture || 'https:cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png'} />}
            title={item.firstName+" "+item.lastName}
            subheader={"@"+item.firstName.toLowerCase()+item.lastName.toLowerCase()}
        />

      </Card>))
      }
    </div>
     
    </div>
    
  )
}

export default SearchUser