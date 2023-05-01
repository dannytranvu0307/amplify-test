import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
function App() {


  return (
    <>
      <div className='text-lime-500'>
      <Router >     
      <Routes>
       <Route path='' element={<Home />} />
       <Route path='/login' element={<Login />} />
     </Routes>
     </Router>
      </div>
    </>
  )
}

export default App
