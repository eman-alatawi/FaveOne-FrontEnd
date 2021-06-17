import axios from "axios";
import React, { Component } from "react";
import ActorRowCard from "./ActorRowCard";
import EditActor from "./EditActor";
import Footer from "../Shared/Footer";
import { toast } from "react-toastify";

export default class ActorIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actors: props.actors,
      isEdit: false,
      actorDetail: [],
      clickedActorId: "",
    };
  }

  editView = (id) => {
    this.setState({
      isEdit: !this.state.isEdit,
      clickedActorId: id,
    });
  };

  actorDetails = (id) => {
    // axios.get(`${process.env.REACT_APP_BACK_END_URL}actor/detail`,
    axios
      .get("/favone/actor/detail", {
        params: { id: id },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("get actor details");
        console.log(response);
        this.setState({
          actorDetail: response.data,
        });

        console.log(this.state.actorDetail);
        // this.props.loadActors();
      })
      .catch((error) => {
        console.log("error in retriving actor details");
        console.log(error);
      });
  };

  editActor = (actor) => {
    // axios.put(`${process.env.REACT_APP_BACK_END_URL}actor/edit`, actor,
    axios
      .put("/favone/actor/edit", actor, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("edit actor");
        console.log(response);
        this.props.loadActors();
        this.setState({
          isEdit: false,
        });
        toast.success("Actor has been Edited Successfully!!");
      })
      .catch((error) => {
        console.log("error in editing actor");
        console.log(error);
        toast.error(
          "Error Occured while trying to Edit Actor. Please try again later"
        );
      });
  };

  deleteActor = (id) => {
    // axios.delete(`${process.env.REACT_APP_BACK_END_URL}actor/delete`,
    axios
      .delete("/favone/actor/delete", {
        params: { id: id },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("delete actor");
        console.log(response);
        this.props.loadActors();
        toast.success("Actor has been Deleted Successfully!!");
      })
      .catch((error) => {
        console.log("error in deleting actor");
        console.log(error);
        toast.error("Error Occured while trying to Delete Actor.");
        toast.info("You're not allowed to delete");
      });
  };
  render() {
    return (
      <div className=" mainBg bg-cover ">
        <div className=" w-full ">
          {/* show all actors if the user didn't click the Edit icon - by default show the ActorRowCard */}
          {!this.state.isEdit && (
            <div>
              <div className="h-full w-full  ">
                <h3 className=" my-12  text-center text-gray-900 text-3xl opacity-75">
                  All Actors
                </h3>
              </div>
              <div className="h-full w-full pl-11  inline-grid grid-cols-5 gap-x-2  gap-y-10 mb-5">
                {this.state.actors.map((actor, index) => (
                  <div key={index}>
                    <ActorRowCard
                      actor={actor}
                      isAuth={this.props.isAuth}
                      editView={this.editView}
                      deleteActor={this.deleteActor}
                    ></ActorRowCard>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* if the user click the edit icon - show the EditActor [we need to loop again using map to know the clickedActorId by user and the actor.id in actors ] */}
          {this.state.actors.map((actor, index) => (
            <div key={index}>
              {this.state.isEdit && this.state.clickedActorId === actor.id && (
                <EditActor
                  actor={actor}
                  editView={this.editView}
                  editActor={this.editActor}
                ></EditActor>
              )}
            </div>
          ))}
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
