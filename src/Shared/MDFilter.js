import React, { Component } from 'react'

export default class MDFilter extends Component {
    render() {
        return (
            <div className="pl-2 bg-pink-800 mt-2 rounded-2xl h-6 w-40 flex flex-row hover:bg-pink-700">
               <span className="material-icons text-gray-200  flex flex-col justify-center">search</span> <input name="movieDrama-filter" type="text" value={this.props.value} onChange={this.props.onChange} className=" text-white rounded-2xl bg-transparent"></input>

            </div>
        )
    }
}
