import { Grid } from '@mui/material'
import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { useLocation,Routes,Route} from 'react-router-dom'
import MiddlePart from '../../components/middlePart/MiddlePart'
import CreateReelsForm from '../../components/reels/CreateReelsForm'
import Reels from '../../components/reels/Reels'
import Profile from '../profile/Profile'
import HomeRight from '../../components/homeRight/HomeRight'
import { useSelector } from 'react-redux'
// import Store from '../../redux/Store'

const HomePage = () => {
    const location = useLocation();
    const {pathname}=location;
    const centerGridColumns = pathname === "/" ? 6 : 9;
    const {auth} = useSelector(Store=>Store)
    console.log("auth",auth)    
    
    return (
        <div className='px-20'>
            <Grid container spacing={0}>
                <Grid item xs={0} lg={3}>
                    <div className='sticky top-0'>
                        <Sidebar />
                    </div>
                </Grid>
                <Grid item lg={centerGridColumns} className='px-5 flex justify-center' xs={12}>
                    <Routes>
                        <Route path="/*" element={<MiddlePart/>}/>
                        <Route path="/reels" element={<Reels/>}/>
                        <Route path="/create-reels" element={<CreateReelsForm/>}/>
                        <Route path="/profile/:id" element={<Profile/>}/>
                    </Routes>
                </Grid>
                {location.pathname==='/' && <Grid item lg={3} className='relative'>
                    <div className='sticky top-0 w-full'> 
                        <HomeRight auth={auth}/>
                    </div>
                </Grid>}
            </Grid>
        </div>
    )
}

export default HomePage