import axios from "axios";
import React, { Component } from "react";
import Footer from "../Shared/Footer";
import EditEpisode from "./EditEpisode";
import EpisodeRowCard from "./EpisodeRowCard";
import { toast } from "react-toastify";

export default class EpisodeIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      episodes: props.episodes,
      isEdit: false,
      episodeDetail: [],
      clickedEpisodeId: "",
    };
  }

  editView = (id) => {
    this.setState({
      isEdit: !this.state.isEdit,
      clickedEpisodeId: id,
    });
  };

  episodeDetails = (id) => {
    // axios.get(`${process.env.REACT_APP_BACK_END_URL}episode/detail`,
    axios
      .get("/favone/episode/detail", {
        params: { id: id },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("get Episode details");
        console.log(response);
        this.setState({
          episodeDetail: response.data,
        });

        console.log(this.state.episodeDetail);
      })
      .catch((error) => {
        console.log("error in retriving Episode details");
        console.log(error);
      });
  };

  editEpisode = (episode) => {
    // axios.put(`${process.env.REACT_APP_BACK_END_URL}episode/edit`, episode,
    axios
      .put("/favone/episode/edit", episode, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("edit episode");
        console.log(response);
        this.props.loadEpisodes();
        this.props.loadMoviesDramas();
        this.setState({
          isEdit: false,
        });
        toast.success("Episode has been Edited Successfully!!");
      })
      .catch((error) => {
        console.log("error in editing Episode");
        console.log(error);
        toast.error(
          "Error Occured while trying to Edit Episode. Please try again later"
        );
      });
  };

  deleteEpisode = (id) => {
    // axios.delete(`${process.env.REACT_APP_BACK_END_URL}episode/delete`,
    axios
      .delete("/favone/episode/delete", {
        params: { id: id },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("delete episode");
        console.log(response);
        this.props.loadEpisodes();
        toast.success("Episode has been Deleted Successfully!!");
      })
      .catch((error) => {
        console.log("error in deleting Episode");
        console.log(error);
        toast.error("Error Occured while trying to Delete Episode.");
        toast.info("You're not allowed to delete");
      });
  };
  render() {
    return (
      <div className=" mainBg bg-cover ">
        <div className="w-full ">
          {/* show all Episodes if the user didn't click the Edit icon - by default show the EpisodeRowCard */}
          {!this.state.isEdit && (
            <div>
              <div className="h-full w-full  ">
                <h3 className=" my-12  text-center text-gray-900 text-3xl opacity-75">
                  All Episodes
                </h3>
              </div>
              <div className="h-full w-full flex flex-col items-center md:px-10 md:inline-grid md:grid-cols-5 md:gap-x-2  gap-y-10  mb-4">
                {this.state.episodes.map((episode, index) => (
                  <div key={index}>
                    <EpisodeRowCard
                      episode={episode}
                      moviesDramas={this.props.moviesDramas}
                      isAuth={this.props.isAuth}
                      editView={this.editView}
                      deleteEpisode={this.deleteEpisode}
                    ></EpisodeRowCard>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* if the user click the edit icon - show the EditEpisode [we need to loop again using map to know the clickedEpisodeId by user and the episode.id in episodes ] */}
          {this.state.episodes.map((episode, index) => (
            <div key={index} className="h-full">
              {this.state.isEdit &&
              this.state.clickedEpisodeId === episode.id && (
                <EditEpisode
                  episode={episode}
                  editView={this.editView}
                  loadEpisodes={this.props.loadEpisodes}
                  moviesDramas={this.props.moviesDramas}
                  editEpisode={this.editEpisode}
                ></EditEpisode>
              )}
            </div>
          ))}
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
