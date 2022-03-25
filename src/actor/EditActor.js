import React, { Component } from "react";
import swal from "sweetalert";
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
import CancelIcon from '@material-ui/icons/Cancel';
import Swal from "sweetalert2";

export default class EditActor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actor: props.actor,
      open: false,
    };
  }
  changeHandler = (e) => {
    const attributeToChange = e.target.name;

    const newValue = e.target.value;

    const updatedActor = { ...this.state.actor };
    updatedActor[attributeToChange] = newValue;
    // console.log(updatedActor);

    this.setState({
      actor: updatedActor,
    });
  };

  handleSubmit = () => {
    if (this.validate()) {
      Swal.fire({
        title: "Do you want to save the changes?",
        showCancelButton: true,
        confirmButtonText: `Save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.props.editActor(this.state.actor);
          Swal.fire("Saved!", "The actor has been changed.", "success");
        }
      });
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
    this.props.editView(0);
  };

  validate = () => {
    var fullName = document.getElementById("fullName").value;
    var dateOfBirth = document.getElementById("dateOfBirth").value;
    var gender = document.getElementById("gender").value;
    var biography = document.getElementById("biography").value;
    var picture = document.getElementById("picture").value;
    var socialAccount = document.getElementById("socialAccount").value;

    if (
      fullName === "" ||
      dateOfBirth === "" ||
      gender === "" ||
      biography === "" ||
      picture === "" ||
      socialAccount === ""
    ) {
      swal("Empty!!", "Some Feilds are empty!", "error");
      return false;
    } else {
      return true;
    }
  };

  render() {
    return (
      <div className=" pt-4">
        <div className="md:w-2/4 mb-5 p-5">
          <div className="flex flex-col  items-center  rounded-3xl formBG">

            <div className="flex flex-row h-16 justify-center items-center  w-full rounded-3xl">
              <h2 className="text-center text-pink-600 pt-2 opacity-75 	 text-xl md:text-2xl mb-3">
               Edit actor information
              </h2>
              <CancelIcon onClick={this.handleClickCancel} fontSize="large" className="rounded-full bg-pink-700 md:transform md:translate-x-48 md:-translate-y-4 cursor-pointer" />
            </div>
            <Tooltip title="Actor's name">
              <TextField
                id="fullName"
                label="Full Name"
                type="text"
                name="fullName"
                value={this.state.actor.fullName}
                onChange={this.changeHandler}
                className="w-56 md:w-96 mb-3"
                color="primary"
              />
            </Tooltip>

            <Tooltip title="Date Of Birth">
              <TextField
                id="dateOfBirth"
                type="date"
                name="dateOfBirth"
                value={this.state.actor.dateOfBirth}
                onChange={this.changeHandler}
                className="w-56 md:w-96 mb-3"
                color="primary"
              />
            </Tooltip>

            <Tooltip title="Actor's gender">
              <FormControl className="w-56 md:w-96 mb-3">
                <InputLabel shrink id="label-of-gender">
                  Gender
                </InputLabel>
                <Select
                  labelId="label-of-gender"
                  name="gender"
                  id="gender"
                  value={this.state.actor.gender}
                  onChange={this.changeHandler}
                >
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                </Select>
              </FormControl>
            </Tooltip>

            <Tooltip title="Maximum 5000 charactor">
              <TextField
                className="w-56 md:w-96 mb-4 "
                id="biography"
                label="Biography - about the actor"
                rowsMax={4}
                multiline
                name="biography"
                value={this.state.actor.biography}
                onChange={this.changeHandler}
              />
            </Tooltip>

            <Tooltip title="Click this icon to view the actor picture">
              <TextField
                id="picture"
                label="Actor Picture URL"
                type="url"
                name="picture"
                value={this.state.actor.picture}
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
                <span className="text-xl self-center pl-2">Actor Picture</span>
                {this.state.open && (
                  <IconButton aria-label="close" onClick={this.handleClose}>
                    <CloseIcon />
                  </IconButton>
                )}
              </div>
              {this.state.actor.picture ? (
                <img src={this.state.actor.picture} />
              ) : (
                <div className="flex flex-col items-center ">
                  <InfoOutlinedIcon color="primary" />{" "}
                  <p className="m-4 text-blue-400">
                    Add the URL of the actor picture first
                  </p>
                </div>
              )}
            </Dialog>

            <Tooltip title="If the actor doesn't have any social media account add [-] sign note: don't leave it empty">
              <TextField
                id="socialAccount"
                label="Social Account"
                type="text"
                name="socialAccount"
                value={this.state.actor.socialAccount}
                onChange={this.changeHandler}
                className="w-56 md:w-96 mb-4"
                color="primary"
              />
            </Tooltip>
            <div className=" h-16  w-full rounded-3xl  ">
              <Button
                onClick={this.handleSubmit}
                variant="contained"
                color="primary"
                className="w-full h-full"
              >
                Edit Actor
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
