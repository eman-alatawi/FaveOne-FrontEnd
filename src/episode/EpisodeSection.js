import React, { Component } from "react";
import EpisodeRowCard from "./EpisodeRowCard";
import { Link } from "react-router-dom";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default class EpisodeSection extends Component {
  render() {
    return (
      <div className="max-w-md mx-auto px-2 md:px-12 md:sectionHight items-center justify-evenly py-4 flex flex-col   bg-transparent md:max-w-full md:max-h-full">
      <h3 className=" text-lg  w-full text-red-200 md:text-2xl pl-20 mb-5 md:pl-16  transform   md:translate-y-5  opacity-85 tracking-widest"><ExpandMoreIcon className="text-pink-600 transform -rotate-90 inline-block align-top" fontSize="large"/> TRENDING EPISODES</h3>
      <div className="flex md:flex-row  flex-col h-full w-full items-center justify-center overflow-x-scroll">
          {this.props.episodes.sort((a, b) => (a.createAt - b.createAt) ? 1:-1).slice(0, 5).map((episode, index) => (
            <div key={index}>
              <EpisodeRowCard
                episode={episode}
                moviesDramas={this.props.moviesDramas}
              ></EpisodeRowCard>
            </div>
          ))}
        </div>
        <Link to="/episodeIndex"><button className=" text-pink-100 cursor-pointer  transform hover:scale-110 motion-reduce:transform-none hover:text-pink-200 md:text-xl mt-3"><ExpandMoreIcon  className="rounded-full bg-pink-700  text-gray-800  "/> LOAD MORE</button></Link>
      </div>
    );
  }
}
