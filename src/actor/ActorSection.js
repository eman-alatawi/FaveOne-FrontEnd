import React, { Component } from "react";
import ActorRowCard from "./ActorRowCard";
export default class ActorSection extends Component {
  render() {
    return (
      <div className="max-w-md mx-auto h-2/5 px-12 py-4  flex flex-col md:flex-row shadow-sm bg-cover bg-center actorSection md:max-w-full">
        <div className="md:h-48 md:w-24 md:p-2 ">
          <h3 className="text-xl md:my-36 md:mx-3 text-center text-white">
            Actors
          </h3>
        </div>

        <div className="flex flex-row  overflow-x-scroll">
          {this.props.actors.map((actor, index) => (
            <div key={index}>
              <ActorRowCard actor={actor}></ActorRowCard>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
