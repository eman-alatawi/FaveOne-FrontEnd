import React, { Component } from 'react'
import RowCard from './RowCard';
export default class EpisodeSection extends Component {
    
    render() {
        return (
            <div className="h-72 px-3 py-3 w-full bg-gray-50 flex flex-row shadow-sm bg-cover bg-center ">
                <div className="h-64 w-36 ">
                <h3 className=" my-24  text-xl text-center">Episodes</h3>
                </div>
               
                <div className="h-64 w-full pr-12  inline-grid grid-cols-5 gap-x-4  gap-y-4 overflow-x-scroll overscroll-contain" >
                    <RowCard></RowCard>
                    <RowCard></RowCard>
                    <RowCard></RowCard>
                    <RowCard></RowCard>
                    <RowCard></RowCard>
                    <RowCard></RowCard>
                    <RowCard></RowCard>
                    <RowCard></RowCard>
                    <RowCard></RowCard>
                    <RowCard></RowCard>
                    <RowCard></RowCard>
                    <RowCard></RowCard>
                   
                </div>

            </div>
        )
    }
}
