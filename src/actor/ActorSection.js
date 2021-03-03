import React, { Component } from 'react'
import ActorRowCard from './ActorRowCard';
export default class ActorSection extends Component {
  
    render() {
        return (
            <div className="h-2/5 px-10 py-3  bg-blue-200 flex flex-row shadow-sm bg-cover bg-center actorSection  w-full overflow-x-scroll ">
                <div className="h-48 w-36 ">
                <h3 className=" my-36 text-xl  mr-4 text-center text-white">Actors</h3>
                </div>
               
                <div className="flex flex-row " >
                   
                    {this.props.actors.map((actor, index) =>
                    <div key={index}>
                    <ActorRowCard {...actor} hide={this.props.hide}></ActorRowCard>
                    </div>
                )}
                   
                </div>

            </div>
        )
    }
}
