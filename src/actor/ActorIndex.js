import axios from 'axios';
import React, { Component } from 'react'
import ActorRowCard from './ActorRowCard';
import EditActor from './EditActor';
// import { Alert } from "react-bootstrap";
import Footer from '../Shared/Footer';
import ActorDetails from './ActorDetails'
import {toast } from 'react-toastify';

export default class ActorIndex extends Component {
    constructor(props) {
        super(props)

        this.state = {
            actors: props.actors,
            isEdit: false,
            isDetail:false,
            actorDetail: [],
            clickedActorId: ''
        }
    }


    editView = (id) => {
        this.setState({
            isEdit: !this.state.isEdit,
            clickedActorId: id
        })
    }

    detailView = (id) => {
        this.setState({
            isDetail: !this.state.isDetail,
            clickedActorId: id
        })

       this.actorDetails(id);
    }

    actorDetails = (id) =>{
        axios.get("/favone/actor/detail",
        {
            params: { id: id },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                console.log("get actor details");
                console.log(response);
                this.setState({
                    actorDetail: response.data
                })
                
                console.log(this.state.actorDetail)
                // this.props.loadActors();
            })
            .catch(error => {
                console.log("error in retriving actor details");
                console.log(error);
            })
    }

    editActor = (actor) => {
        axios.put("/favone/actor/edit", actor,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => {
                console.log("edit actor");
                console.log(response);
                this.props.loadActors();
                this.setState({
                    isEdit: false
                })
                toast.success("Actor has been Edited Successfully!!")
            })
            .catch(error => {
                console.log("error in editing actor");
                console.log(error);
                toast.error("Error Occured while trying to Edit Actor. Please try again later")
            })
    }

    deleteActor = (id) => {
        axios.delete("/favone/actor/delete",
            {
                params: { id: id },
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => {
                console.log("delete actor");
                console.log(response);
                this.props.loadActors();
                toast.success("Actor has been Deleted Successfully!!")
            })
            .catch(error => {
                console.log("error in deleting actor");
                console.log(error);
                toast.error("Error Occured while trying to Delete Actor.")
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
                                <h3 className=" my-12  text-center text-gray-900 text-3xl opacity-75">All Actors</h3>
                            </div>
                            <div className="h-full w-full pl-11  inline-grid grid-cols-5 gap-x-2  gap-y-10 " >
                                {this.state.actors.map((actor, index) =>
                                    <div key={index}>
                                        <ActorRowCard {...actor} isAuth={this.props.isAuth} editView={this.editView} detailView={this.detailView} deleteActor={this.deleteActor}></ActorRowCard>
                                    </div>
                                )
                                }
                            </div>
                        </div>
                    : null
                    }


                    {/* if the user click the edit icon - show the EditActor [we need to loop again using map to know the clickedActorId by user and the actor.id in actors ] */}
                    {this.state.actors.map((actor, index) =>
                        <div key={index}>
                            {(this.state.isEdit && this.state.clickedActorId === actor.id) ? <EditActor actor={actor} editActor={this.editActor} ></EditActor> : null}
                        </div>
                    )}

                    {/* if the user click the card  - show the ActorDetail [we need to loop again using map to know the clickedActorId by user and the actor.id in actors ] */}
                    {this.state.actors.map((actor, index) =>
                        <div key={index}>
                            {(this.state.isDetail && this.state.clickedActorId === actor.id) ? <ActorDetails actor={this.state.actorDetail} isAuth={this.props.isAuth} hide={this.props.hide}></ActorDetails> : null}
                        </div>
                    )}

                </div>
                <Footer></Footer>
            </div>
        )
    }
}
