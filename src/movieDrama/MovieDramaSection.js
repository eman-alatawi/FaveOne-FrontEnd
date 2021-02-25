import React, { Component } from 'react'
import MDRowCard from './MDRowCard';
export default class MovieDramaSection extends Component {
    
    render() {
        return (
            <div className="h-2/5 px-3 py-3 w-full flex flex-row shadow-sm bg-gray-50 ">
                <div className="h-48 w-36 ">
                <h3 className=" mt-20  text-xl text-center">Movies</h3>
                <h3 className=" mb-12 text-xl text-center">Dramas</h3>
                </div>
                <div className="h-96  w-full pr-12 inline-grid grid-cols-5 gap-x-4  gap-y-11 overflow-x-scroll overscroll-contain" >

                    {this.props.moviesDramas.map((md, index)=>
                      <MDRowCard {...md}></MDRowCard>
                    )}

                   
                </div>

            </div>
        )
    }
}
