import React, { Component } from "react";
import swal from "sweetalert";
import Footer from "../Shared/Footer";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
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
class NewImageGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageGallery: {
        movieDrama: {},
      },
      open: false,
      openMDInfo: false,
      clickedMD: {},
    };
  }

  changeHandler = (event) => {
    const attributeToChange = event.target.name;

    const newValue = event.target.value;

    const updatedImageGalley = { ...this.state.imageGallery };
    //for adding the  movie-drama to the image Galley that it's related to
    if (attributeToChange === "movieDrama") {
      if (event.target.checked) {
        // console.log([parseInt(newValue)]);
        updatedImageGalley[attributeToChange] =
          this.props.moviesDramas[parseInt(newValue)];
      }
    } else {
      updatedImageGalley[attributeToChange] = newValue;
    }

    // console.log(updatedImageGalley);

    this.setState({
      imageGallery: updatedImageGalley,
    });
  };

  handleSubmit = () => {
    if (this.validate()) {
      this.props.addImageGallery(this.state.imageGallery);
      this.props.history.push("/imageGalleryIndex");
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

  validate = () => {
    var imageUrl = document.getElementById("imageUrl").value;

    if (imageUrl === "") {
      swal("Empty!!", "The Image Gallery URL Feild is empty!", "error");
      return false;
    } else if (JSON.stringify(this.state.imageGallery.movieDrama) === "{}") {
      swal("Empty!!", "You should select the drama or movie title", "error");
      return false;
    } else {
      return true;
    }
  };

  render() {
    return (
      <div className="formBG bg-cover pt-4">
        <div class="w-full mb-5 ">
          <h2 className="text-center md:w-2/4 opacity-75 text-xl md:text-2xl mb-5">
            Add New Image Gallery{" "}
          </h2>
          <div className=" flex flex-col md:flex-row justify-between md:w-3/4 px-16">
            <div className="flex flex-col md:w-2/4 items-center justify-center">
              <Tooltip title="Click this icon to view the image">
                <TextField
                  id="imageUrl"
                  label="Image Gallery URL"
                  type="text"
                  name="imageUrl"
                  onChange={this.changeHandler}
                  className="w-56 md:w-96 mb-5"
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
                    Image Gallery
                  </span>
                  {this.state.open ? (
                    <IconButton aria-label="close" onClick={this.handleClose}>
                      <CloseIcon />
                    </IconButton>
                  ) : null}
                </div>
                {this.state.imageGallery.imageUrl ? (
                  <img src={this.state.imageGallery.imageUrl} />
                ) : (
                  <div className="flex flex-col items-center ">
                    <InfoOutlinedIcon color="primary" />{" "}
                    <p className="m-4 text-blue-400">
                      Add the URL of the image gallery first
                    </p>
                  </div>
                )}
              </Dialog>
            </div>
            <div className="flex flex-col md:w-2/4 bg-white rounded-r-lg px-6 pt-2">
              <FormControl component="fieldset">
                <Tooltip title="Scroll horizontally for more">
                  <FormLabel component="legend">Movie or Drama Title</FormLabel>
                </Tooltip>
                <FormGroup className="my-3 grid  gap-x-10  gap-y-2 h-48 overflow-auto ">
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
                          Related Image Galleries
                        </Typography>

                        <ul className="h-48  overflow-auto whitespace-normal px-2">
                          {this.state.clickedMD.imageGalleries &&
                          this.state.clickedMD.imageGalleries.length != 0 ? (
                            this.state.clickedMD.imageGalleries.map((imageGallery, index) => (
                                <li
                                  key={index}
                                  className="mb-2 "
                                >
                                  <img src={imageGallery.imageUrl} className="w-40 h-35"/>
                                  
                                </li>
                              ))
                          ) : (
                            <Typography
                              variant="subtitle2"
                              color="textSecondary"
                            >
                              No Images yet
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
              Add Image Gallery
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
export default withRouter(NewImageGallery);
