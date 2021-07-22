import React, { Component } from "react";
import swal from "sweetalert";
import Footer from "../Shared/Footer";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import { Animated } from "react-animated-css";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
class NewMD extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      movieDrama: {
        actors: [],
        genders: [],
        user: null,
      },
      open: false,
      openActorInfo: false,
      clickedActor: {},
    };
  }
  componentDidMount() {
    this.loadUser(this.props.user.sub);
  }
  changeHandler = (event) => {
    const attributeToChange = event.target.name;

    const newValue = event.target.value;

    const updatedMD = { ...this.state.movieDrama };
    //for actors
    if (attributeToChange === "actors") {
      if (event.target.checked) {
        // console.log(newValue);
        // console.log(this.props.actors[parseInt(newValue)]);
        updatedMD[attributeToChange].push(
          this.props.actors[parseInt(newValue)]
        );
      } else {
        updatedMD[attributeToChange].splice(
          updatedMD[attributeToChange].findIndex(
            (x) => x.id == this.props.actors[parseInt(newValue)].id
          ),
          1
        );
      }
    } else if (attributeToChange === "genders") {
      if (event.target.checked) {
        // console.log(newValue);
        // console.log(this.props.genders[parseInt(newValue)]);
        updatedMD[attributeToChange].push(
          this.props.genders[parseInt(newValue)]
        );
      } else {
        updatedMD[attributeToChange].splice(
          updatedMD[attributeToChange].findIndex(
            (x) => x.id == this.props.genders[parseInt(newValue)].id
          ),
          1
        );
      }
    } else {
      updatedMD[attributeToChange] = newValue;
    }

    // console.log(updatedMD);

    this.setState({
      movieDrama: updatedMD,
    });
  };

  loadUser = (emailAddress) => {
    // axios.get(`${process.env.REACT_APP_BACK_END_URL}user/userProfile`,
    axios
      .get("/favone/user/userProfile", {
        params: { emailAddress: emailAddress },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("get user profile");
        console.log(response);

        this.setState({
          user: response.data,
        });
        this.addUserToMD();
      })
      .catch((error) => {
        console.log("Error while retriving user profile!!");
        console.log(error);
      });
  };

  addUserToMD = () => {
    const updatedMD = this.state.movieDrama;
    updatedMD["user"] = this.state.user;
    this.setState({
      movieDrama: updatedMD,
    });
  };

  handleSubmit = () => {
    if (this.validate()) {
      this.props.addMD(this.state.movieDrama);
      this.props.history.push("/movieDramaIndex");
    }
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleOpenActorInfo = () => {
    this.setState({
      openActorInfo: true,
    });
  };
  handleCloseActorInfo = () => {
    this.setState({
      openActorInfo: false,
    });
  };

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  validate = () => {
    var title = document.getElementById("title").value;
    var releaseYear = document.getElementById("releaseYear").value;
    var type = document.getElementById("type").value;
    var description = document.getElementById("description").value;
    var poster = document.getElementById("poster").value;
    var duration = document.getElementById("duration").value;
    var numOfEpisods = document.getElementById("numOfEpisods").value;
    var contentRating = document.getElementById("contentRating").value;
    var score = document.getElementById("score").value;

    if (
      title === "" ||
      releaseYear === "" ||
      type === "" ||
      description === "" ||
      poster === "" ||
      duration === "" ||
      numOfEpisods === "" ||
      contentRating === "" ||
      score === ""
    ) {
      swal("Empty!!", "Some Feilds are empty!", "error");
      return false;
    } else if (JSON.stringify(this.state.movieDrama.actors) === "[]") {
      swal(
        "Empty!!",
        "You should select actors of the drama or movie ",
        "error"
      );
      return false;
    } else if (numOfEpisods < 1) {
      swal("Wrong!!", "Number of Episodes should be 1 or more", "error");
      return false;
    } else if (score < 0 || score > 10) {
      swal("Wrong!!", "The score should be from 0 to 10", "error");
      return false;
    } else if (JSON.stringify(this.state.movieDrama.genders) === "[]") {
      swal(
        "Empty!!",
        "You should select catagory of the drama or movie ",
        "error"
      );
      return false;
    } else {
      return true;
    }
  };

  render() {
    return (
      <div className="formBG bg-cover pt-4">
        <div className="w-full mb-5 ">
          <h2 className="text-center md:w-2/4  opacity-75 text-xl md:text-2xl mb-4">
            Add New Movie - Drama{" "}
          </h2>

          <div className="flex flex-col md:flex-row  justify-between md:w-3/4 px-16">
            <div className="flex flex-col md:w-2/4 items-center">
              <Tooltip title="Movie or Drama title">
                <TextField
                  id="title"
                  label="Title"
                  type="text"
                  name="title"
                  onChange={this.changeHandler}
                  className="w-56 md:w-96 mb-3"
                  color="primary"
                />
              </Tooltip>

              <Tooltip title="Release Date">
                <TextField
                  id="releaseYear"
                  type="date"
                  name="releaseYear"
                  onChange={this.changeHandler}
                  className="w-56 md:w-96 mb-3"
                  color="primary"
                />
              </Tooltip>

              <Tooltip title="Movie or Drama Type">
                <FormControl className="w-56 md:w-96 mb-3">
                  <InputLabel id="label-of-type">Type</InputLabel>
                  <Select
                    labelId="label-of-type"
                    name="type"
                    id="type"
                    onChange={this.changeHandler}
                  >
                    <MenuItem value="Movie">Movie</MenuItem>
                    <MenuItem value="Drama">Drama</MenuItem>
                  </Select>
                </FormControl>
              </Tooltip>

              <Tooltip title="Maximum 5000 charactor">
                <TextField
                  className="w-56 md:w-96 mb-4"
                  id="description"
                  label="Description"
                  rowsMax={4}
                  multiline
                  name="description"
                  onChange={this.changeHandler}
                />
              </Tooltip>

              <Tooltip title="Click this icon to view the poster">
                <TextField
                  id="poster"
                  label="Poster URL"
                  type="url"
                  name="poster"
                  onChange={this.changeHandler}
                  className="w-56 md:w-96 mb-3"
                  color="primary"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Animated
                          animationIn="tada"
                          animationInDuration={8000}
                          isVisible={true}
                        >
                          <div className=" cursor-pointer transform hover:scale-110 motion-reduce:transform-none">
                            <ImageOutlinedIcon onClick={this.handleClickOpen} />
                          </div>
                        </Animated>
                      </InputAdornment>
                    ),
                  }}
                />
              </Tooltip>

              {/* if click on the picture icon show a dialog of the actor picture  */}
              <Dialog
                onClose={this.handleClose}
                aria-labelledby="customized-dialog-title"
                open={this.state.open}
              >
                <div
                  id="customized-dialog-title"
                  onClose={this.handleClose}
                  className="flex flex-row w-full justify-between"
                >
                  <span className="text-xl self-center pl-2">
                    Movie or Drama Poster
                  </span>
                  {this.state.open && (
                    <IconButton aria-label="close" onClick={this.handleClose}>
                      <CloseIcon />
                    </IconButton>
                  )}
                </div>
                {this.state.movieDrama.poster ? (
                  <img src={this.state.movieDrama.poster} />
                ) : (
                  <div className="flex flex-col items-center ">
                    <InfoOutlinedIcon color="primary" />{" "}
                    <p className="m-4 text-blue-400">
                      Add the URL of the drama or the movie poster first
                    </p>
                  </div>
                )}
              </Dialog>

              <Tooltip title="ex: 1 hour 30 min">
                <TextField
                  id="duration"
                  label="Duration"
                  type="text"
                  name="duration"
                  onChange={this.changeHandler}
                  className="w-56 md:w-96 mb-3"
                  color="primary"
                />
              </Tooltip>

              <Tooltip title="For movie choose 1 episode">
                <TextField
                  id="numOfEpisods"
                  label="Total number of Episods"
                  type="number"
                  name="numOfEpisods"
                  onChange={this.changeHandler}
                  className="w-56 md:w-96 mb-3"
                  color="primary"
                />
              </Tooltip>

              <Tooltip title="Movie or Drama Rate">
                <FormControl className="w-56 md:w-96 mb-3">
                  <InputLabel id="label-of-rate">Content Rating</InputLabel>
                  <Select
                    labelId="label-of-rate"
                    name="contentRating"
                    id="contentRating"
                    onChange={this.changeHandler}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="+13">+13</MenuItem>
                    <MenuItem value="+15">+15</MenuItem>
                    <MenuItem value="+17">+17</MenuItem>
                    <MenuItem value="All Ages">All Ages</MenuItem>
                    <MenuItem value="Not Yet Rated">Not Yet Rated</MenuItem>
                  </Select>
                </FormControl>
              </Tooltip>

              <Tooltip title="ex: 9.6">
                <TextField
                  id="score"
                  label="Score"
                  type="text"
                  name="score"
                  onChange={this.changeHandler}
                  className="w-56 md:w-96 mb-5"
                  color="primary"
                />
              </Tooltip>
            </div>

            <div className="flex flex-col md:w-2/4 bg-white rounded-r-lg px-6 pt-4 justify-evenly">
              <FormControl component="fieldset" className="mb-3">
                <Tooltip title="Scroll horizontally for more">
                  <FormLabel component="legend">Actors - Cast</FormLabel>
                </Tooltip>
                <FormGroup className="mt-2 items-start grid  md:gap-x-16  md:gap-y-3 h-56 overflow-auto ">
                  {this.props.actors.map((actor, index) => (
                    <>
                      <div className="mr-4 mb-3">
                        <input
                          className="mr-2"
                          type="checkbox"
                          name="actors"
                          value={index}
                          onChange={this.changeHandler}
                        />
                        <span
                          onClick={() => {
                            this.setState({
                              clickedActor: actor,
                            });
                            this.handleOpenActorInfo();
                          }}
                          className="cursor-pointer"
                        >
                          {actor.fullName}
                        </span>
                      </div>
                    </>
                  ))}
                </FormGroup>
              </FormControl>

              {/* Dialog for the clicked actor with information */}
              <Dialog
                onClose={this.handleCloseActorInfo}
                aria-labelledby="customized-dialog-title"
                open={this.state.openActorInfo}
              >
                <div
                  id="customized-dialog-title"
                  onClose={this.handleCloseActorInfo}
                  className="flex flex-row w-full justify-between shadow-lg"
                >
                  <span className="text-xl self-center pl-3 font-bold">
                    About The Actor
                  </span>
                  {this.state.openActorInfo && (
                    <IconButton
                      aria-label="close"
                      onClick={this.handleCloseActorInfo}
                    >
                      <CloseIcon />
                    </IconButton>
                  )}
                </div>
                <Card className="flex">
                  <div className="flex flex-col">
                    <CardContent className="flex flex-col">
                      <Typography component="h5" variant="h5">
                        {this.state.clickedActor.fullName}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {this.state.clickedActor.dateOfBirth}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        className="mb-2"
                      >
                        {this.state.clickedActor.gender}
                      </Typography>
                      <div>
                        <Typography
                          variant="subtitle1"
                          className="bg-gray-100 mb-2"
                        >
                          Related drama or movie
                        </Typography>

                        <ul className="h-32  overflow-auto whitespace-normal px-2">
                          {this.state.clickedActor.movieDramas &&
                          this.state.clickedActor.movieDramas.length != 0 ? (
                            this.state.clickedActor.movieDramas.map(
                              (md, index) => (
                                <li
                                  key={index}
                                  className="text-gray-400 list-disc ml-2"
                                >
                                  {md.title}
                                </li>
                              )
                            )
                          ) : (
                            <Typography
                              variant="subtitle2"
                              color="textSecondary"
                            >
                              No movies or dramas yet
                            </Typography>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                  </div>
                  <CardMedia
                    className="w-52 h-52 md:w-80 md:h-80 shadow-lg"
                    image={this.state.clickedActor.picture}
                  />
                </Card>
              </Dialog>

              <FormControl component="fieldset">
                <Tooltip title="Scroll horizontally for more">
                  <FormLabel component="legend">Genders - Catagory</FormLabel>
                </Tooltip>
                <FormGroup className="mt-2 items-start grid  md:gap-x-28  md:gap-y-3 h-56 overflow-auto ">
                  {this.props.genders.map((gender, index) => (
                    <div className="mr-3 mb-3">
                      <input
                        className="mr-2"
                        type="checkbox"
                        name="genders"
                        value={index}
                        onChange={this.changeHandler}
                      />
                      {gender.name}
                    </div>
                  ))}
                </FormGroup>
              </FormControl>
            </div>
          </div>
          <div className="flex flex-col md:w-2/4 h-24 items-center justify-between">
            <Button
              onClick={this.handleSubmit}
              variant="contained"
              color="primary"
            >
              Add Movie - Drama
            </Button>
            <Button variant="outlined" onClick={this.handleClickCancel}>
              Cancel
            </Button>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
export default withRouter(NewMD);
