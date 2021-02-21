import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
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
import ActorSection from './actor/ActorSection';
import EpisodeSection from './EpisodeSection'
import Footer from './Footer';
import NewActor from './actor/NewActor'
import ActorIndex from './actor/ActorIndex'

export default class App extends Component {

  state = {
    isAuth: false,
    isSectionsShow: true,
    user: null,
    errorMessage: null,
    successMessage: null,
    message: null,
    actors: []

  }
  componentDidMount() {
    this.userAuthCheck();
    this.loadActors();

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
        this.setState({
          message: response.data.message
        })
      })
      .catch((error) => {
        console.log("Error in register user")
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

  loadActors = () => {
    axios.get("/favone/actor/index")
      .then(response => {
        console.log(response);
        this.setState({
          actors: response.data
        })
      })
      .catch(error => {
        console.log("Error while reteriving actors !!");
        console.log(error);
      })
  }

  addActorHandler = (actor) => {

    axios.post("/favone/actor/add", actor,
      {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        console.log("Actor Added");
        console.log(response);
        this.loadActors();

        this.setState({
          successMessage: "Actor Added Successfully!!"
        })
      })
      .catch(error => {
        console.log("Error while Adding actor !!");
        console.log(error);
        this.setState({
          errorMessage: "Error while Adding Actor, Try again later!!"
        })
      })
  }


  hideSectionsHandler = () => {
    this.setState({
      isSectionsShow: false
    })
  }

  showSectionsHandler = () => {
    this.setState({
      isSectionsShow: true
    })
  }

  //hide ActorIndex to show the EditActor
  // hideActorIndex = () =>{
  // }

  render() {
    const { isAuth, isSectionsShow } = this.state;







    return (


      <Router>
        <nav>
          {/* <FadeIn> */}
          <div>


          </div>

          {isAuth ? (
            <Navbar collapseOnSelect expand="lg" variant="dark" className="bg-blue-900 shadow">
              <Navbar.Brand ><Link to="/"  onClick={this.showSectionsHandler} className="text-white ml-5 mr-11 text-2xl"><span className="material-icons">star</span>FaveOne</Link></Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <NavDropdown title="Movie" id="collasible-nav-dropdown" className="mr-11 text-xl">
                    <NavDropdown.Item ><Link to="/movieIndex" onClick={this.hideSectionsHandler} className="dropDownLink"> Movies</Link></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item ><Link to="/addMovie" onClick={this.hideSectionsHandler} className="dropDownLink">Add Movie</Link></NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Drama" id="collasible-nav-dropdown" className="mr-11 text-xl">
                    <NavDropdown.Item ><Link to="/dramaIndex" onClick={this.hideSectionsHandler} className="dropDownLink">Dramas</Link></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item ><Link to="/addDrama" onClick={this.hideSectionsHandler} className="dropDownLink">Add Drama</Link> </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Episode" id="collasible-nav-dropdown" className="mr-11 text-xl">
                    <NavDropdown.Item ><Link to="/episodeIndex" onClick={this.hideSectionsHandler} className="dropDownLink"> Episodes</Link></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item ><Link to="/addEpisode" onClick={this.hideSectionsHandler} className="dropDownLink">Add Episode</Link></NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Actor" id="collasible-nav-dropdown" className="mr-11 text-xl">
                    <NavDropdown.Item ><Link to="/actorIndex" onClick={this.hideSectionsHandler} className="dropDownLink"> Actors</Link></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item ><Link to="/addActor" onClick={this.hideSectionsHandler} className="dropDownLink">Add Actor</Link></NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Nav className="mr-5">
                  {this.state.user ? <Navbar.Text className="mr-5"> Signed in as: {this.state.user.sub} </Navbar.Text> : null}

                  <Nav.Link > <Link to="/logout" onClick={this.onLogoutHandeler} className="mr-5 hover:text-pink-400 text-xl">Say Bye</Link></Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          ) : (
              <Navbar collapseOnSelect expand="lg" variant="dark" className="bg-blue-900 shadow">
                <Navbar.Brand ><Link to="/" onClick={this.showSectionsHandler}  className="text-white ml-5 mr-11 text-2xl"><span className="material-icons">star</span>FaveOne</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto">
                    <NavDropdown title="Movie" id="collasible-nav-dropdown" className="mr-11 text-xl">
                      <NavDropdown.Item ><Link to="/movieIndex" onClick={this.hideSectionsHandler} className="dropDownLink"> Movies</Link></NavDropdown.Item>

                    </NavDropdown>
                    <NavDropdown title="Drama" id="collasible-nav-dropdown" className="mr-11 text-xl">
                      <NavDropdown.Item ><Link to="/dramaIndex"  onClick={this.hideSectionsHandler} className="dropDownLink">Dramas</Link></NavDropdown.Item>

                    </NavDropdown>
                    <NavDropdown title="Episode" id="collasible-nav-dropdown" className="mr-11 text-xl">
                      <NavDropdown.Item ><Link to="/episodeIndex"  onClick={this.hideSectionsHandler} className="dropDownLink"> Episodes</Link></NavDropdown.Item>

                    </NavDropdown>
                    <NavDropdown title="Actor" id="collasible-nav-dropdown" className="mr-11 text-xl">
                      <NavDropdown.Item ><Link to="/actorIndex" onClick={this.hideSectionsHandler} onClick={this.hideSectionsHandler} className="dropDownLink"> Actors</Link></NavDropdown.Item>

                    </NavDropdown>
                  </Nav>
                  <Nav className="mr-5">
                    <Nav.Link > <Link to="/register" onClick={this.hideSectionsHandler} className="hover:text-pink-400 text-xl">Join</Link></Nav.Link>
                    <Nav.Link >  <Link to="/login" onClick={this.hideSectionsHandler} className="hover:text-pink-400 text-xl">Login</Link></Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            )}
        </nav>

        <HomeBanner></HomeBanner>


        {/* <div className={`${this.state.isClicked === true ? 'invisible' : 'visible'}`}> */}
        {isSectionsShow ? (
          <div>
            <MovieDramaSection></MovieDramaSection>
            <ActorSection actors={this.state.actors} loadActors={this.loadActors}></ActorSection>
            <EpisodeSection></EpisodeSection>
            <Footer></Footer>
          </div>

        ) : null}

        {/* </div> */}

       





        {/* {isAuth ? () : ()} */}



        <div>
          {/* <Route exact path="/" component={App}></Route>
  <Route path="/addAuthor" component={() => <AuthorNewForm addAuthor={this.addAuthor}></AuthorNewForm>}></Route>
  <Route path="/addArticle" component={() => <NewArticle authors={this.state.authors} addArticle={this.addArticle}></NewArticle>}></Route>
  <Route path="/authorIndex" component={() => <AuthorList authors={this.state.authors} articles={this.state.articles} loadAuthorList={this.loadAuthorList}></AuthorList>}></Route>
  <Route path="/articleIndex" component={() => <ArticleList articles={this.state.articles} authors={this.state.authors} loadArticleList={this.loadArticleList}></ArticleList>}></Route> */}

          <Switch>
         
            <Route path="/actorIndex" component={() => <ActorIndex actors={this.state.actors} isAuth={this.state.isAuth} loadActors={this.loadActors}></ActorIndex>}></Route>
            <Route path="/addActor" component={() => <NewActor addActor={this.addActorHandler} errorMessage={this.state.errorMessage} successMessage={this.state.successMessage} ></NewActor>}></Route>
            <Route path="/register" component={() => <Join register={this.registerHandler} message={this.state.message} ></Join>}></Route>
            <Route path="/login" component={() => <Login login={this.loginHandler} errorMessage={this.state.errorMessage} successMessage={this.state.successMessage} />}></Route>
          </Switch>
        </div>



      </Router>
    )
  }
}

