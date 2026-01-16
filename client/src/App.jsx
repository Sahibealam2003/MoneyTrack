import React from 'react'
import{
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Home from './pages/Dashboard/Home'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'
import {Toaster} from 'react-hot-toast'


const Root =()=>{
  const isAuth = !!localStorage.getItem('token');
  return isAuth ? <Navigate to="/dashboard"/> : <Navigate to="/login"/>
}


const App = () => {
  return (
    <>
    <div>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
      </Routes>
    </div>
    <Toaster toastOption={{
      className : "",
      style :{
        fontSize: '13px',
      },
    }}>

    </Toaster>
    </>
  );
};

export default App;



