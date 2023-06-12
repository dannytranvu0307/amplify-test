import { useEffect, useState,useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n.js'
import Aos from "aos";
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Language from './components/Language';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import PasswordReset from './pages/PassordReset';
import History from './pages/History';
import Active from './pages/Active'
import ConfirmResetPassword from './pages/ConfirmResetPassword';
import Sidebar from "./components/Sidebar";
import React, {Suspense} from 'react';
import { authenticate, selectIsAuthenticated, refreshToken } from "./features/auth/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import NotFound from './pages/NotFound';


function App() {

  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch();
 
  
  function PrivateRoute({ children }) {
    let auth = isAuthenticated;
    let locations = useLocation();
    return auth 
      ? children
      : <Navigate to="/login" state={{ from: locations }} replace />;
  }
  
  function PublicRoute({ children }) {
    let auth = isAuthenticated;
    let location = useLocation();
 
    return !auth 
      ? children 
      : <Navigate to="/" state={{ from: location }} replace />;
  }





  useEffect(() => {
    Aos.init({ duration: 900 });
    dispatch(authenticate())
      .unwrap()
      .then(res => {
        if (res.status === 401) {
          dispatch(refreshToken())
            .unwrap()
            .then(res => res.status === 200 && dispatch(authenticate()))
        }
      })
  }, [])

  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback="Loading...">
        <Router>
          <div className="flex  text-sm h-screen">
            <div className="flex-1 flex flex-col overflow-hidden">
              <header className="flex justify-between items-center">
                <Navbar />
                <Language />
              </header>
              <div className="flex h-full bg-gray-50 mb-1">
                <Sidebar />
                <main className="flex flex-col w-full overflow-x-hidden overflow-y-auto left-16 -z-1">
                  <div className="w-full py-8 md:py-1 mx-auto">
                    <div className="flex flex-col w-full h-full">
                      <Routes>       
                        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} /> 
                        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                        <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
                        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                        <Route path="/register" element={<PublicRoute><SignUp /></PublicRoute>} />
                        <Route path="/passwordreset" element={<PublicRoute><PasswordReset /></PublicRoute>} />
                        <Route path="/confirmresetpassword/:authToken" element={<PublicRoute><ConfirmResetPassword /></PublicRoute>} />
                        <Route path="/verify/:verifyCode" element={<PublicRoute><Active /></PublicRoute>} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </Router>
      </Suspense>
    </I18nextProvider>
  )
}



export default App
