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
import GenderIndex from './gender/GenderIndex';
import NewGender from './gender/NewGender'
import MDIndex from './movieDrama/MDIndex';
import EditMD from './movieDrama/EditMD';
import NewMD from './movieDrama/NewMD'

export default class App extends Component {

  state = {
    isAuth: false,
    isSectionsShow: true,
    user: null,
    errorMessage: null,
    successMessage: null,
    message: null,
    actors: [],
    genders: [],
    moviesDramas: []

  }
  componentDidMount() {
    this.userAuthCheck();
    this.loadActors();
    this.loadGenders();
    this.loadMoviesDramas();
  }


  // USER AUTHENTICATION 
  userAuthCheck = () => {
    //is there a token in local storage?
    let token = localStorage.getItem("token");

    //if yes
    if (token != null) {
      let user = decode(token); //so  the token decode properly?

      if (user) { // yes their is user (not null) and the token not expired
        this.setState({
          isAuth: true, //so the user is athenticated
          user: user // and put user to user state

        });
      } else if (!user) { // no user (it's null)
        localStorage.removeItem("token"); //so remove the token from local storage
        this.setState({
          isAuth: false //user not athenticated
        });
      }
    }
  }


  // Handlers
  // 1- registerHandler
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

  // 2- loginHandler
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

  // 3- onLogoutHandeler
  onLogoutHandeler = (e) => {
    //to go to the login page because it's by default prevent this
    e.preventDefault();
    localStorage.removeItem("token"); //so remove the token from local storage
    this.setState({
      isAuth: false, //user not athenticated
      user: null
    });

  }

  // 4- addActorHandler
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

  // 5- hideSectionsHandler
  hideSectionsHandler = () => {
    this.setState({
      isSectionsShow: false
    })
  }

  // 6- showSectionsHandler
  showSectionsHandler = () => {
    this.setState({
      isSectionsShow: true
    })
  }

