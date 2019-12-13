import React from 'react';
import SendForm from "./SendForm";
import './App.css';
import MainPage from "./MainPage";
import Content from "./Content";
import SlideMenu from "./SlideMenu";
import openSocket from 'socket.io-client';
import SendSign from "./SendSign";
import * as io from 'socket.io-client'
import {
    SocketProvider,
    socketConnect,
} from 'socket.io-react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import { ConfigSwitch } from 'rrc';
import DataAlert from "./DataAlert";





const socket = io.connect('https://bruhchat-node.herokuapp.com/');


function App() {
  return (
      <>

          <Router>
              <SocketProvider socket={socket}>
              <MainPage/>
              <Switch>
                  <Route exact path="/">
                      <Home/>
                  </Route>
              </Switch>
              <Switch>
                  <Route path="/createaccount">

                      <CreateAccount/>

                  </Route>
              </Switch>
              <Switch>
                  <Route path="/login">

                      <Login socket={socket}/>

                  </Route>
              </Switch>
                  <Switch>
                      <Route path="/dashboard">
                          <DashBoard socket={socket}/>>
                      </Route>
                  </Switch>
              </SocketProvider>
          </Router>

      </>
  );
}

function Home(){
    return (
        <>

            <br></br>
            <br></br>
        <div className="home-container">
            <br></br>
            <h1 className="font">Welcome to Bruh Chat</h1>
            <br></br>
            <Link to="/login">
                <button type="button" className="myButton">
                    Login
                </button>
            </Link>
            <br></br>
            <br></br>
            <Link to="/createaccount">
                <button type="button" className="myButton">
                    Create Account
                </button>
            </Link>
        </div>

            </>
    );
}

function DashBoard(){
    return(
        <>
            <Content socket={socket}/>
        </>
    );
}

function CreateAccount(){
    return(
        <>

            <br></br>
            <br></br>
        <div className="account-container">
            <br></br>
            <h1 className="font">Create your account</h1>
            <SendForm socket={socket}/>
            <br></br>
            <br></br>
            <Link to="/login" className="font">Login</Link>
            <br></br>
            <br></br>
            <Link to="/" className="font">Home</Link>
        </div>

        </>
    );
}

function Login(){
    return (
        <>

            <br></br>
                <br></br>
        <div className="login-container">
            <br></br>
            <h1 className="font">Login</h1>
            <SendSign socket={socket}/>
            <br></br>
            <br></br>
            <Link to="/createaccount" className="font">Create Account</Link>
            <br></br>
            <br></br>
            <Link to="/" className="font">Home</Link>
        </div>

        </>
    );
}


export const sendForm = (username, password)=>{
    socket.emit('createAccount', {
        username: username,
        password: password,
        userid: socket.id
    });
}

export const sendSign = (username, password)=>{
    socket.emit('userForm', {
        username: username,
        password: password,
        id: socket.id
    });
}

export default App;
