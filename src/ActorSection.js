import React, { Component } from 'react'
import RowCard from './RowCard';
export default class ActorSection extends Component {
    
    render() {
        return (
            <div className="h-72 px-3 py-3 w-full bg-blue-200 flex flex-row shadow-sm bg-cover bg-center actorSection ">
                <div className="h-64 w-36 ">
                <h3 className=" my-24  text-xl text-center text-white">Actors</h3>
                </div>
               
                <div className="h-64 w-full pr-12  inline-grid grid-cols-6 gap-x-4  gap-y-4 overflow-x-scroll overscroll-contain" >
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
