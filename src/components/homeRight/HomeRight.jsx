import React, { useEffect, useState } from 'react'
import SearchUser from '../searchUser/SearchUser'
import PopularUserCard from './PopularUserCard'
import { Card } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllUsersAction } from '../../redux/Auth/auth.action'

// const popularUsers = [1, 1, 1, 1, 1]
const HomeRight = ({auth}) => {
  const dispatch = useDispatch();
  // const {auth} = useSelector(Store=>Store);
  const {allUsers}=auth
  const [popularUsers, setPopularUsers] = useState([]);

  useEffect(()=>{
    dispatch(GetAllUsersAction(auth.token))
  },[dispatch])

  useEffect(()=>{
    const getRandomUsers = (count) => {
      const shuffledUsers = [...allUsers].sort(() => 0.5 - Math.random());
      return shuffledUsers.slice(0, count);
    }
    setPopularUsers(getRandomUsers(5))
  },[allUsers])
  return (
    <div className='pr-5'>
      <SearchUser />
      <Card className='p-5'>
        <div className='flex justify-between py-5 items-center'>
          <p className='font-semifold opacity-70'>Suggestions for you</p>
          <p className='text-xs font-semibold opacity-95'>View All</p>
        </div>
        <div>
          {popularUsers.map((item)=><PopularUserCard user={item} />)}
        </div>
      </Card>

    </div>
  )
}

export default HomeRight