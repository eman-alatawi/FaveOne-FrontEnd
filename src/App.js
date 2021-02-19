import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { decode } from "jsonwebtoken";

import React, { Component } from 'react'
import Join from './user/Join';
import Login from './user/Login'


export default class App extends Component {

  state = {
    isAuth: false,
    user: null,
    errorMessage: null,
    successMessage: null,

  }
  componentDidMount() {
    this.userAuthCheck();

  }
  userAuthCheck = () => {
    //if there is a token in local storage?
    let token = localStorage.getItem("token");

    //if yes
    if (token != null) {
      let user = decode(token); //so  the token decode properly?

      if (user) { // yes their is user (not null) and the token not expired
        this.setState({
          isAuth: true, //so the user is athenticated
          user: user // and put user to user

        });
      } else if (!user) { // no user (it's null)
        localStorage.removeItem("token"); //so remove the token from local storage
        this.setState({
          isAuth: false //user not athenticated
        });
      }
    }
  }
  registerHandler = (user) => {
    axios
      .post("/favone/user/registration", user)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loginHandler = (user) => {
    axios
      .post("/favone/user/authenticate", user)
      .then((response) => {
        console.log(response);
        console.log(response.data.token);

        if (response.data.token != null) {
          localStorage.setItem("token", response.data.token);
          let user = decode(response.data.token);

          this.setState({
            isAuth: true,
            user: user,
            successMessage: "Successfully logged in!!",
            errorMessage: null
          })
        }else {
          this.setState({
            isAuth: false,
            user: null,
            errorMessage: "Incorrect Username or password"
          })
        }

      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isAuth: false,
          errorMessage: "Error Occured. please try again later "
        })
      });
  };
  render() {
    return (
      <Router>
        <nav>
          <div>
            <Link to="/register">Register</Link> <Link to="/login">Login</Link>{" "}


          </div>
        </nav>

        <div className= "text-red">hi</div>
        <div>
          <Route path="/register" component={() => <Join  register={this.registerHandler}></Join>}></Route>

          <Route path="/login" component={() => <Login login={this.loginHandler} />}></Route>

        </div>


      </Router>
    )
  }
}

