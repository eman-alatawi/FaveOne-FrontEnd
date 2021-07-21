import React, { Component } from "react";
import EpisodeRowCard from "./EpisodeRowCard";
export default class EpisodeSection extends Component {
  render() {
    return (
      <div className="max-w-md mx-auto h-2/5 px-12 py-4 flex flex-col md:flex-row  shadow-sm bg-gray-100 md:max-w-full ">
      <div className="md:h-48 md:w-24 md:p-2 ">
          <h3 className="md:my-36 text-xl text-center text-gray-800">Episodes</h3>
        </div>
        <div className="flex flex-row overflow-x-scroll">
          {this.props.episodes.map((episode, index) => (
            <div key={index}>
              <EpisodeRowCard
                episode={episode}
                moviesDramas={this.props.moviesDramas}
              ></EpisodeRowCard>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
