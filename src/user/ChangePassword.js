import React, { Component } from "react";
import Footer from "../Shared/Footer";
import axios from "axios";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";

class ChangePassword extends Component {
  //craete empty state - new version
  state = {
    user: {},
  };

  componentDidMount() {
    this.loadUser(this.props.user.sub);
  }

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
      })
      .catch((error) => {
        console.log("Error while retriving user profile!!");
        console.log(error);
      });
  };

  //shortest way
  changeHandler = (e) => {
    let temp = { ...this.state.user };
    if (e.target.name === "oldPassword") {
      temp[e.target.name] = e.target.value;
    } else if (e.target.name === "password") {
      temp[e.target.name] = e.target.value;
    } else {
      temp[e.target.name] = e.target.value;
    }
    this.setState({
      user: temp,
    });
    console.log(temp);
  };

  validate = () => {
    var oldPassword = document.getElementById("oldPassword").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (oldPassword === "" || password === "" || confirmPassword === "") {
      swal("Empty!!", "Some Feilds are empty!", "error");
      return false;
    } else {
      if (password !== confirmPassword) {
        swal(
          "Miss Match!",
          "The new Password and the confirm new password do not match!",
          "error"
        );
        return false;
      } else {
        return true;
      }
    }
  };

  submitHandler = () => {
    if (this.validate()) {
      this.props.changePassword(this.state.user);
      this.props.history.push("/");
    }
  };

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="pt-4">
        <div class="w-full mb-5">
          <h2 className="text-center opacity-75 text-2xl mb-2">
            Change Your Account's Password
          </h2>
          <h4 className="text-xs text-center opacity-50 mb-5">
            In order to change your account's password, you should enter the
            Current password and the new password and confirm the new password
          </h4>
          <div className="flex flex-col w-4/4 items-center">
            <TextField
              id="oldPassword"
              label="Current Password"
              type="password"
              name="oldPassword"
              onChange={this.changeHandler}
              className="w-96 mb-3"
              color="primary"
            />

            <Tooltip
              title="Your password must be 8-20 characters long, contain letters and numbers, and
                                    must not contain spaces, special characters, or emoji."
            >
              <TextField
                id="password"
                label="New Password"
                type="password"
                name="password"
                onChange={this.changeHandler}
                className="w-96 mb-3"
                color="primary"
              />
            </Tooltip>

            <Tooltip title="Confirm the password, they should be matched">
              <TextField
                id="confirmPassword"
                label="Confirm New Password"
                type="password"
                name="confirmPassword"
                onChange={this.changeHandler}
                className="w-96 mb-4"
                color="primary"
              />
            </Tooltip>

            <div className="flex flex-row  w-72 justify-between">
              <Button variant="outlined" onClick={this.handleClickCancel}>
                Cancel
              </Button>

              <Button
                onClick={this.submitHandler}
                variant="contained"
                color="primary"
              >
                Change Password
              </Button>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
export default withRouter(ChangePassword);
