import React from 'react'
import { SidebarNavigationMenu } from './SidebarNavigationMenu'
import { Avatar, Divider, Menu, MenuItem,Button, Card } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Store from '../../redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { logoutUserAction } from '../../redux/Auth/auth.action';

const Sidebar = () => {
  const dispatch=useDispatch()
  const {auth} = useSelector(Store=>Store)
  const navigate=useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout=()=>{
    dispatch(logoutUserAction())
    handleClose()
  }
  const handleProfile=()=>{
    handleClose()
    const userId = auth.user?.id ?? 'fallback-id'; // Provide a fallback if user is not available
      navigate(`/profile/${userId}`)
  }
  const handleNavigate = (item) =>{
    if(item.title=="Profile")
    {
      const userId = auth.user?.id ?? 'fallback-id'; // Provide a fallback if user is not available
      navigate(`/profile/${userId}`)
    }
    else
    {
      navigate(item.path)
    }
  }
  
  const profilePicUrl = auth.user?.profilePicture?
                          auth.user.profilePicture
                          :"https:cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"
  return (
    <Card className='card h-screen flex flex-col justify-between py-5'>
      <div className='space-y-8 pl-5'>
        <div className=''>
          <span className='logo font-bold text-xl'>Social Media</span>
        </div>
        <div className='space-y-8'>
          {SidebarNavigationMenu.map((item) =>
            <div onClick={()=>handleNavigate(item)} className='cursor-pointer flex space-x-3 item-center'>
              {item.icon}
              <p className='text-xl'>{item.title}</p>
            </div>
          )}
        </div>
      </div>
      <div>
        <Divider />
        <div className='pl-5 flex items-center justify-between pt-5'>
          <div className='flex items-center space-x-3'>
            <Avatar src={profilePicUrl} />
            <div>
              <p className='font-bold'>{auth.user?.firstName+" "+auth.user?.lastName}</p>
              <p className='opacity-70'>@{auth.user?.firstName.toLowerCase()+"_"+auth.user?.lastName.toLowerCase()}</p>
            </div>
          </div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon/>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </Card>
  )
}

export default Sidebar