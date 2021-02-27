import React, { Component } from 'react'
import EpisodeRowCard from './EpisodeRowCard';
export default class EpisodeSection extends Component {
    
    render() {
        return (
            <div className="h-2/5 px-7 py-3  flex flex-row shadow-sm bg-gray-50 w-full overflow-x-scroll ">
                 <div className="h-48 w-36 ">
                <h3 className=" my-36 text-xl text-center text-gray-800">Episodes</h3>
                </div>
                <div className="flex flex-row" >

                    {this.props.episodes.map((episode, index) =>
                     <EpisodeRowCard {...episode} moviesDramas={this.props.moviesDramas} hide={this.props.hide}></EpisodeRowCard>
                    )}

                   
                </div>

            </div>
        )
    }
}
