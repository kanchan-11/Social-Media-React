import { Grid,Card } from "@mui/material";
import React from "react";
import Login from "./Login";
import Register from "./Register";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

const Authentication = () =>{
    return (
        <div>
            <Grid container>
                <Grid className="h-screen overflow-hidden"item xs={7}>
                    <img src="https://cdn.pixabay.com/photo/2018/11/29/21/51/social-media-3846597_1280.png" className="h-full w-full"/>
                </Grid>
                <Grid item xs={5}>
                    <div className="px-20 flex flex-col justify-center h-full">
                        <Card className="card p-8">
                            <div className='flex flex-col items-center mb-5 space-y-1'>
                                <h1 className="logo text-center">Social Media</h1>
                                <p className="text-center text-sm w-[70&]">
                                    Connecting Lives, Sharing Stories: Your Social World, Your Way
                                </p>
                            </div>
                            <Routes>
                            
                                <Route path="/*" element={<Login/>}/>
                                {/* <Route path="/*" element={<div>This is login form2</div>}/> */}
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/register" element={<Register/>}/>
                            </Routes>
                        </Card>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
export default Authentication