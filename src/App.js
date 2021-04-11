import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { decode } from "jsonwebtoken";
import { toast } from 'react-toastify';
import React, { Component } from 'react'
import Join from './user/Join';
import Login from './user/Login'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import SearchBar from './Shared/SearchBar'
import HomeBanner from './Shared/HomeBanner';
import ActorSection from './actor/ActorSection';
import EpisodeSection from './episode/EpisodeSection'
import Footer from './Shared/Footer';
import NewActor from './actor/NewActor'
import ActorIndex from './actor/ActorIndex'
import GenderIndex from './gender/GenderIndex';
import MDIndex from './movieDrama/MDIndex';
import NewMD from './movieDrama/NewMD'
import MovieDramaSection from './movieDrama/MovieDramaSection'
import EpisodeIndex from './episode/EpisodeIndex';
import NewEpisode from './episode/NewEpisode';
import ImageGalleryIndex from './ImageGallery/ImageGalleryIndex'
import NewImageGallery from './ImageGallery/NewImageGallery';
import ChangePassword from './user/ChangePassword';
import dotenv from 'dotenv';
dotenv.config();

export default class App extends Component {

  state = {
    isAuth: false,
    isSectionsShow: true,
    user: null,
    emailAddress: '',
    message: null,
    actors: [],
    genders: [],
    moviesDramas: [],
    episodes: [],
    imageGalleries: [],
    filterValue: ''

  }
  componentDidMount() {
    this.userAuthCheck();
    this.loadActors();
    this.loadGenders();
    this.loadMoviesDramas();
    this.loadEpisodes();
    this.loadImageGalleries();

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
    // axios
    //   .post(`${process.env.REACT_APP_BACK_END_URL}user/registration`, user)
    axios.post("/favone/user/registration", user)
      .then((response) => {
        console.log(response);
        this.setState({
          message: response.data.message
        })
        toast.info(this.state.message)
      })
      .catch((error) => {
        console.log("Error in register user")
        console.log(error);
        toast.error("Error Occured while trying to Join. Please try again later")
      });
  };

  // 2- loginHandler
  loginHandler = (user) => {
    // axios
    //   .post(`${process.env.REACT_APP_BACK_END_URL}user/authenticate`, user)
    axios.post("/favone/user/authenticate", user)
      .then((response) => {
        console.log(response);
        console.log(response.data.token);

        if (response.data.token != null) {
          localStorage.setItem("token", response.data.token);
          let user = decode(response.data.token);

          this.setState({
            isAuth: true,
            user: user,
          })
          toast.success("Successfully logged in!!");
          toast("Welcome Back :) ")
          console.log(this.state.user.sub)
        } else {
          this.setState({
            isAuth: false,
            user: null,
          })
          toast.warn("Incorrect EmailAddress or Password")
        }

      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isAuth: false,
        })
        toast.error("Error Occured. Please try again later")
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
    toast("Bye Bye See You Later")

  }

