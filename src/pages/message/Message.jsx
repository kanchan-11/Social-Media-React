import { Avatar, Grid, IconButton } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import WestIcon from '@mui/icons-material/West';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SearchUser from '../../components/searchUser/SearchUser';
import UserChatCard from './UserChatCard';
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, fetchMessagesForChat, getAllChats } from '../../redux/Message/message.action';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { uploadToCloudinary } from '../../utils/UploadToCloud';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import SockJS from 'sockjs-client';
import Stom from 'stompjs'
import { useNavigate  } from 'react-router-dom';

const Message = () => {
  const dispatch = useDispatch()
  const { message, auth } = useSelector(Store => Store)
  const [currentChat, setCurrentChat] = useState()
  const [messeges, setMesseges] = useState([])
  const [selectedImage, setSelectedImage] = useState()
  const [loading, setLoading] = useState(false)
  const navigate  = useNavigate()
  const [stompClient,setStompClient]=useState(null)
  const chatContainerRef = useRef(null);
  const onConnect=()=>{
    console.log("websocket connect...")
  }
  const onErr=(error)=>{
    console.log('error',error)
  }
  const handleSelectImage = async (e) => {
    setLoading(true)
    console.log("handle select image")
    const imgUrl = await uploadToCloudinary(e.target.files[0], "image")
    setSelectedImage(imgUrl)
    setLoading(false)
  }
  const handleCreateMessege = (value) => {
    const message = {
      chatId: currentChat?.id,
      content: value,
      image: selectedImage
    }
    dispatch(createMessage({message,sendMessageToServer}))
      .then(()=>{
        dispatch(getAllChats())
        console.log("after sending successfully updating chats")
      })
      .catch((error)=>{
        console.error("after sending not updating error...")
      })
  }
  const sendMessageToServer=(newMessage)=>{
    // console.log("sending message websocket",newMessage)
    // console.log("stompClient",stompClient)
    if(stompClient && newMessage)
    {
      stompClient.send(`/app/chat/${currentChat?.id}`,{},JSON.stringify(newMessage))
    }
  }
  const onMessageRecieve=(payload)=>{
    // console.log("onMessage recieve .....")
    const recievedMessage=JSON.parse(payload.body)
    // console.log("message recieve from websocket ",recievedMessage)
    setMesseges([...messeges,recievedMessage])
  }
  const handleGoBack=()=>{
    navigate(-1)
  }
  useEffect(() => {
    dispatch(getAllChats())
  }, [])
  useEffect(()=>{
    setMesseges([...messeges,message.message])
  },[message.message])
  useEffect(()=>{
    const sock=new SockJS("https://spring-projects-social-media.azuremicroservices.io/ws")
    const stomp = Stom.over(sock)
    setStompClient(stomp)
    stomp.connect({},onConnect,onErr)
    // console.log("stompclient on connection",stompClient)
    // return ()=>{
    //   if(stompClient){
    //     stompClient.disconnect()
    //   }
    // }
  },[])
  
  useEffect(()=>{

    if(stompClient && auth.user && currentChat){
      
      // console.log("recieving url...",`/user/${currentChat.id}/private`)
      const subscription=stompClient.subscribe(`/user/${currentChat.id}/private`,onMessageRecieve)
      // console.log("subscription....",stompClient)
      return ()=>{
        subscription.unsubscribe()
      }
    }
    
  // },[auth.user,stompClient,currentChat])
  })
  
  useEffect(() => {
    // Scroll to the bottom of the chat container when 'messeges' change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messeges]);
  return (
    <div>
      <Grid container className='h-screen overflow-y-hidden'>
        <Grid item className='px-5' xs={3}>
          <div className='flex h-full justify-between space-x-2'>
            <div className='w-full'>
              <div className='flex space-x-4 items-center py-5'>
                <WestIcon onClick={handleGoBack}/>
                <h1 className='text-x1 font-bold'>Home</h1>
              </div>
              <div className='h-[83vh]'>
                <div className=''>
                  <SearchUser />
                </div>
                <div className='h-full space-y-4 mt-5 overflow-y-scroll hideScrollBar'>
                  {
                    message.chats.map((item) => {
                      return(
                      <div onClick={() => {
                        setCurrentChat(item)
                        setMesseges(item.messages)
                        
                        }}>
                      
                      
                        <UserChatCard chat={item} />
                      </div>)
                    })
                  }

                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={9} className='h-full '>
          {
            currentChat ?
              <div>
                <div className='flex justify-between items-center border-1 p-5'>
                  <div className='flex items-center space-x-3'>
                    <Avatar src={auth.user?.id === currentChat.users[0]?.id ?
                                   currentChat.users[1].profilePicture :
                                   currentChat.users[0].profilePicture || 
                                   'https:cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png'} />
                    <p>
                      {auth.user?.id === currentChat.users[0]?.id ? currentChat.users[1].firstName + " " + currentChat.users[1].lastName :
                        currentChat.users[0].firstName + " " + currentChat.users[0].lastName}
                    </p>
                  </div>
                  <div className='flex space-x-3'>
                    <IconButton>
                      <AddIcCallIcon />
                    </IconButton>
                    <IconButton>
                      <VideoCallIcon />
                    </IconButton>
                  </div>
                </div>
                <div >
                <div className=' hideScrollBar overflow-y-scroll h-[83vh] px-2 space-y-5 py-5' ref={chatContainerRef}>
                  {messeges.map((item) => <ChatMessage item={item} />)}
                </div>

                <div className='sticky bottom-0 border-1'>
                  {selectedImage && <img src={selectedImage} alt="" className='w-[5rem] h-[5rem] object-cover px-2'/>}
                  
                  <div className='py-5 flex items-center justify-center space-x-5'>
                    <input
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value) {
                          handleCreateMessege(e.target.value)
                          setSelectedImage("")
                          e.target.value=""
                        }
                      }}
                      className='bg-transparent border  border-[#3b40544] rounded-full w-[90%] py-3 px-5'
                      placeholder='Type message...' type='text' />
                    <div>
                      <input type='file' accept='image/*' onChange={handleSelectImage} className='hidden' id='image-input' />
                      <label htmlFor='image-input'>
                        <AddPhotoAlternateIcon />
                      </label>
                    </div>
                  </div>
                </div>
                </div>
                
              </div>
              :
              <div className='h-full space-y-5 flex flex-col justify-center items-center'>
                <ChatBubbleOutlineIcon sx={{ fontSize: "15rem" }} />
                <p className='text-xl font-semibold'>No chat Selected</p>
              </div>
          }

        </Grid>
      </Grid>
      <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={loading}
>
  <CircularProgress color="inherit" />
</Backdrop>
    </div>
  )
}

export default Message