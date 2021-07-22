import React, { Component } from "react";
import swal from "sweetalert";
import Footer from "../Shared/Footer";
import ReactPlayer from "react-player";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import MovieIcon from "@material-ui/icons/Movie";
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

class NewEpisode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      episode: {
        movieDrama: {},
      },
      openPoster: false,
      openVideo: false,
      openMDInfo: false,
      clickedMD: {},
    };
  }

  changeHandler = (event) => {
    const attributeToChange = event.target.name;

    const newValue = event.target.value;

    const updatedEpisode = { ...this.state.episode };
    //for adding the  movie-drama to the episode that it's related to
    if (attributeToChange === "movieDrama") {
      if (event.target.checked) {
        console.log([parseInt(newValue)]);
        updatedEpisode[attributeToChange] =
          this.props.moviesDramas[parseInt(newValue)];
      }
    } else {
      updatedEpisode[attributeToChange] = newValue;
    }

    console.log(updatedEpisode);

    this.setState({
      episode: updatedEpisode,
    });
  };

  handleSubmit = () => {
    if (this.validate()) {
      this.props.addEpisode(this.state.episode);
      this.props.history.push("/episodeIndex");
    }
  };

  validate = () => {
    var thumbnail = document.getElementById("thumbnail").value;
    var episodeVideoUrl = document.getElementById("episodeVideoUrl").value;
    var episodNum = document.getElementById("episodNum").value;
    // var movieDrama = document.getElementById("movieDrama").value;
    // console.log(movieDrama)

    var dmTilte = this.state.episode.movieDrama.title;
    var mdTotalNumOfEp = this.state.episode.movieDrama.numOfEpisods;
    var dmType = this.state.episode.movieDrama.type;

    console.log("mdTotalNumOfEp" + mdTotalNumOfEp);

    if (episodNum < 1) {
      swal("Wrong!!", "The Episode number should be 1 or more", "error");
      return false;
    }

    if (thumbnail === "" || episodeVideoUrl === "" || episodNum === "") {
      swal("Empty!!", "Some Feilds are empty!", "error");
      return false;
    } else if (episodNum > mdTotalNumOfEp) {
      swal(
        "Invalid Episod Number!!",
        `The ${dmTilte} ${dmType} have ${mdTotalNumOfEp} episodes!`,
        "error"
      );
      return false;
    } else if (JSON.stringify(this.state.episode.movieDrama) === "{}") {
      swal("Empty!!", "You should select the drama or movie title", "error");
      return false;
    } else {
      return true;
    }
  };

  handleClickOpenPoster = () => {
    this.setState({
      openPoster: true,
    });
  };
  handleClosePoster = () => {
    this.setState({
      openPoster: false,
    });
  };

  handleClickOpenVideo = () => {
    this.setState({
      openVideo: true,
    });
  };
  handleCloseVideo = () => {
    this.setState({
      openVideo: false,
    });
  };

  handleOpenMDInfo = () => {
    this.setState({
      openMDInfo: true,
    });
  };
  handleCloseMDInfo = () => {
    this.setState({
      openMDInfo: false,
    });
  };

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="formBG bg-cover pt-4">
        <div class="w-full mb-5 ">
          <h2 className="text-center md:w-2/4 opacity-75 text-xl md:text-2xl mb-5">
            Add New Episode{" "}
          </h2>

          <div className="flex flex-col md:flex-row  justify-between md:w-3/4 px-16">
            <div className="flex flex-col md:w-2/4 items-center">
              <Tooltip title="Click this icon to view the poster">
                <TextField
                  id="thumbnail"
                  label="Drama or Movie Thumbnail URL"
                  type="url"
                  name="thumbnail"
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
                            <ImageOutlinedIcon
                              onClick={this.handleClickOpenPoster}
                            />
                          </div>
                        </Animated>
                      </InputAdornment>
                    ),
                  }}
                />
              </Tooltip>

              {/* if click on the picture icon show a dialog of the Drama or Movie Thumbnail  */}
              <Dialog
                onClose={this.handleClosePoster}
                aria-labelledby="customized-dialog-title"
                open={this.state.openPoster}
              >
                <div
                  id="customized-dialog-title"
                  onClose={this.handleClosePoster}
                  className="flex flex-row w-full justify-between"
                >
                  <span className="text-xl self-center pl-2">
                    {" "}
                    Drama or Movie poster thumbnail{" "}
                  </span>
                  {this.state.openPoster && (
                    <IconButton
                      aria-label="close"
                      onClick={this.handleClosePoster}
                    >
                      <CloseIcon />
                    </IconButton>
                  )}
                </div>
                {this.state.episode.thumbnail ? (
                  <img src={this.state.episode.thumbnail} />
                ) : (
                  <div className="flex flex-col items-center ">
                    <InfoOutlinedIcon color="primary" />{" "}
                    <p className="m-4 text-blue-400">
                      Add the URL of the drama or the movie poster first
                    </p>
                  </div>
                )}
              </Dialog>

              <Tooltip title="Click this icon to view the video of the episode">
                <TextField
                  id="episodeVideoUrl"
                  label="Episode Video URL"
                  type="url"
                  name="episodeVideoUrl"
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
                            <MovieIcon onClick={this.handleClickOpenVideo} />
                          </div>
                        </Animated>
                      </InputAdornment>
                    ),
                  }}
                />
              </Tooltip>

              {/* if click on the picture icon show a dialog of the Drama or Movie  episode video  */}
              <Dialog
                onClose={this.handleCloseVideo}
                aria-labelledby="customized-dialog-title"
                open={this.state.openVideo}
              >
                <div
                  id="customized-dialog-title"
                  onClose={this.handleCloseVideo}
                  className="flex flex-row w-full justify-between"
                >
                  <span className="text-xl self-center pl-2">
                    {" "}
                    Episode Video{" "}
                  </span>
                  {this.state.openVideo && (
                    <IconButton
                      aria-label="close"
                      onClick={this.handleCloseVideo}
                    >
                      <CloseIcon />
                    </IconButton>
                  )}
                </div>
                {this.state.openVideo && this.state.episode.episodeVideoUrl ? (
                  <ReactPlayer
                    url={this.state.episode.episodeVideoUrl}
                    controls={true}
                    width="500px"
                    height="375px"
                  />
                ) : (
                  <Tooltip title="You can Include the URL of any video in these platforms: YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud, and DailyMotion.">
                    <div className="flex flex-col items-center ">
                      <InfoOutlinedIcon color="primary" />{" "}
                      <p className="m-4 text-blue-400">
                        Add the URL of the episode video first
                      </p>
                    </div>
                  </Tooltip>
                )}
              </Dialog>

              <Tooltip
                title={`${this.state.episode.movieDrama.title} ${this.state.episode.movieDrama.type} has ${this.state.episode.movieDrama.numOfEpisods} total episodes `}
              >
                <TextField
                  id="episodNum"
                  label="Episod Number"
                  type="number"
                  name="episodNum"
                  onChange={this.changeHandler}
                  className="w-56 md:w-96 mb-3"
                  color="primary"
                />
              </Tooltip>
            </div>
            <div className="flex flex-col md:w-2/4 bg-white rounded-r-lg px-6 pt-4">
              <FormControl component="fieldset">
                <Tooltip title="Scroll horizontally for more">
                  <FormLabel component="legend">Movie or Drama Title</FormLabel>
                </Tooltip>
                <FormGroup className="my-2 grid  gap-x-10  gap-y-3 h-56 overflow-auto ">
                  {this.props.moviesDramas.map((md, index) => (
                    <div>
                      <input
                        id="movieDrama"
                        className="mr-3"
                        type="radio"
                        name="movieDrama"
                        value={index}
                        onChange={this.changeHandler}
                      />

                      <span
                        onClick={() => {
                          this.setState({
                            clickedMD: md,
                          });
                          this.handleOpenMDInfo();
                        }}
                        className="cursor-pointer"
                      >
                        {md.title}
                      </span>
                    </div>
                  ))}
                </FormGroup>
              </FormControl>
              {/* Dialog for the clicked movie/drama with information */}
              <Dialog
                onClose={this.handleCloseMDInfo}
                aria-labelledby="customized-dialog-title"
                open={this.state.openMDInfo}
              >
                <div
                  id="customized-dialog-title"
                  onClose={this.handleCloseMDInfo}
                  className="flex flex-row w-full justify-between shadow-lg"
                >
                  <span className="text-xl self-center pl-3 font-bold">
                    {`About The ${this.state.clickedMD.type}`}
                  </span>
                  {this.state.openMDInfo && (
                    <IconButton
                      aria-label="close"
                      onClick={this.handleCloseMDInfo}
                    >
                      <CloseIcon />
                    </IconButton>
                  )}
                </div>
                <Card className="flex">
                  <div className="flex flex-col">
                    <CardContent className="flex flex-col">
                      <Typography component="h5" variant="h5">
                        {this.state.clickedMD.title}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {this.state.clickedMD.releaseYear}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        className="mb-2"
                      >
                        {this.state.clickedMD.type}
                      </Typography>
                      <div>
                        <Typography
                          variant="subtitle1"
                          className="bg-gray-100 mb-2"
                        >
                          Related Episodes
                        </Typography>

                        <ul className="h-32  overflow-auto whitespace-normal px-2">
                          {this.state.clickedMD.episodes &&
                          this.state.clickedMD.episodes.length != 0 ? (
                            this.state.clickedMD.episodes
                              .sort((a, b) => a.episodNum - b.episodNum)
                              .map((episode, index) => (
                                <li
                                  key={index}
                                  className="text-gray-400 list-disc ml-2"
                                >
                                  {`Episode ${episode.episodNum}`}
                                </li>
                              ))
                          ) : (
                            <Typography
                              variant="subtitle2"
                              color="textSecondary"
                            >
                              No episodes yet
                            </Typography>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                  </div>
                  <CardMedia
                    className="w-52 h-52 md:w-80 md:h-80 shadow-lg"
                    image={this.state.clickedMD.poster}
                  />
                </Card>
              </Dialog>
            </div>
          </div>

          <div className="flex flex-col md:w-2/4 h-24 items-center justify-between ">
            <Button
              onClick={this.handleSubmit}
              variant="contained"
              color="primary"
            >
              Add Episode
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
export default withRouter(NewEpisode);
