import React from 'react'
import GenderButton from './GenderButton'

export default function GedersList(props) {
    return (
        <div>
            {props.genders.map((gender, index) => 
                <div key={index} className="inline-grid grid-cols-1 mb-2 justify-around  "> 
                <GenderButton gender={gender} searchView={props.searchView} ></GenderButton>
                </div>
            )}
             <button onClick={() => props.allBtnClicked()} className=" p-3  bg-blue-200  border-gray-700  shadow-sm hover:bg-blue-300 hover:text-blue-900 "> All </button>
 
        </div>
    )
}
