import React, { Component } from "react";
import swal from "sweetalert";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import CancelIcon from "@material-ui/icons/Cancel";
import Swal from "sweetalert2";

export default class EditGender extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gender: props.gender,
    };
  }
  changeHandler = (e) => {
    const attributeToChange = e.target.name;

    const newValue = e.target.value;

    const updatedGender = { ...this.state.gender };
    updatedGender[attributeToChange] = newValue;
    // console.log(updatedGender);

    this.setState({
      gender: updatedGender,
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
          this.props.editGender(this.state.gender);
          Swal.fire("Saved!", "The catagory has been changed.", "success");
        }
      });
    }
  };

  validate = () => {
    var name = document.getElementById("name").value;

    if (name === "") {
      swal("Empty!!", "The Gender Name Feild is empty!", "error");
      return false;
    } else {
      return true;
    }
  };
  handleClickCancel = () => {
    this.props.editView(0);
  };

  render() {
    return (
      <div className="w-full flex justify-center">
        <div class=" flex flex-col md:w-2/4 items-center  formBG rounded-xl pt-4">
          <div className="flex flex-row h-16 justify-center items-center  w-full rounded-3xl">
            <h2 className="text-gray-200 text-center opacity-75 text-xl md:text-2xl mb-3">
              Edit Catagory
            </h2>
            <CancelIcon
              onClick={this.handleClickCancel}
              fontSize="large"
              className="rounded-full bg-pink-700 md:transform md:translate-x-64 md:-translate-y-10 cursor-pointer"
            />
          </div>

          <Tooltip title="catagories like: Action, History, ...etc ">
            <TextField
              id="name"
              label="Catagory Name"
              type="text"
              name="name"
              value={this.state.gender.name}
              onChange={this.changeHandler}
              className="w-56 md:w-96 mb-5"
              color="primary"
            />
          </Tooltip>
          <div className=" h-16  w-full rounded-3xl ">
            <Button
              onClick={this.handleSubmit}
              variant="contained"
              color="primary"
              className="w-full h-full"
            >
              Edit Catagory
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
