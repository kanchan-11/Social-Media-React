import { Avatar, Button, CardHeader, IconButton } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'

const PopularUserCard = ({user}) => {
  return (
    <div>
        <CardHeader
        avatar={
          <Avatar src={user?.profilePicture || ''} sx={{ bgcolor: red[500] }} aria-label="recipe">
            {user.firstName[0]}
          </Avatar>
        }
        action={
          <Button size='small'>
            Follow
          </Button>
        }
        title={user.firstName+" "+user.lastName}
        subheader={"@"+user.firstName.toLowerCase()+"_"+user.lastName.toLowerCase()}
      />
    </div>
  )
}

export default PopularUserCard