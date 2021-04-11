import React from 'react'

export default function GenderButton(props) {
    let btn_class = props.clickedGenderId === props.gender.id? "bg-blue-300" : "bg-blue-200 ";
    return (
        <div>
            <button onClick={() =>  props.searchView(props.gender.id)}  className={` p-3  bg-blue-200 rounded-b-lg border-gray-700  shadow-sm hover:bg-blue-300 hover:text-blue-900  ${btn_class}`}> {props.gender.name} </button>
        </div>
    )
}
