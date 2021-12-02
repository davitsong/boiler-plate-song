import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route

} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'
import VideoUploadPage from "./components/views/VideoUploadPage/VideoUploadPage";


function App() {
  return (
    <Router>
      <div>
       
        {/*
          A <switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <switch> any time
          you have multiple routes, but you want only one
          of them to render at a time

          //null 아무나 들어갈수있음
          //false 로그인 한사람은 못들어감
          //login한 사람만 들어감
        */}
        <Switch>
          <Route exact path="/" component={Auth(LandingPage,null)} />     
          <Route exact path="/login" component={Auth(LoginPage,false)} /> 
          <Route exact path="/register" component={Auth(RegisterPage,false)} />
          <Route exact path="/Video/upload" component={Auth(VideoUploadPage,true)} />
        </Switch>
      </div>
    </Router>
  );
}



export default App;