  //7- addGenderHandler
  addGenderHandler = (gender) =>{
    axios.post("/favone/mdgender/add", gender,
    {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
    .then(response => {
      console.log("Gender Added");
      console.log(response);
      this.loadGenders();

      this.setState({
        successMessage: "Gender Added Successfully!!"
      })
    })
    .catch(error => {
      console.log("Error while Adding Gender !!");
      console.log(error);
      this.setState({
        errorMessage: "Error while Adding gender, Try again later!!"
      })
    })
  }

  // 8- addMovieDramaHandler
  addMovieDramaHandler =(movieDrama) =>{
    axios.post("/favone/md/add", movieDrama,
    {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
    .then(response => {
      console.log("movie - Drama Added");
      console.log(response);
      this.loadMoviesDramas();

      this.setState({
        successMessage: "movie - Drama Added Successfully!!"
      })
    })
    .catch(error => {
      console.log("Error while Adding movie - Drama !!");
      console.log(error);
      this.setState({
        errorMessage: "Error while Adding movie -Drama, Try again later!!"
      })
    })
  }
  

  //Loaders
  //1- loadActors
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

  //2- loadGenders
  loadGenders = () => {
    axios.get("/favone/mdgender/index")
      .then(response => {
        console.log(response);
        this.setState({
          genders: response.data
        })
      })
      .catch(error => {
        console.log("Error while reteriving Movie-Drama's Genders!!");
        console.log(error);
      })
  }

  //3- loadMoviesDramasHandler
  loadMoviesDramas = () =>{
    axios.get("/favone/md/index")
    .then(response => {
      console.log(response);
      this.setState({
        moviesDramas: response.data
      })
    })
    .catch(error => {
      console.log("Error while reteriving Movies-Dramas Genders!!");
      console.log(error);
    })
  }

  render(){
    const { isAuth, isSectionsShow } = this.state;

    return (


      <Router>
        <nav>
          <div> 
          </div>

          {isAuth ? (
            <Navbar collapseOnSelect expand="lg" variant="dark" className="bg-blue-900 shadow">
              <Navbar.Brand ><Link to="/" onClick={this.showSectionsHandler} className="text-white ml-5 mr-11 text-2xl"><span className="material-icons">star</span>FaveOne</Link></Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <NavDropdown title="Movie - Drama" id="collasible-nav-dropdown" className="mr-11 text-xl">
                    <NavDropdown.Item ><Link to="/movieDramaIndex" onClick={this.hideSectionsHandler} className="dropDownLink"> Movies - Dramas</Link></NavDropdown.Item>
                    <NavDropdown.Item ><Link to="/imageGalleryIndex" onClick={this.hideSectionsHandler} className="dropDownLink"> Images Gallery</Link></NavDropdown.Item>
                    <NavDropdown.Item ><Link to="/genderIndex" onClick={this.hideSectionsHandler} className="dropDownLink"> Genders</Link></NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item ><Link to="/addMovieDrama" onClick={this.hideSectionsHandler} className="dropDownLink">Add Movie - Drama</Link></NavDropdown.Item>
                    <NavDropdown.Item ><Link to="/addImageGallery" onClick={this.hideSectionsHandler} className="dropDownLink"> Add Image Gallery</Link></NavDropdown.Item>
                    {/* <NavDropdown.Item ><Link to="/addGender" onClick={this.hideSectionsHandler} className="dropDownLink"> Add Gender</Link></NavDropdown.Item> */}


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
                <Navbar.Brand ><Link to="/" onClick={this.showSectionsHandler} className="text-white ml-5 mr-11 text-2xl"><span className="material-icons">star</span>FaveOne</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto">
                    <NavDropdown title="Movie - Drama" id="collasible-nav-dropdown" className="mr-11 text-xl">
                      <NavDropdown.Item ><Link to="/movieDramaIndex" onClick={this.hideSectionsHandler} className="dropDownLink"> Movies - Dramas</Link></NavDropdown.Item>
                      <NavDropdown.Item ><Link to="/imageGalleryIndex" onClick={this.hideSectionsHandler} className="dropDownLink"> Images Gallery</Link></NavDropdown.Item>
                      <NavDropdown.Item ><Link to="/genderIndex" onClick={this.hideSectionsHandler} className="dropDownLink"> Genders</Link></NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Episode" id="collasible-nav-dropdown" className="mr-11 text-xl">
                      <NavDropdown.Item ><Link to="/episodeIndex" onClick={this.hideSectionsHandler} className="dropDownLink"> Episodes</Link></NavDropdown.Item>

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
            <Route path="/register" component={() => <Join register={this.registerHandler} message={this.state.message} ></Join>}></Route>
            <Route path="/login" component={() => <Login login={this.loginHandler} errorMessage={this.state.errorMessage} successMessage={this.state.successMessage} />}></Route>
            <Route path="/actorIndex" component={() => <ActorIndex actors={this.state.actors} isAuth={this.state.isAuth} loadActors={this.loadActors} errorMessage={this.state.errorMessage} successMessage={this.state.successMessage}></ActorIndex>}></Route>
            <Route path="/genderIndex" component={() => <GenderIndex genders={this.state.genders} isAuth={this.state.isAuth} loadGenders={this.loadGenders} addGender={this.addGenderHandler} errorMessage={this.state.errorMessage} successMessage={this.state.successMessage}></GenderIndex>}></Route>
            <Route path="/movieDramaIndex" component={() => <MDIndex moviesDramas={this.state.moviesDramas} actors={this.state.actors} isAuth={this.state.isAuth} loadMoviesDramas={this.loadMoviesDramas}></MDIndex>}></Route>

            <Route path="/addActor" component={() => <NewActor addActor={this.addActorHandler} errorMessage={this.state.errorMessage} successMessage={this.state.successMessage} ></NewActor>}></Route>
            <Route path="/addMovieDrama" component={() => <NewMD addMD={this.addMovieDramaHandler} actors={this.state.actors} genders={this.state.genders}  errorMessage={this.state.errorMessage} successMessage={this.state.successMessage} ></NewMD>}></Route>

            {/* <Route path="/addGender" component={() => <NewGender addGender={this.addGenderHandler} errorMessage={this.state.errorMessage} successMessage={this.state.successMessage} ></NewGender>}></Route> */}


          </Switch>
        </div>




      </Router>
    )
  }
}

