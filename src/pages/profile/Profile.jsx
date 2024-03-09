import { Avatar, Box, Button, Card, Tab, Tabs } from '@mui/material'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostCard from '../../components/post/PostCard';
import UserReelCard from '../../components/reels/UserReelCard';
import { useDispatch, useSelector } from 'react-redux';
import ProfileModal from './profileModal';
import { getUsersPostAction  } from '../../redux/Post/post.action'
import { GetUserProfileAction } from '../../redux/Auth/auth.action';

const tabs = [
  { value: "post", name: "Post" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "repost", name: "Repost" },
]
// const posts = [1, 1, 1, 1];
const reels = [1, 1, 1, 1]
// // const savedPosts = [1, 1, 1]

const Profile = () => {
  const { id } = useParams()
  const dispatch=useDispatch()
  const {auth,post} = useSelector(Store=>Store)
  const {userPosts}=post
  const [open, setOpen] = React.useState(false);
  const handleOpenProfileModel = ()=>setOpen(true)
  const handleClose = () => setOpen(false);
  useEffect(()=>{
    dispatch(GetUserProfileAction(auth.jwt))
    dispatch(getUsersPostAction(id))
  },[dispatch,auth.jwt,id])
  const [value, setValue] = React.useState('post')
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const profilePicUrl = auth.user?.profilePicture?
                          auth.user.profilePicture
                          :'https://cdn-icons-png.flaticon.com/128/892/892758.png'
  
  
  return (
    <Card className='py-10 w-[70%]'>
      <div className='rounded-md'>
        <div className='h-[15rem]'>
          <img src="https://cdn.pixabay.com/photo/2014/01/13/20/01/pebbles-243910_640.jpg"
            alt=""
            className='w-full h-full rounded-t-md' />
        </div>
        <div className='px-5 flex justify-between items-start mt-5 h-[5rem]'>
          <Avatar className="transform -translate-y-24 cursor-pointer"
            sx={{ width: "10rem", height: "10rem" }}
            src={profilePicUrl}
           />
          {true ? <Button 
                    sx={{ borderRadius: "20px" }} 
                    variant="outlined" 
                    onClick={handleOpenProfileModel}>
                      Edit Profile
                  </Button> 
                : <Button 
                    sx={{ borderRadius: "20px" }} 
                    variant="outlined">
                      Follow
                  </Button>
            }
        </div>
        <div className='p-5'>
          <div>
            <h1 className='py-1 font-bold text-xl'>{auth.user?.firstName+" "+auth.user?.lastName}</h1>
            <p>@{auth.user?.firstName.toLowerCase()+"_"+auth.user?.lastName.toLowerCase()}</p>
          </div>
          <div className='flex gap-5 items-center py-3'>
            <span>{userPosts.length} post</span>
            <span>35 followers</span>
            <span>5 followings</span>
          </div>
          <div>
            <p>About me my username about me my keyline about me my username my keyline</p>
          </div>
        </div>
        <section>
          <Box sx={{ width: '100%', borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {tabs.map((item) => <Tab value={item.value} label={item.name} wrapped />)}
            </Tabs>
          </Box>
          <div className='flex justify-center'>
            {value === 'post' ?
              (<div className='space-y-5 w-[70%] my-10'>
                {userPosts.map((item) => (
                  <div className='border rounded-md border-slate-500'>
                    <PostCard  item={item}/>
                  </div>))}
              </div>)
              : value === 'reels' ?
                (<div className='flex justify-center my-10 flex-wrap gap-2'>
                  {reels.map((item) => <UserReelCard />)}
                </div>)
                : value === 'saved' ?
                  (<div className='space-y-5 w-[70%] my-10'>
                    {userPosts.map((item) => (
                      <div className='border rounded-md border-slate-500'>
                        <PostCard item={item}/>
                      </div>))}
                  </div>)
                  : value==='repost'?
                    (<div>Repost</div>)
                    :""
            }
          </div>
        </section>
      </div>
      <section>
        <ProfileModal open={open} handleClose={handleClose}/>
      </section>
    </Card>
  )
}

export default Profile