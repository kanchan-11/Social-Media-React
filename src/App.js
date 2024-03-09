import Authentication from './pages/authentication/Authentication';
import HomePage from './pages/homepage/HomePage';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import React, { useEffect } from 'react'
import Message from './pages/message/Message';
import { useDispatch, useSelector } from 'react-redux';
import Store from './redux/Store';
import { GetUserProfileAction } from './redux/Auth/auth.action';
import { ThemeProvider } from '@mui/material';
import { darkTheme } from './theme/DarkTheme';
import './App.css';

function App() {
  const {auth} = useSelector(Store=>Store)
  const dispatch=useDispatch()
  const jwt=localStorage.getItem("jwt")
  useEffect(()=>{
    dispatch(GetUserProfileAction(jwt))},[dispatch,jwt])
  return (
    <ThemeProvider theme={darkTheme}>
        <Routes>
          <Route path='/*' element={auth.user?<HomePage />:<Authentication/>} />
          <Route path='/message' element={<Message />} />
          <Route path='/*' element={<Authentication />} />
        </Routes>
    </ThemeProvider>
  );
}

export default App;
