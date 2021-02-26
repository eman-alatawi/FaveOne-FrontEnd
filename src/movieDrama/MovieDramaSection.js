import React, { Component } from 'react'
import MDRowCard from './MDRowCard';
export default class MovieDramaSection extends Component {
    
    render() {
        return (
            <div className="h-2/5 px-3 py-3  flex flex-row shadow-sm bg-gray-50  w-full overflow-x-scroll">
                <div className="h-48 w-36 ">
                <h3 className=" mt-20  text-xl text-center">Movies</h3>
                <h3 className=" mb-12 text-xl text-center">Dramas</h3>
                </div>
                <div className="flex flex-row " >

                    {this.props.moviesDramas.map((md, index)=>
                      <MDRowCard {...md}></MDRowCard>
                    )}

                   
                </div>

            </div>
        )
    }
}
