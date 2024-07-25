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
import { Navigate, Route, Routes } from 'react-router-dom'
import Search from './components/search/Search'
import { useUserContext } from './Context/UserContext'
import { useThemeContext } from './Context/ThemeContext'

const App = () => {
  const {user}  = useUserContext();
  const {theme} = useThemeContext();
  return (
    <div className='bg-primary text-secondary' data-theme={theme}>
      <Toaster />
      <div className='flex justify-center items-center h-svh overflow-hidden'>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/login' element={!user?<Login />:<Navigate to="/" />} />
        <Route path='/signup' element={!user?<Signup />:<Navigate to="/" />} />
        <Route path='/forget-password' element={!user?<ForgetPassword />:<Navigate to="/create-new-password" />} />
        <Route path='/create-new-password' element={user ? <CreateNewPassword /> : <Navigate to="/forget-password" />} />
        <Route path="*" element={user?<Home />:<Navigate to="/login" />} />
      </Routes>
        {/* <div className='hidden lg:flex h-[90vh] w-1/4 border-l'>
      <SearchPage />
        </div> */}
      </div>
      {user?.id && <NavBottom />}
    </div>
  )
}

export default App
