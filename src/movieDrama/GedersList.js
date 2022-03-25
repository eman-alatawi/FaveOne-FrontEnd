import React from "react";
import GenderButton from "./GenderButton";

export default function GedersList(props) {
  let btn_class = props.isSearchByGender
    ? "formBG"
    : "bg-red-300 text-gray-700";
  return (
    <div>
      {props.genders.sort((a, b) => a.name.localeCompare(b.name)).map((gender, index) => (
        <div
          key={index}
          className="inline-grid grid-cols-1 mb-2 justify-around  "
        >
          <GenderButton
            gender={gender}
            searchView={props.searchView}
            clickedGenderId={props.clickedGenderId}
          ></GenderButton>
        </div>
      ))}
      <button
        onClick={() => props.allBtnClicked()}
        className={` p-2 m-1 rounded-full text-gray-200  shadow-sm hover:bg-red-400  ${btn_class}`}
      >
        {" "}
        All{" "}
      </button>
    </div>
  );
}
