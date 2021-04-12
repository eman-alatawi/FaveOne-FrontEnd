import React from 'react'

export default function GenderButton(props) {
    let btn_class = props.clickedGenderId === props.gender.id? "bg-pink-400 text-gray-800" : "bg-pink-800 ";
    return (
        <div>
            <button onClick={() =>  props.searchView(props.gender.id)}  className={` p-3  rounded-b-lg text-gray-200  shadow-sm hover:bg-pink-400 hover:text-gray-100  ${btn_class}`}> {props.gender.name} </button>
        </div>
    )
}
