import React from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import Base from './Base/Base';
import Index from './Index/Index'
import Profile from './Profile/Profile';
import Search from './Search/Search'
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
        <div>
          <Base auth={auth} />
          <Route exact path="/" render={(props) => <Index auth={auth}/>} />
          <Route exact path="/profile" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/"/>
            ) : (
              <Profile auth={auth}/>
            )
          )} />
          <Route exact path="/search" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/"/>
            ) : (
              <Search auth={auth}/>
            )
          )} />
          <Route exact path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback/> 
          }}/>        
        </div>
      </Router>
  );
}
