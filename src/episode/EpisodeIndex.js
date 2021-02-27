import axios from 'axios';
import React, { Component } from 'react'
import Footer from '../Footer';
import EditEpisode from './EditEpisode';
import EpisodeRowCard from './EpisodeRowCard';
import EpisodeDetails from './EpisodeDetails'
import {toast } from 'react-toastify';

export default class EpisodeIndex extends Component {
    constructor(props) {
        super(props)

        this.state = {
            episodes: props.episodes,
            isEdit: false,
            isDetail:false,
            episodeDetail: [],
            clickedEpisodeId: ''
        }
    }


    editView = (id) => {
        this.setState({
            isEdit: !this.state.isEdit,
            clickedEpisodeId: id
        })
    }

    detailView = (id) => {
        this.setState({
            isDetail: !this.state.isDetail,
            clickedEpisodeId: id
        })

       this.episodeDetails(id);
    }

    episodeDetails = (id) =>{
        axios.get("/favone/episode/detail",
        {
            params: { id: id },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                console.log("get Episode details");
                console.log(response);
                this.setState({
                    episodeDetail: response.data
                })
                
                console.log(this.state.episodeDetail)
            })
            .catch(error => {
                console.log("error in retriving Episode details");
                console.log(error);
            })
    }

    editEpisode = (episode) => {
        axios.put("/favone/episode/edit", episode,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => {
                console.log("edit episode");
                console.log(response);
                this.props.loadEpisodes();
                this.props.loadMoviesDramas();
                this.setState({
                  isEdit: false
                })
                toast.success("Episode has been Edited Successfully!!")

            })
            .catch(error => {
                console.log("error in editing Episode");
                console.log(error);
                toast.error("Error Occured while trying to Edit Episode. Please try again later")

            })
    }

    deleteEpisode = (id) => {
        axios.delete("/favone/episode/delete",
            {
                params: { id: id },
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => {
                console.log("delete episode");
                console.log(response);
                this.props.loadEpisodes();
                toast.success("Episode has been Deleted Successfully!!")

            })
            .catch(error => {
                console.log("error in deleting Episode");
                console.log(error);
                toast.error("Error Occured while trying to Delete Episode.")
                toast.info("You're not allowed to delete")
            })
    }
    render() {
 
        return (
            <div className=" mainBg bg-cover ">
              
                <div className="   mb-10 w-full  flex flex-col  justify-evenly ">



                    {/* show all actors if the user didn't click the Edit icon - by default show the ActorRowCard */}
                    {!this.state.isEdit && !this.state.isDetail ?
                        <div>
                            <div className="h-full w-full  ">
                                <h3 className=" my-12  text-center text-gray-900 text-3xl opacity-75">All Episodes</h3>
                            </div>
                            <div className="h-full w-full pl-11  inline-grid grid-cols-5 gap-x-2  gap-y-10 " >
                                {this.state.episodes.map((episode, index) =>
                                    <div key={index}>
                                    <EpisodeRowCard {...episode} moviesDramas={this.props.moviesDramas} isAuth={this.props.isAuth} editView={this.editView} detailView={this.detailView} deleteEpisode={this.deleteEpisode} ></EpisodeRowCard>
                                    </div>
                                )
                                }
                            </div>
                        </div>
                    : null
                    }


                    {/* if the user click the edit icon - show the EditActor [we need to loop again using map to know the clickedActorId by user and the actor.id in actors ] */}
                    {this.state.episodes.map((episode, index) =>
                        <div key={index}> 
                        {(this.state.isEdit && this.state.clickedEpisodeId === episode.id) ? <EditEpisode episode={episode} moviesDramas={this.props.moviesDramas} editEpisode={this.editEpisode} ></EditEpisode> : null} 
                        </div>
                    )}

                    {/* if the user click the card  - show the ActorDetail [we need to loop again using map to know the clickedActorId by user and the actor.id in actors ] */}
                    {this.state.episodes.map((episode, index) =>
                        <div key={index}> 
                            {(this.state.isDetail && this.state.clickedEpisodeId === episode.id) ? <EpisodeDetails episode={this.state.episodeDetail} allEpisodes={this.state.episodes} moviesDramas={this.props.moviesDramas} isAuth={this.props.isAuth}></EpisodeDetails> : null} 
                         </div>
                    )}

                </div>
                <Footer></Footer>
            </div>
        )
    }
}
