import {Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import SiteNav from './components/Common/SitNav';
import SiteFooter from './components/Common/SiteFooter';
import HomePage from './components/Pages/home/HomePage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import FourmsPage from './components/Pages/forums/ForumsPage';
import ConfigurePage from './components/Pages/configure/ConfigurePage';
import MessagesPage from './components/Pages/messages/MessagesPage';
import CartItemsPage from './components/Pages/cartItems/CartItemsPage';



function App() {
  return (
    <div>
      <SiteNav />
      <Routes>
        <Route path='*' element={<HomePage />} />
        <Route path='/' exact={true} element={<HomePage /> } />
        <Route path='/login' element={<LoginPage /> } />
        <Route path='/register' element={<RegisterPage /> } />
        <Route path='/forums' element={<FourmsPage /> } />
        <Route path='/configure' element={<ConfigurePage /> } />
        <Route path='/messages' element={<MessagesPage /> } />
        <Route path='/cartitems' element={<CartItemsPage /> } />

      </Routes>
      <SiteFooter/>
    </div>
    
  );
}

export default App;