import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Aos from "aos";
import 'aos/dist/aos.css';
import Navbar from './components/Navbar'
import Language from './components/Language'

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import PasswordReset from './pages/PassordReset';
import History from './pages/History';
import Active from './pages/Active'
import ConfirmResetPassword from './pages/ConfirmResetPassword';
import Sidebar from "./components/Sidebar";
import React from 'react';
import { authenticate, selectIsAuthenticated, refreshToken } from "./features/auth/loginSlice";
import { useDispatch, useSelector  } from "react-redux";
import NotFound from './pages/NotFound';


function App() {


  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch();

  useEffect(()=>{
    Aos.init({ duration: 1000 });
    dispatch(authenticate())
    .unwrap()
    .then(res =>{
      if (res.status === 401){
        dispatch(refreshToken())
        .unwrap()
        .then(res => res.status === 200 && dispatch(authenticate()))
      }
    })
    
    return ()=>{
      localStorage.removeItem('imageData')
    }

  },[])

  return (
    <Router>
      <div className="flex  text-sm h-screen">
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="flex justify-between items-center">
            <Navbar />
            <Language />
          </header>
          <div className="flex h-full bg-gray-50 mb-1">
            {isAuthenticated &&
             <Sidebar />
              }
            <main className="flex flex-col w-full overflow-x-hidden overflow-y-auto left-16 -z-1">
              <div className="w-full py-8 md:py-1 mx-auto">
                <div className="flex flex-col w-full h-full">
                  <Routes>
                    {isAuthenticated ? (
                    <>
                    <Route path='/profile' element={<Profile />} />
                      <Route path='/history' element={<History />} />
                      <Route path='' element={<Home />} />
                      <Route path='/*' element={<NotFound />} />
                    </>
                     ):(
                    <>
                        <Route path='/' element={<Login />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/confirmresetpassword/:authToken' element={<ConfirmResetPassword />}></Route>
                        <Route path='/register' element={<SignUp />} />
                        <Route path='/passwordreset' element={<PasswordReset />} />
                        <Route path='/*' element={<NotFound />} />
                      </>
                       )}
                      <Route path='/verify/:verifyCode' element={<Active />} />
                      <Route path='/*' element={<NotFound />} />
                  </Routes>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
