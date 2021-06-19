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
      this.props.editActor(this.state.actor);
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
      <div className="formBG bg-cover pt-4">
        <div className="w-2/4 ">
          <h2 className="text-center opacity-75 text-2xl mb-3">Edit Actor</h2>
          <div className="flex flex-col  items-center pb-5">
            <Tooltip title="Actor's name">
              <TextField
                id="fullName"
                label="Full Name"
                type="text"
                name="fullName"
                value={this.state.actor.fullName}
                onChange={this.changeHandler}
                className="w-96 mb-3"
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
                className="w-96 mb-3"
                color="primary"
              />
            </Tooltip>

            <Tooltip title="Actor's gender">
              <FormControl className="w-96 mb-3">
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
                className="w-96 mb-4"
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
                className="w-96 mb-3"
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
                className="w-96 mb-4"
                color="primary"
              />
            </Tooltip>
            <div className="flex flex-col h-24 items-center justify-between ">
              <Button
                onClick={this.handleSubmit}
                variant="contained"
                color="primary"
              >
                Edit Actor
              </Button>
              <Button variant="outlined" onClick={this.handleClickCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
