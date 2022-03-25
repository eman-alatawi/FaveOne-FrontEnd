import React, { Component } from "react";
import ActorRowCard from "./ActorRowCard";
import SectionDivider from '../Shared/SectionDivider'
import { Link } from "react-router-dom";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default class ActorSection extends Component {
  render() {
    return (
      <>
        <div className="max-w-md mx-auto px-2 md:px-12 md:sectionHight items-center justify-evenly py-4 flex flex-col   bg-transparent md:max-w-full md:max-h-full">
        <h3 className=" text-lg  w-full text-red-200 md:text-2xl mb-5 pl-20 md:pl-16  transform  md:translate-y-5  opacity-85 tracking-widest"><ExpandMoreIcon className="text-pink-600 transform -rotate-90 inline-block align-top" fontSize="large"/> BEST ARTISTS</h3>
        <div className="flex md:flex-row  flex-col h-full w-full items-center justify-center overflow-x-scroll">
          {this.props.actors.sort((a, b) => (b.movieDramas.length - a.movieDramas.length)).slice(0, 5).map((actor, index) => (
            <div key={index}>
              <ActorRowCard actor={actor}></ActorRowCard>
            </div>
          ))}
        </div>
        <Link to="/actorIndex"><button className=" text-pink-100 cursor-pointer  transform hover:scale-110 motion-reduce:transform-none hover:text-pink-200 md:text-xl mt-3"><ExpandMoreIcon  className="rounded-full bg-pink-700  text-gray-800  "/> LOAD MORE</button></Link>

      </div>
      <SectionDivider />
      </>
    );
  }
}
