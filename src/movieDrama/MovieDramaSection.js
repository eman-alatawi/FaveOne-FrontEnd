import React, { Component } from "react";
import MDRowCard from "./MDRowCard";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
export default class MovieDramaSection extends Component {
  render() {
    return (
      <>
        <div className="max-w-md mx-auto h-2/5 px-12 py-4 flex flex-col md:flex-row  shadow-sm bg-gray-100 md:max-w-full ">
          <div className="md:h-48 md:w-24 md:p-2 md:my-36  ">
            <h3 className=" text-xl text-center">Movies</h3>
            <h3 className=" text-xl text-center">Dramas</h3>
          </div>
          <div className="flex flex-row w-full overflow-x-scroll">
            {this.props.moviesDramas.map((md, index) => (
              <div key={index}>
                <MDRowCard movieDrama={md}></MDRowCard>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
