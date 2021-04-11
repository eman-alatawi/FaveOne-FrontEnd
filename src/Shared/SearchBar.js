
import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';

export default function SearchBar(props) {
    return (
        <Tooltip title="Search for drama, movie, actor or catagory">
        <div className="pl-2 bg-pink-800 mt-2 rounded-2xl h-6 w-40 flex flex-row hover:bg-pink-700">
                <span className="material-icons text-gray-200  flex flex-col justify-center">search</span> <input name="movieDrama-filter" type="text" value={props.value} onChange={props.onChange} className=" text-white rounded-2xl bg-transparent w-32 "></input>
            
        </div>
        </Tooltip>
    )
}

