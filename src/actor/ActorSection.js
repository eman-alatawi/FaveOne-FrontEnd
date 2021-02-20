import React, { Component } from 'react'
import ActorRowCard from './ActorRowCard';
export default class ActorSection extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            actors: props.actors
        }
    }
    
    render() {
        return (
            <div className="h-72 px-3 py-3 w-full bg-blue-200 flex flex-row shadow-sm bg-cover bg-center actorSection ">
                <div className="h-64 w-36 ">
                <h3 className=" my-24  text-xl text-center text-white">Actors</h3>
                </div>
               
                <div className="h-64 w-full pr-12  inline-grid grid-cols-5 gap-x-4  gap-y-4 overflow-x-scroll overscroll-contain" >
                   
                    {this.props.actors.map((actor, index) =>
                    <ActorRowCard {...actor}></ActorRowCard>
                )}
                   
                </div>

            </div>
        )
    }
}
