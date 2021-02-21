import axios from 'axios';
import React, { Component } from 'react'
import ActorRowCard from './ActorRowCard';
import EditActor from './EditActor';
export default class ActorIndex extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            isEdit: false,
            clickedActorId: ''
        }
    }
    

    editView = (id) => {
        this.setState({
            isEdit: !this.state.isEdit,
            clickedActorId: id
        })
    }

    editActor =(id) =>{
        // axios.put()
        //     .then()
        //     .catch
    }

    deleteActor =(id) =>{
        // axios.delete()
        // .then()
        // .catch
    }
    render() {
        return (
            <div className="h-full px-3 py-3 w-full bg-blue-50 flex flex-col shadow-sm bg-cover bg-center ">
                <div className="h-full w-full  ">
                <h3 className=" my-24  text-center text-white text-3xl">Actors</h3>
                </div>
               
                <div className="h-full w-full bg-red-200  inline-grid grid-cols-6 gap-x-4  gap-y-5 overflow-x-scroll overscroll-contain" >
                   
                    {this.props.actors.map((actor, index) =>
                    <div key={index}>
                    <ActorRowCard {...actor} isAuth={this.props.isAuth} editView={this.editView} deleteActor={this.deleteActor}  ></ActorRowCard>
                     {(this.state.isEdit && this.state.clickedActorId === actor.id) ? <EditActor actor={actor} editActor={this.editActor} ></EditActor> : null}
                    {/* <EditActor actor={actor} editActor={this.editActor} ></EditActor>  */}
                    </div>


                )}
                   
                </div>

            </div>
        )
    }
}
