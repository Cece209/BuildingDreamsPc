import {Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

//auth
import { Amplify } from 'aws-amplify';
import { Authenticator, View, Image, useTheme, Text } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';

import '@aws-amplify/ui-react/styles.css';

import SiteNav from './components/Common/SitNav';
import SiteFooter from './components/Common/SiteFooter';
import HomePage from './components/Pages/home/HomePage';

import AboutPage from './components/Pages/about/Aboutpage';
import FourmsPage from './components/Pages/forums/ForumsPage';
import ConfigurePage from './components/Pages/configure/ConfigurePage';
import MessagesPage from './components/Pages/messages/MessagesPage';
import CartItemsPage from './components/Pages/cartItems/CartItemsPage';
import SavedBuildsPage from './components/Pages/savedbuilds/SavedBuildspage';
import FeedbackPage from './components/Pages/feedback/FeedbackPage';


Amplify.configure(awsExports);

function App() {

  const components = {
    Header() {
      const { tokens } = useTheme();
  
      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Image
            alt="Building Dreams"
            src="img/Logo.png"
          />
        </View>
      );
    },
    Footer() {
      const { tokens } = useTheme();
  
      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Text color={tokens.colors.neutral[80]}>
            &copy; All Rights Reserved
          </Text>
        </View>
      );
    },

  }

  return (
    <Authenticator loginMechanism={('email')} components={components}>
      {({ signOut, user }) => (
    <div>
      <SiteNav logOut={signOut}/>
      <Routes>
        <Route path='*' element={<HomePage />} />
        <Route path='/' exact={true} element={<HomePage /> } />
        
        <Route path='/forums' element={<FourmsPage /> } />
        <Route path='/configure' element={<ConfigurePage /> } />
        <Route path='/messages' element={<MessagesPage /> } />
        <Route path='/cartitems' element={<CartItemsPage /> } />
        <Route path='/about' element={<AboutPage /> } />
        <Route path='/savedbuilds' element={<SavedBuildsPage /> } />
        <Route path='/feedback' element={<FeedbackPage /> } />

      </Routes>
      <SiteFooter/>
    </div>
    )}
    </Authenticator>
  );
}

export default App;