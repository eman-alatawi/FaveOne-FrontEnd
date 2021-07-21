import React, { Component } from "react";
import Footer from "../Shared/Footer";
import EditGender from "./EditGender";
import GenderRowCard from "./GenderRowCard";
import { toast } from "react-toastify";
import axios from "axios";
import Card from "react-bootstrap/Card";
import NewGender from "./NewGender";
import AddIcon from "@material-ui/icons/Add";

export default class GenderIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genders: props.genders,
      isEdit: false,
      isAdd: false,
      clickedGenderId: "",
    };
  }

  addView = () => {
    this.setState({
      isAdd: !this.state.isAdd,
    });
  };

  editView = (id) => {
    this.setState({
      isEdit: !this.state.isEdit,
      clickedGenderId: id,
    });
  };

  editGender = (gender) => {
    // axios.put(`${process.env.REACT_APP_BACK_END_URL}mdgender/edit`, gender,
    axios
      .put("/favone/mdgender/edit", gender, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("edit gender");
        console.log(response);
        this.props.loadGenders();
        this.setState({
          isEdit: false,
        });
        toast.success("Gender has been Edited Successfully!!");
      })
      .catch((error) => {
        console.log("error in editing gender");
        console.log(error);
        toast.error(
          "Error Occured while trying to Edit Gender. Please try again later"
        );
      });
  };

  deleteGender = (id) => {
    // axios.delete(`${process.env.REACT_APP_BACK_END_URL}mdgender/delete`,
    axios
      .delete("/favone/mdgender/delete", {
        params: { id: id },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("delete gender");
        console.log(response);
        this.props.loadGenders();
        toast.success("Gender has been Deleted Successfully!!");
      })
      .catch((error) => {
        console.log("error in deleting gender");
        console.log(error);
        toast.error("Error Occured while trying to Delete Gender.");
        toast.info("You're not allowed to delete");
      });
  };

  render() {
    return (
      <div className="genderBg pt-5 bg-cover">
        <div className="h-full w-full  ">
          <h3 className=" mb-12  text-center text-gray-900 text-3xl opacity-75 ">
            All Movie-Drama Catagories
          </h3>
        </div>
        <div className=" h-ful flex flex-col mx-5 my-10  ">
          {/* partion 1 */}
          <div className="h-full w-full flex flex-col items-center md:px-10 md:inline-grid md:grid-cols-5 md:gap-x-2  gap-y-10  mb-4">
            {this.props.isAuth && !this.state.isEdit && (
              <div>
                <Card style={{ width: "14rem" }} className="mb-3 shadow h-24">
                  <Card.Body className="text-center hover:bg-pink-700 hover:border-transparent hover:shadow-lg group border-2  border-dashed   border-gray-300">
                    <Card.Title className="group-hover:text-white">
                      New Catagory
                    </Card.Title>
                    <AddIcon
                      onClick={this.addView}
                      className="material-icons transform hover:scale-110 motion-reduce:transform-none cursor-pointer text-xl group-hover:text-white"
                    />
                  </Card.Body>
                </Card>
              </div>
            )}

            {this.state.genders.map((gender, index) => (
              <div key={index}>
                {!this.state.isAdd && !this.state.isEdit && (
                  <GenderRowCard
                    {...gender}
                    isAuth={this.props.isAuth}
                    editView={this.editView}
                    deleteGender={this.deleteGender}
                  ></GenderRowCard>
                )}
              </div>
            ))}
          </div>

          {/* partion 2 */}
          <div className=" w-full flex flex-col justify-center h-2/4 ">
            {this.state.genders.map((gender, index) => (
              <div key={index}>
                {this.state.isEdit &&
                this.state.clickedGenderId === gender.id && (
                  <EditGender
                    gender={gender}
                    editView={this.editView}
                    editGender={this.editGender}
                  ></EditGender>
                )}
              </div>
            ))}

            {this.state.isAdd && (
              <NewGender
                addGender={this.props.addGender}
                addView={this.addView}
              ></NewGender>
            )}
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
