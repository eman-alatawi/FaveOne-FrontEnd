import axios from 'axios';
import React, { Component } from 'react'
import ActorRowCard from './ActorRowCard';
import EditActor from './EditActor';
import { Alert } from "react-bootstrap";
import Footer from '../Footer';
import ActorDetails from './ActorDetails'
export default class ActorIndex extends Component {
    constructor(props) {
        super(props)

        this.state = {
            actors: props.actors,
            isEdit: false,
            isDetail:false,
            actorDetail: [],
            clickedActorId: '',
            errorMessage: null,
            successMessage: null,
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
                    successMessage: "Actor Edited Successfully!!",
                    isEdit: false
                })
            })
            .catch(error => {
                console.log("error in editing actor");
                console.log(error);
                this.setState({
                    errorMessage: "Error while Editing Actor, Try again later!!"
                })
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
                this.setState({
                    successMessage: "Actor Deleted Successfully!!",
                })
            })
            .catch(error => {
                console.log("error in deleting actor");
                console.log(error);
                this.setState({
                    errorMessage: "Error while Deleting Actor, Try again later!!"
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
            <div className=" mainBg bg-cover ">
                {errorMessage}
                {successMessage}
                <div className="   mb-10 w-full  flex flex-col  justify-evenly ">



                    {/* show all actors if the user didn't click the Edit icon - by default show the ActorRowCard */}
                    {!this.state.isEdit && !this.state.isDetail ?
                        <div>
                            <div className="h-full w-full  ">
                                <h3 className=" my-12  text-center text-gray-900 text-3xl opacity-75">Actors</h3>
                            </div>
                            <div className="h-full w-full pl-11  inline-grid grid-cols-5 gap-x-2  gap-y-10 " >
                                {this.state.actors.map((actor, index) =>
                                    <div key={index}>
                                        <ActorRowCard {...actor} isAuth={this.props.isAuth} editView={this.editView} detailView={this.detailView} deleteActor={this.deleteActor} errorMessage={this.state.errorMessage} successMessage={this.state.successMessage} ></ActorRowCard>
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
                            {(this.state.isDetail && this.state.clickedActorId === actor.id) ? <ActorDetails actor={this.state.actorDetail} isAuth={this.props.isAuth}></ActorDetails> : null}
                        </div>
                    )}

                </div>
                <Footer></Footer>
            </div>
        )
    }
}
