import React, { Component } from 'react'
import EpisodeRowCard from './EpisodeRowCard';
export default class EpisodeSection extends Component {
    
    render() {
        return (
            <div className="h-2/5 px-3 py-3 w-full flex flex-row shadow-sm bg-gray-50 ">
                 <div className="h-48 w-36 ">
                <h3 className=" my-36 text-xl text-center text-gray-800">Episodes</h3>
                </div>
                <div className="h-96  w-full pr-12 inline-grid grid-cols-5 gap-x-4  gap-y-11 overflow-x-scroll overscroll-contain" >

                    {this.props.episodes.map((episode, index) =>
                     <EpisodeRowCard {...episode} moviesDramas={this.props.moviesDramas}></EpisodeRowCard>
                    )}

                   
                </div>

            </div>
        )
    }
}
