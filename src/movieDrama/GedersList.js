import React from 'react'
import GenderButton from './GenderButton'

export default function GedersList(props) {
    let btn_class = props.isSearchByGender ? "bg-blue-200" : "bg-blue-300 ";
    return (
        <div>
            {props.genders.map((gender, index) => 
                <div key={index} className="inline-grid grid-cols-1 mb-2 justify-around  "> 
                <GenderButton gender={gender} searchView={props.searchView} clickedGenderId={props.clickedGenderId } ></GenderButton>
                </div>
            )}
             <button onClick={() => props.allBtnClicked()} className={` p-3 rounded-b-lg border-gray-700  shadow-sm hover:bg-blue-300 hover:text-blue-900  ${btn_class}`}> All </button>
 
        </div>
    )
}
