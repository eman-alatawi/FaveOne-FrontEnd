import React, { Component } from 'react'
import Footer from '../Shared/Footer';
import { Alert } from "react-bootstrap";
import axios from 'axios';
import MDRowCard from './MDRowCard'
import EditMD from './EditMD'
import MDDetails from './MDDetails'
import {toast } from 'react-toastify';

export default class MDIndex extends Component {
    constructor(props) {
        super(props)

        this.state = {
            moviesDramas: props.moviesDramas,
            isEdit: false,
            isDetail:false,
            mdDetail: [],
            clickedMDId: ''
        }
    }
    editView = (id) => {
        this.setState({
            isEdit: !this.state.isEdit,
            clickedMDId: id
        })
    }

    detailView = (id) => {
        this.setState({
            isDetail: !this.state.isDetail,
            clickedMDId: id
        })

       this.mdDetails(id);
    }

    mdDetails = (id) =>{
        axios.get("/favone/md/detail",
        {
            params: { id: id },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                console.log("get Movie - Drama details");
                console.log(response);
                this.setState({
                    mdDetail: response.data
                })
                
                console.log(this.state.mdDetail)
            })
            .catch(error => {
                console.log("error in retriving Movie - Drama details");
                console.log(error);
            })
    }

    editMD = (movieDrama) => {
        axios.put("/favone/md/edit", movieDrama,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => {
                console.log("edit movie-Drama");
                console.log(response);
                this.props.loadMoviesDramas();
                this.props.loadActors();
                this.props.loadEpisodes();

                this.setState({
                    isEdit: false
                })
                toast.success("Movie/Drama has been Edited Successfully!!")

            })
            .catch(error => {
                console.log("error in editing movie-Drama");
                console.log(error);
                toast.error("Error Occured while trying to Edit Movie/Drama. Please try again later")

            })
    }

    deleteMD = (id) => {
        axios.delete("/favone/md/delete",
            {
                params: { id: id },
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => {
                console.log("delete movie-Drama");
                console.log(response);
                this.props.loadMoviesDramas();
                this.props.loadEpisodes();
                //this.props.loadImageGallries()
                toast.success("Movie/Drama has been Deleted with it's related Episodes & Images Successfully!!")

            })
            .catch(error => {
                console.log("error in deleting movie-Drama");
                console.log(error);
                toast.error("Error Occured while trying to Delete Movie/Drama.")
                toast.info("You're not allowed to delete")
               
            })
    }


    
    render() {
      
        return (
            <div className="mainBg bg-cover">
               
                <div className="   mb-10 w-full  flex flex-col  justify-evenly ">



                    {/* show all Movies-Dramas if the user didn't click the Edit icon - by default show the MDRowCard */}
                    {!this.state.isEdit && !this.state.isDetail ?
                        <div>
                            <div className="h-full w-full  ">
                                <h3 className=" my-12  text-center text-gray-900 text-3xl opacity-75">All Movies - Dramas</h3>
                            </div>
                            <div className="h-full w-full pl-11  inline-grid grid-cols-5 gap-x-2  gap-y-10 " >
                                {this.state.moviesDramas.map((md, index) =>
                                    <div key={index}>
                                        <MDRowCard email={this.props.emailAddress} {...md} isAuth={this.props.isAuth} editView={this.editView} detailView={this.detailView} deleteMD={this.deleteMD} ></MDRowCard>
                                    </div>
                                )
                                }
                            </div>
                        </div>
                    : null
                    }


                    {/* if the user click the edit icon - show the editMD [we need to loop again using map to know the clickedMDId by user and the md.id in moviesDramas ] */}
                    {this.state.moviesDramas.map((md, index) =>
                        <div key={index}>
                            {(this.state.isEdit && this.state.clickedMDId === md.id) ? <EditMD movieDrama={md} editMD={this.editMD} actors={this.props.actors} genders={this.props.genders} episodes={this.props.episodes}></EditMD> : null}
                        </div>
                    )}

                    {/* if the user click the card  - show the movie-Drama Details [we need to loop again using map to know the clickedMDId by user and the md.id in moviesDramas ] */}
                    {this.state.moviesDramas.map((md, index) =>
                        <div key={index}>
                            {(this.state.isDetail && this.state.clickedMDId === md.id) ? <MDDetails movieDrama={this.state.mdDetail} episodes={this.props.episodes} hide={this.props.hide}></MDDetails> : null}
                        </div>
                    )}

                </div>
                <Footer></Footer>
            </div>
        )
    }
}
