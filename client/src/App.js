import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ChatRoom from './components/ChatRoom';




function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Dashboard />
          </Route>

          <Route exact path="/register">
            <Register />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exac path='/chat'>
            <ChatRoom />
          </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;