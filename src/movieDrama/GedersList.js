import React from 'react'
import GenderButton from './GenderButton'

export default function GedersList(props) {
    let btn_class = props.isSearchByGender ? "bg-pink-800" : "bg-pink-400 text-gray-800";
    return (
        <div>
            {props.genders.map((gender, index) =>
                <div key={index} className="inline-grid grid-cols-1 mb-2 justify-around  ">
                    <GenderButton gender={gender} searchView={props.searchView} clickedGenderId={props.clickedGenderId} ></GenderButton>
                </div>
            )}
            <button onClick={() => props.allBtnClicked()} className={` p-3 rounded-b-lg text-gray-200  shadow-sm hover:bg-pink-400 hover:text-gray-100  ${btn_class}`}> All </button>

        </div>
    )
}
