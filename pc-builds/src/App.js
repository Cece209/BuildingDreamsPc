import {Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

//auth
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';

import '@aws-amplify/ui-react';

import SiteNav from './components/Common/SitNav';
import SiteFooter from './components/Common/SiteFooter';
import HomePage from './components/Pages/home/HomePage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import FourmsPage from './components/Pages/forums/ForumsPage';
import ConfigurePage from './components/Pages/configure/ConfigurePage';
import MessagesPage from './components/Pages/messages/MessagesPage';
import CartItemsPage from './components/Pages/cartItems/CartItemsPage';

Amplify.configure(awsExports);

function App() {
  return (
    <Authenticator loginMechanism={('email')}>
      {({ signOut, user }) => (
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
    )}
    </Authenticator>
  );
}

export default App;