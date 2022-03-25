import React, { Component } from "react";
import Footer from "../Shared/Footer";
import axios from "axios";
import MDRowCard from "./MDRowCard";
import EditMD from "./EditMD";
import { toast } from "react-toastify";
import GendersList from "./GedersList";

export default class MDIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moviesDramas: props.moviesDramas,
      isEdit: false,
      isSearchByGender: false,
      mdDetail: [],
      clickedMDId: "",
      clickedGenderId: "",
      searchedMDs: [],
    };
  }
  editView = (id) => {
    this.setState({
      isEdit: !this.state.isEdit,
      clickedMDId: id,
    });
  };

  searchView = (id) => {
    this.setState({
      isSearchByGender: true,
      clickedGenderId: id,
    });
    // console.log(this.state.clickedGenderId)
    this.searchMoviesDramasByGenderHandler(id);
  };
  allBtnClicked = () => {
    this.setState({
      isSearchByGender: false,
      clickedGenderId: "",
    });
  };

  searchMoviesDramasByGenderHandler = (id) => {
    console.log("in 2nd method" + id);
    const thisGenderMoviesDramas = this.state.moviesDramas.filter(
      (movieDrama) => {
        const index = movieDrama.genders.findIndex((x) => x.id === id);
        return index != -1;
      }
    );
    this.setState({
      searchedMDs: thisGenderMoviesDramas,
    });
    console.log(thisGenderMoviesDramas);
    // console.log(this.state.searchedMDs)
  };

  mdDetails = (id) => {
    // axios.get(`${process.env.REACT_APP_BACK_END_URL}/md/detail`,
    axios
      .get("/favone//md/detail", {
        params: { id: id },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("get Movie - Drama details");
        console.log(response);
        this.setState({
          mdDetail: response.data,
        });

        console.log(this.state.mdDetail);
      })
      .catch((error) => {
        console.log("error in retriving Movie - Drama details");
        console.log(error);
      });
  };

  editMD = (movieDrama) => {
    // axios.put(`${process.env.REACT_APP_BACK_END_URL}md/edit`, movieDrama,
    axios
      .put("/favone/md/edit", movieDrama, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("edit movie-Drama");
        console.log(response);
        this.props.loadMoviesDramas();
        this.props.loadActors();

        this.setState({
          isEdit: false,
        });
        toast.success("Movie/Drama has been Edited Successfully!!");
      })
      .catch((error) => {
        console.log("error in editing movie-Drama");
        console.log(error);
        toast.error(
          "Error Occured while trying to Edit Movie/Drama. Please try again later"
        );
      });
  };

  deleteMD = (id) => {
    // axios.delete(`${process.env.REACT_APP_BACK_END_URL}md/delete`,
    axios
      .delete("/favone/md/delete", {
        params: { id: id },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("delete movie-Drama");
        console.log(response);
        this.props.loadMoviesDramas();
        this.props.loadEpisodes();
        this.props.loadImageGalleries();
        toast.success(
          "Movie/Drama has been Deleted with it's related Episodes & Image Galleries Successfully!!"
        );
      })
      .catch((error) => {
        console.log("error in deleting movie-Drama");
        console.log(error);
        toast.error("Error Occured while trying to Delete Movie/Drama.");
        toast.info("You're not allowed to delete");
      });
  };

  render() {
    return (
      <div>
        <div className="w-full text-center">
          {!this.state.isEdit && (
            <div className=" md:h-48 mt-6 px-5  overflow-y-scroll ">
              <GendersList
                genders={this.props.genders}
                searchView={this.searchView}
                allBtnClicked={this.allBtnClicked}
                clickedGenderId={this.state.clickedGenderId}
                isSearchByGender={this.state.isSearchByGender}
              ></GendersList>
            </div>
          )}
          {/* show all Movies-Dramas if the user didn't click the Edit icon - then check if 
                     isSearchByGender is true if so, check if there is any drama/movie during the selected gender if not show a sorry massage
                    if isSearchByGender is false then show the MDRowCard */}
          {!this.state.isEdit && (
            <div>
              {this.state.isSearchByGender ? (
                <div>
                  {this.state.searchedMDs == "" ? (
                    <div className="w-full h-full">
                      <h3 className="   text-center text-gray-200 text-xl opacity-75 py-5">
                        Sorry, there is no such movie or drama
                      </h3>
                    </div>
                  ) : (
                    <div className="h-full w-full flex flex-col items-center md:px-10 md:inline-grid md:grid-cols-5 md:gap-x-2  gap-y-10  mb-4">
                    {this.state.searchedMDs.map((md, index) => (
                        <div key={index}>
                          <MDRowCard
                            email={this.props.emailAddress}
                            movieDrama={md}
                            isAuth={this.props.isAuth}
                            editView={this.editView}
                            deleteMD={this.deleteMD}
                          ></MDRowCard>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full w-full flex flex-col items-center md:px-10 md:inline-grid md:grid-cols-5 md:gap-x-2  gap-y-10  mb-4">
                {this.state.moviesDramas.sort((a, b) => (a.createAt - b.createAt) ? 1:-1)
                  .map((md, index) => (
                    <div key={index}>
                      <MDRowCard
                        email={this.props.emailAddress}
                        movieDrama={md}
                        isAuth={this.props.isAuth}
                        editView={this.editView}
                        deleteMD={this.deleteMD}
                      ></MDRowCard>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* if the user click the edit icon - show the editMD [we need to loop again using map to know the clickedMDId by user and the md.id in moviesDramas ] */}
          {this.state.moviesDramas.map((md, index) => (
            <div key={index}>
              {this.state.isEdit && this.state.clickedMDId === md.id && (
                <EditMD
                  movieDrama={md}
                  editView={this.editView}
                  editMD={this.editMD}
                  actors={this.props.actors}
                  genders={this.props.genders}
                  episodes={this.props.episodes}
                ></EditMD>
              )}
            </div>
          ))}
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
