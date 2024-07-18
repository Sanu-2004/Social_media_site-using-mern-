import React from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/home/NavbarSide'
import Home from './components/home/Home'
import SearchPage from './components/common/SearchPage'
import Login from './components/auth/login/Login'
import Signup from './components/auth/signup/Signup'
import ForgetPassword from './components/auth/forgetPassword/ForgetPassword'
import CreateNewPassword from './components/auth/forgetPassword/CreateNewPassword'
import MessagePage from './components/message/MessagePage'
import Profile from './components/profile/Profile'
import NavBottom from './components/home/NavBottom'
import { Route, Routes } from 'react-router-dom'
import Search from './components/search/Search'

const App = () => {
  return (
    <div className='bg-primary text-secondary' data-theme="dark">
      <Toaster />
      <div className='flex justify-center items-center h-screen overflow-hidden'>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/create-new-password' element={<CreateNewPassword />} />
        <Route path='/message' element={<MessagePage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/search' element={<Search />} />
      </Routes>
        {/* <div className='hidden lg:flex h-[90vh] w-1/4 border-l'>
      <SearchPage />
        </div> */}
      </div>
      <NavBottom />
    </div>
  )
}

export default App