  // 4- addActorHandler
  addActorHandler = (actor) => {
    // axios.post(`${process.env.REACT_APP_BACK_END_URL}/actor/add`, actor,
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
        toast.success("The actor has been Added Successfully")
        toast.info("Added in Actors Section")
      })
      .catch(error => {
        console.log("Error while Adding actor !!");
        console.log(error);
        toast.error("Error Occured while trying to Add Actor. Please try again later")

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
  addGenderHandler = (gender) => {
    // axios.post(`${process.env.REACT_APP_BACK_END_URL}mdgender/add`, gender,
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
        toast.success("The Gender has been Added Successfully")
      })
      .catch(error => {
        console.log("Error while Adding Gender !!");
        console.log(error);
        toast.error("Error Occured while trying to Add Gender. Please try again later")
      })
  }

  // 8- addMovieDramaHandler
  addMovieDramaHandler = (movieDrama) => {
    // axios.post(`${process.env.REACT_APP_BACK_END_URL}md/add`, movieDrama,
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
        this.loadActors();
        toast.success("The Movie/Drama has been Added Successfully")
        toast.info("Added in Movies-Dramas Section")
      })
      .catch(error => {
        console.log("Error while Adding movie - Drama !!");
        console.log(error);
        toast.error("Error Occured while trying to Add Movie/Drama. Please try again later")
      })
  }

  // 9- addEpisodeHandler
  addEpisodeHandler = (episode) => {
    // axios.post(`${process.env.REACT_APP_BACK_END_URL}episode/add`, episode,
    axios.post("/favone/episode/add", episode,
      {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        console.log("Episode Added");
        console.log(response);
        this.loadMoviesDramas();
        this.loadEpisodes();
        toast.success("The Episode has been Added Successfully")
        toast.info("Added in Episodes Section")
      })
      .catch(error => {
        console.log("Error while Adding Episode !!");
        console.log(error);
        toast.error("Error while trying to Add Episode, Try again later!!")
      })
  }

  // 10- addImageGalleryHandler
  addImageGalleryHandler = (imageGallery) => {
    // axios.post(`${process.env.REACT_APP_BACK_END_URL}imagegallery/add`, imageGallery,
    axios.post("/favone/imagegallery/add", imageGallery,
      {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        console.log("Image Gallery Added");
        console.log(response);
        this.loadMoviesDramas();
        this.loadImageGalleries();
        toast.success("The Image Gallery has been Added Successfully")
        toast.info("Added in Image Galleries Section")
      })
      .catch(error => {
        console.log("Error while Adding Image Gallery  !!");
        console.log(error);
        toast.error("Error while trying to Add Image Gallery, Try again later!!")
      })
  }

  // 11- changePasswordHandler
  changePasswordHandler = (user) => {
    // axios.put(`${process.env.REACT_APP_BACK_END_URL}user/changePassword`, user,
    axios.put("/favone/user/changePassword", user,
      {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        console.log("edit password");
        console.log(response);
        this.setState({
          message: response.data.message
        })
        toast.info(this.state.message)
      })
      .catch(error => {
        console.log("error in editing password");
        console.log(error);
        toast.error("Error Occured while trying to change password. Please try again later")
      })
  }

  // 12- handleFilterChange
  handleFilterChange = (event, temp) => {
    event.preventDefault();
    const filterValue = event.target.value;
    if (filterValue != '') {
      console.log("when the there is value in input " + filterValue)
      this.setState((prev, props) => {
        //list of moviesDramas that match the filter
        //new array containes the filtered items
        //filter() return new array 
        const filteredMDByName = this.state.moviesDramas.filter((md) => {
          return md.title.toLowerCase().includes(filterValue.toLowerCase())
        });

        //list of Actors that match the filter
        //new array containes the filtered items
        //filter() return new array 
        const filteredActorsList = this.state.actors.filter((actor) => {
          return actor.fullName.toLowerCase().includes(filterValue.toLowerCase())
        });

        // const filteredEpisodesList = this.state.episodes.filter((ep) => {
        //   console.log(ep.episodNum)
        //   console.log(filterValue)
        //   return ep.episodNum.includes(filterValue)

        // });


         const filteredGendersList = this.state.genders.filter((gender) => {
          return gender.name.toLowerCase().includes(filterValue.toLowerCase())
        });

        //here is the reurn object from the setState
        return {
          moviesDramas: filteredMDByName,
          actors: filteredActorsList,
          filterValue: filterValue,
          // episodes: filteredEpisodesList,
          genders: filteredGendersList
        }
      })
    }
    else {
      console.log("when the there is no value in input")
      this.setState({
        filterValue: filterValue,
      })
      this.loadMoviesDramas();
      this.loadActors();
      this.loadEpisodes();
      this.loadGenders();
    }
  }

  //Loaders
  //1- loadActors
  loadActors = () => {
    // axios.get(`${process.env.REACT_APP_BACK_END_URL}actor/index`)
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
    // axios.get(`${process.env.REACT_APP_BACK_END_URL}mdgender/index`)
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

  //3- loadMoviesDramas
  loadMoviesDramas = () => {
    // axios.get(`${process.env.REACT_APP_BACK_END_URL}md/index`)
    axios.get("/favone/md/index")
      .then(response => {
        console.log(response);
        this.setState({
          moviesDramas: response.data
        })
      })
      .catch(error => {
        console.log("Error while reteriving Movies-Dramas!!");
        console.log(error);
      })
  }

  //4- loadEpisodes
  loadEpisodes = () => {
    // axios.get(`${process.env.REACT_APP_BACK_END_URL}episode/index`)
    axios.get("/favone/episode/index")
      .then(response => {
        console.log(response);
        this.setState({
          episodes: response.data
        })
      })
      .catch(error => {
        console.log("Error while reteriving Episodes!!");
        console.log(error);
      })
  }

  //5- loadImageGallries
  loadImageGalleries = () => {
    // axios.get(`${process.env.REACT_APP_BACK_END_URL}imagegallery/index`)
    axios.get("/favone/imagegallery/index")
      .then(response => {
        console.log(response);
        this.setState({
          imageGalleries: response.data
        })
      })
      .catch(error => {
        console.log("Error while reteriving imageGallries!!");
        console.log(error);
      })
  }

  render() {
    const { isAuth, isSectionsShow } = this.state;

    return (


      <Router>
        <nav>
          <div>
          </div>

          {isAuth ? (
            <Navbar collapseOnSelect expand="lg" variant="dark" className="bg-gray-800 shadow">
              <Navbar.Brand ><Link to="/" onClick={this.showSectionsHandler} className="text-gray-200 ml-5 mr-11 text-2xl hover:text-pink-600"><span className="material-icons">star</span>FaveOne</Link></Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <NavDropdown title="Movies - Dramas" id="collasible-nav-dropdown" className="mr-11 text-xl">
                    <NavDropdown.Item ><Link to="/movieDramaIndex" onClick={this.hideSectionsHandler} className="dropDownLink"> Movies - Dramas</Link></NavDropdown.Item>
                    <NavDropdown.Item ><Link to="/imageGalleryIndex" onClick={this.hideSectionsHandler} className="dropDownLink"> Image Galleries</Link></NavDropdown.Item>
                    <NavDropdown.Item ><Link to="/genderIndex" onClick={this.hideSectionsHandler} className="dropDownLink"> Catagories</Link></NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item ><Link to="/addMovieDrama" onClick={this.hideSectionsHandler} className="dropDownLink">Add Movie - Drama</Link></NavDropdown.Item>
                    <NavDropdown.Item ><Link to="/addImageGallery" onClick={this.hideSectionsHandler} className="dropDownLink"> Add Image Gallery</Link></NavDropdown.Item>

                  </NavDropdown>

                  <NavDropdown title="Episodes" id="collasible-nav-dropdown" className="mr-11 text-xl">
                    <NavDropdown.Item ><Link to="/episodeIndex" onClick={this.hideSectionsHandler} className="dropDownLink"> Episodes</Link></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item ><Link to="/addEpisode" onClick={this.hideSectionsHandler} className="dropDownLink">Add Episode</Link></NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Actors" id="collasible-nav-dropdown" className="mr-11 text-xl">
                    <NavDropdown.Item ><Link to="/actorIndex" onClick={this.hideSectionsHandler} className="dropDownLink"> Actors</Link></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item ><Link to="/addActor" onClick={this.hideSectionsHandler} className="dropDownLink">Add Actor</Link></NavDropdown.Item>
                  </NavDropdown>

                  <SearchBar value={this.state.filterValue} onChange={this.handleFilterChange}></SearchBar>

                </Nav>
                <Nav className="mr-5">
                  {this.state.user ? <Navbar.Text className="mr-5" > <span className="text-blue-500">Signed in as: </span><Link to="/changePassword" onClick={this.hideSectionsHandler}> <span>{this.state.user.sub}</span></Link></Navbar.Text> : null}

                  <Nav.Link > <Link to="/logout" onClick={this.onLogoutHandeler} className="mr-5 text-gray-200 hover:text-pink-600 text-xl">Say Bye</Link></Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          ) : (
              <Navbar collapseOnSelect expand="lg" variant="dark" className="bg-gray-800 shadow">
                <Navbar.Brand ><Link to="/" onClick={this.showSectionsHandler} className="text-gray-200 ml-5 mr-11 text-2xl hover:text-pink-600"><span className="material-icons">star</span>FaveOne</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto">
                    <NavDropdown title="Movies - Dramas" id="collasible-nav-dropdown" className="mr-11 text-xl">
                      <NavDropdown.Item ><Link to="/movieDramaIndex" onClick={this.hideSectionsHandler} className="dropDownLink"> Movies - Dramas</Link></NavDropdown.Item>
                      <NavDropdown.Item ><Link to="/imageGalleryIndex" onClick={this.hideSectionsHandler} className="dropDownLink"> Image Galleries</Link></NavDropdown.Item>
                      <NavDropdown.Item ><Link to="/genderIndex" onClick={this.hideSectionsHandler} className="dropDownLink"> Catagories</Link></NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Episodes" id="collasible-nav-dropdown" className="mr-11 text-xl">
                      <NavDropdown.Item ><Link to="/episodeIndex" onClick={this.hideSectionsHandler} className="dropDownLink"> Episodes</Link></NavDropdown.Item>

                    </NavDropdown>
                    <NavDropdown title="Actors" id="collasible-nav-dropdown" className="mr-11 text-xl">
                      <NavDropdown.Item ><Link to="/actorIndex" onClick={this.hideSectionsHandler} onClick={this.hideSectionsHandler} className="dropDownLink"> Actors</Link></NavDropdown.Item>
                    </NavDropdown>

                    <SearchBar value={this.state.filterValue} onChange={this.handleFilterChange}></SearchBar>

                  </Nav>
                  <Nav className="mr-5">
                    <Nav.Link > <Link to="/register" onClick={this.hideSectionsHandler} className="text-gray-200 hover:text-pink-600 text-xl">Join</Link></Nav.Link>
                    <Nav.Link >  <Link to="/login" onClick={this.hideSectionsHandler} className=" text-gray-200 hover:text-pink-600 text-xl">Login</Link></Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            )}
        </nav>

        <HomeBanner></HomeBanner>
        {isSectionsShow ? (
          <div>
            <MovieDramaSection moviesDramas={this.state.moviesDramas} hide={this.hideSectionsHandler}></MovieDramaSection>
            <ActorSection actors={this.state.actors} loadActors={this.loadActors} hide={this.hideSectionsHandler} ></ActorSection>
            <EpisodeSection episodes={this.state.episodes} moviesDramas={this.state.moviesDramas} hide={this.hideSectionsHandler}></EpisodeSection>
            <Footer></Footer>
          </div>
        ) : null}

        <div>
          <Route path="/register" component={() => <Join register={this.registerHandler}  ></Join>}></Route>
          <Route path="/login" component={() => <Login login={this.loginHandler} show={this.showSectionsHandler} />}></Route>
          <Route path="/changePassword" component={() => <ChangePassword user={this.state.user} changePassword={this.changePasswordHandler} show={this.showSectionsHandler} />}></Route>


          <Route path="/actorIndex" component={() => <ActorIndex actors={this.state.actors} isAuth={this.state.isAuth} loadActors={this.loadActors} hide={this.hideSectionsHandler}></ActorIndex>}></Route>
          <Route path="/genderIndex" component={() => <GenderIndex genders={this.state.genders} isAuth={this.state.isAuth} loadGenders={this.loadGenders} addGender={this.addGenderHandler}></GenderIndex>}></Route>
          {this.state.user !== null ?
            <Route path="/movieDramaIndex" component={() => <MDIndex emailAddress={this.state.user.sub} moviesDramas={this.state.moviesDramas} episodes={this.state.episodes} actors={this.state.actors} genders={this.state.genders} imageGalleries={this.state.imageGalleries} isAuth={this.state.isAuth} loadMoviesDramas={this.loadMoviesDramas} loadActors={this.loadActors} loadEpisodes={this.loadEpisodes} loadImageGalleries={this.loadImageGalleries} hide={this.hideSectionsHandler}></MDIndex>}></Route>
            :
            <Route path="/movieDramaIndex" component={() => <MDIndex moviesDramas={this.state.moviesDramas} episodes={this.state.episodes} actors={this.state.actors} genders={this.state.genders} imageGalleries={this.state.imageGalleries} isAuth={this.state.isAuth} loadMoviesDramas={this.loadMoviesDramas} loadActors={this.loadActors} loadEpisodes={this.loadEpisodes} loadImageGalleries={this.loadImageGalleries} hide={this.hideSectionsHandler}></MDIndex>}></Route>

          }
          <Route path="/episodeIndex" component={() => <EpisodeIndex episodes={this.state.episodes} moviesDramas={this.state.moviesDramas} isAuth={this.state.isAuth} loadEpisodes={this.loadEpisodes} loadMoviesDramas={this.loadMoviesDramas}></EpisodeIndex>}></Route>
          <Route path="/imageGalleryIndex" component={() => <ImageGalleryIndex imageGalleries={this.state.imageGalleries} moviesDramas={this.state.moviesDramas} isAuth={this.state.isAuth} loadImageGalleries={this.loadImageGalleries} loadMoviesDramas={this.loadMoviesDramas}></ImageGalleryIndex>}></Route>



          <Route path="/addActor" component={() => <NewActor addActor={this.addActorHandler} show={this.showSectionsHandler}></NewActor>}></Route>
          <Route path="/addMovieDrama" component={() => <NewMD user={this.state.user} addMD={this.addMovieDramaHandler} actors={this.state.actors} genders={this.state.genders} show={this.showSectionsHandler} ></NewMD>}></Route>
          <Route path="/addEpisode" component={() => <NewEpisode addEpisode={this.addEpisodeHandler} moviesDramas={this.state.moviesDramas} show={this.showSectionsHandler}></NewEpisode>}></Route>
          <Route path="/addImageGallery" component={() => <NewImageGallery addImageGallery={this.addImageGalleryHandler} moviesDramas={this.state.moviesDramas} show={this.showSectionsHandler}></NewImageGallery>}></Route>


        </div>
      </Router>
    )
  }
}

