import React from 'react'

export default function GenderButton(props) {
    return (
        <div>
            <button onClick={() => props.searchView(props.gender.id)} className=" p-3  bg-blue-200  border-gray-700  shadow-sm hover:bg-blue-300 hover:text-blue-900 "> {props.gender.name} </button>
        </div>
    )
}
