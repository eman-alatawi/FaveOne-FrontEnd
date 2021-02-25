import React, { Component } from 'react'
import Footer from '../Footer';
import { Alert } from "react-bootstrap";
import axios from 'axios';
import MDRowCard from './MDRowCard'
import EditMD from './EditMD'
import MDDetails from './MDDetails'

export default class MDIndex extends Component {
    constructor(props) {
        super(props)

        this.state = {
            moviesDramas: props.moviesDramas,
            isEdit: false,
            isDetail:false,
            mdDetail: [],
            clickedMDId: '',
            errorMessage: null,
            successMessage: null,
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
                // this.props.loadMoviesDramas();
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
                this.setState({
                    successMessage: "movie-Drama Edited Successfully!!",
                    isEdit: false
                })
            })
            .catch(error => {
                console.log("error in editing movie-Drama");
                console.log(error);
                this.setState({
                    errorMessage: "Error while Editing movie-Drama, Try again later!!"
                })
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
                this.setState({
                    successMessage: "movie-Drama Deleted Successfully!!",
                })
            })
            .catch(error => {
                console.log("error in deleting movie-Drama");
                console.log(error);
                this.setState({
                    errorMessage: "Error while Deleting movie-Drama, Try again later!!"
                })
            })
    }


    
    render() {
        const errorMessage = this.props.errorMessage ? (
            <Alert variant="danger">{this.props.errorMessage}</Alert>
        ) : null;

        const successMessage = this.props.successMessage ? (
            <Alert variant="success">{this.props.successMessage}</Alert>
        ) : null;
        return (
            <div className="mainBg bg-cover">
                {errorMessage}
                {successMessage}
                <div className="   mb-10 w-full  flex flex-col  justify-evenly ">



                    {/* show all Movies-Dramas if the user didn't click the Edit icon - by default show the MDRowCard */}
                    {!this.state.isEdit && !this.state.isDetail ?
                        <div>
                            <div className="h-full w-full  ">
                                <h3 className=" my-12  text-center text-gray-900 text-3xl opacity-75">Movies - Dramas</h3>
                            </div>
                            <div className="h-full w-full pl-11  inline-grid grid-cols-5 gap-x-2  gap-y-10 " >
                                {this.state.moviesDramas.map((md, index) =>
                                    <div key={index}>
                                        <MDRowCard email={this.props.emailAddress} {...md} isAuth={this.props.isAuth} editView={this.editView} detailView={this.detailView} deleteMD={this.deleteMD} errorMessage={this.state.errorMessage} successMessage={this.state.successMessage} ></MDRowCard>
                                    </div>
                                )
                                }
                            </div>
                        </div>
                    : null
                    }


                    {/* if the user click the edit icon - show the editMD [we need to loop again using map to know the clickedActorId by user and the actor.id in actors ] */}
                    {this.state.moviesDramas.map((md, index) =>
                        <div key={index}>
                            {(this.state.isEdit && this.state.clickedMDId === md.id) ? <EditMD movieDrama={md} editMD={this.editMD} actors={this.props.actors} genders={this.props.genders} ></EditMD> : null}
                        </div>
                    )}

                    {/* if the user click the card  - show the ActorDetail [we need to loop again using map to know the clickedActorId by user and the actor.id in actors ] */}
                    {this.state.moviesDramas.map((md, index) =>
                        <div key={index}>
                            {(this.state.isDetail && this.state.clickedMDId === md.id) ? <MDDetails movieDrama={this.state.mdDetail}></MDDetails> : null}
                        </div>
                    )}

                </div>
                <Footer></Footer>
            </div>
        )
    }
}
