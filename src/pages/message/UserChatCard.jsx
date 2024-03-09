import { Avatar, Card, CardHeader, IconButton } from '@mui/material'
import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Message from './Message';
import { useSelector } from 'react-redux';

const UserChatCard = ({chat}) => {
    const {message,auth}=useSelector(Store=>Store)
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar src={auth.user.id===chat.users[0].id?
                                    chat.users[1].profilePicture:
                                    chat.users[0].profilePicture || 
                                    "https:cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"}
                        sx={{ width: "3.5rem", height: "3.5rem", fontSize: "1.5rem", bgcolor: "#191c29", color: "rgb(88,199,250)" }} />
                }
                action={
                    <IconButton>
                        <MoreHorizIcon />
                    </IconButton>
                }
                title={auth.user.id===chat.users[0].id?chat.users[1].firstName+" "+chat.users[1].lastName:
                                                    chat.users[0].firstName+" "+chat.users[0].lastName}
                subheader={"new message"}>
            </CardHeader>
        </Card>
    )
}

export default UserChatCard