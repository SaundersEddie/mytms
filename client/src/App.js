import React, {useState, useEffect } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import Header from './components/layouts/Header';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserContext from './context/UserContext';

import './App.css';

export default function App() {
  const [userData, setUserData] = useState ({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        '/user/tokenIsValid', 
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await axios.get('/user/',
        { headers: { "x-auth-token": token}},
       );
       console.log ("User data: ", userRes.data);
       setUserData ({
        token,
        user: userRes.data,
       });
      }
    };
  
    checkLoggedIn();
 } , []);



      // token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZjMzODU1MDFiOGY5Mzg0OGI2NmM3ZiIsImlhdCI6MTYwOTc3NTE5M30.VAG6FCu5xOmHQSyksLUrNuoMJe0kFydFh69OycwzZRs`


  return (
    <>
      <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData}}>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
