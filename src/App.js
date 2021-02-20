import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { decode } from "jsonwebtoken";
import { Alert } from "react-bootstrap";
import React, { Component } from 'react'
import Join from './user/Join';
import Login from './user/Login'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

import HomeBanner from './HomeBanner';
import MovieDramaSection from './MovieDramaSection';
import ActorSection from './ActorSection';
import SectionDivider from './SectionDivider';

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
        } else {
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

  onLogoutHandeler = (e) => {
    //to go to the login page because it's by default prevent this
    e.preventDefault();
    localStorage.removeItem("token"); //so remove the token from local storage
    this.setState({
      isAuth: false, //user not athenticated
      user: null
    });

  }




  render() {
    const { isAuth } = this.state;

    const errorMessage = this.state.errorMessage ? (
      <Alert variant="danger">{this.state.errorMessage}</Alert>
    ) : null;

    const successMessage = this.state.successMessage ? (
      <Alert variant="success">{this.state.successMessage}</Alert>
    ) : null;


    return (


      <Router>
        <nav>
          {/* <FadeIn> */}
          <div>
            {errorMessage}
            {successMessage}
          </div>

          {isAuth ? (
            <Navbar collapseOnSelect expand="lg" variant="dark" className="bg-blue-900 shadow">
              <Navbar.Brand ><Link to="/" className="text-white ml-5 mr-11 text-2xl"><span class="material-icons">star</span>FaveOne</Link></Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <NavDropdown title="Movie" id="collasible-nav-dropdown" className="mr-11 text-xl">
                    <NavDropdown.Item ><Link to="/movieIndex" className="dropDownLink"> Movie</Link></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item ><Link to="/addMovie" className="dropDownLink">Add Movie</Link></NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Drama" id="collasible-nav-dropdown" className="mr-11 text-xl">
                    <NavDropdown.Item ><Link to="/dramaIndex" className="dropDownLink">Drama</Link></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item ><Link to="/addDrama" className="dropDownLink">Add Drama</Link> </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Episode" id="collasible-nav-dropdown" className="mr-11 text-xl">
                    <NavDropdown.Item ><Link to="/episodeIndex" className="dropDownLink"> Episode</Link></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item ><Link to="/addEpisode" className="dropDownLink">Add Episode</Link></NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Actor" id="collasible-nav-dropdown" className="mr-11 text-xl">
                    <NavDropdown.Item ><Link to="/actorIndex" className="dropDownLink"> Actor</Link></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item ><Link to="/addActor" className="dropDownLink">Add Actor</Link></NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Nav>
                  {this.state.user ? <Navbar.Text className="mr-5"> Signed in as: {this.state.user.sub} </Navbar.Text> : null}

                  <Nav.Link > <Link to="/logout" onClick={this.onLogoutHandeler} className="mr-5">Say Bye</Link></Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          ) : (
              <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand><Link to="/"> BLOG APP</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto">
                    <NavDropdown title="Author" id="collasible-nav-dropdown">
                      <NavDropdown.Item ><Link to="/authorIndex" className="dropDownLink"> Author</Link></NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item ><Link to="/addAuthor" className="dropDownLink">Add Author</Link></NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Article" id="collasible-nav-dropdown">
                      <NavDropdown.Item ><Link to="/articleIndex" className="dropDownLink">Article</Link></NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item ><Link to="/addArticle" className="dropDownLink">Add Article</Link> </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  <Nav>
                    <Nav.Link > <Link to="/register">Join</Link></Nav.Link>
                    <Nav.Link >  <Link to="/login">Login</Link></Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            )}
        </nav>

        <HomeBanner></HomeBanner>
        <MovieDramaSection></MovieDramaSection>
        {/* <SectionDivider></SectionDivider> */}
        <ActorSection></ActorSection>
        {/* <SectionDivider></SectionDivider> */}
        
        


        {/* {isAuth ? () : ()} */}



        <div>
          {/* <Route exact path="/" component={App}></Route>
  <Route path="/addAuthor" component={() => <AuthorNewForm addAuthor={this.addAuthor}></AuthorNewForm>}></Route>
  <Route path="/addArticle" component={() => <NewArticle authors={this.state.authors} addArticle={this.addArticle}></NewArticle>}></Route>
  <Route path="/authorIndex" component={() => <AuthorList authors={this.state.authors} articles={this.state.articles} loadAuthorList={this.loadAuthorList}></AuthorList>}></Route>
  <Route path="/articleIndex" component={() => <ArticleList articles={this.state.articles} authors={this.state.authors} loadArticleList={this.loadArticleList}></ArticleList>}></Route> */}

          <Route path="/register" component={() => <Join register={this.registerHandler}></Join>}></Route>
          <Route path="/login" component={() => <Login login={this.loginHandler} />}></Route>
        </div>



      </Router>
    )
  }
}

