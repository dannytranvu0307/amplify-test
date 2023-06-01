import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, unstable_HistoryRouter } from 'react-router-dom';

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
            {isAuthenticated && <Sidebar />}
            <main className="flex flex-col w-full overflow-x-hidden overflow-y-auto ml-16 left-16 -z-1">
              <div className="w-full px-6 py-8 ">
                <div className="flex flex-col w-full h-full">
                  <Routes>
                    {isAuthenticated ? (<>
                    <Route path='/profile' element={<Profile />} />
                      <Route path='' element={<Home />} />
                      <Route path='/history' element={<History />} />
                      <Route path='/*' element={<Navigate to='/'/>} />
                    </>):(<>
                        <Route path='/login' element={<Login />} />
                        <Route path='/confirmresetpassword/:authToken' element={<ConfirmResetPassword />}></Route>
                        <Route path='/register' element={<SignUp />} />
                        <Route path='/passwordreset' element={<PasswordReset />} />
                        <Route path='/verify/:verifyCode' element={<Active />} />
                        <Route path='/*' element={<Navigate to='/login' />} />
                      </>
                      )}
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
