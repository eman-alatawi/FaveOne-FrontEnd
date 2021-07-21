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

class NewImageGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageGallery: {
        movieDrama: {},
      },
      open: false,
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
                      {md.title}
                    </div>
                  ))}
                </FormGroup>
              </FormControl>
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
