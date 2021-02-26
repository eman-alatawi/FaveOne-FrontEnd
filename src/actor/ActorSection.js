import React, { Component } from 'react'
import ActorRowCard from './ActorRowCard';
export default class ActorSection extends Component {
    // constructor(props) {
    //     super(props)
    
    //     this.state = {
    //         actors: props.actors
    //     }
    // }
    
    render() {
        return (
            <div className="h-2/5 px-10 py-3  bg-blue-200 flex flex-row shadow-sm bg-cover bg-center actorSection  w-full overflow-x-scroll ">
                <div className="h-48 w-36 ">
                <h3 className=" my-36 text-xl text-center text-white mr-2">Actors</h3>
                </div>
               
                <div className="flex flex-row " >
                   
                    {this.props.actors.map((actor, index) =>
                    <ActorRowCard {...actor}></ActorRowCard>
                )}
                   
                </div>

            </div>
        )
    }
}
