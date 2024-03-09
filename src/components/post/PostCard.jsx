import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, likePostAction } from '../../redux/Post/post.action';
import { isLikedByUser } from '../../utils/isLikedByUser';

const PostCard = ({ item }) => {
  const dispatch=useDispatch()
  const {post,auth}=useSelector(Store=>Store)
  const [showComments,setShowComments] = useState(false)
  const isItemLikedByUser = item && auth && isLikedByUser(auth.user.id, item);
  const handleShowComment=()=>setShowComments(!showComments)
  const handleCreateCommnet=(content)=>{
    const reqdata={
      postId:item.id,
      data:{
        content
      }
    }
    dispatch(createCommentAction(reqdata))
  }
  const handleLikePost=()=>{
    dispatch(likePostAction(item.id))
  }
  // console.log("is liked: ",isItemLikedByUser)
  return (
    <Card className=''>
      {item && <CardHeader
        avatar={
          <Avatar src={item.user?.profilePicture || ""} 
                  sx={{ bgcolor: red[500] }} 
                  aria-label="recipe">
            {item.user?.firstName[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.user?.firstName + " " + item.user?.lastName}
        subheader={"@" + item.user?.firstName?.toLowerCase() + " " + item.user?.lastName?.toLowerCase()}
      />}
      {/* <CardMedia
        component="img"
        height="194"
        image={item.image}
        alt="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item?.caption}
        </Typography>
      </CardContent>
      {
        item && 
        item.image && 
        (<img className='w-full max-h-[30rem] object-cover object-top' src={item.image} alt=""/>)
      }
      <CardActions className='flex justify-between' disableSpacing>
        <div>
          <IconButton onClick={handleLikePost}>
            {isItemLikedByUser ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
          <IconButton onClick={handleShowComment}>
            <ChatBubbleIcon />
          </IconButton>
        </div>
        <div>
          <IconButton>
            {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </div>
      </CardActions>
      {showComments && <section>
        <div className='flex items-center space-x-5 mx-3 my-5'>
          <Avatar sx={{}} />
          <input type='text'
            className='w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2'
            placeholder='Write your comment...'
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleCreateCommnet(e.target.value)
                // console.log("enter pressed....", e.target.value)
                e.target.value=""
              }
            }} />
        </div>
        <Divider />
        {item.comments?.map((comment)=><div className='mx-3 space-y-2 my-5 text-xs'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-5'>
                <Avatar sx={{ height: "2rem", width: "2rem", fontSize: ".8rem" }}>{comment.user.firstName[0]}</Avatar>
                <div>
                  <p><b>{comment.user.firstName} {comment.user.lastName}</b></p>
                  <p>{comment.content}</p>
                </div>
              </div>
            </div>
          </div>) 
          }
      </section>}
    </Card>
  )
}

export default PostCard