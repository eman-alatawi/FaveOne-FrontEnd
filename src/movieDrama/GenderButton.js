import React from "react";

export default function GenderButton(props) {
  let btn_class =
    props.clickedGenderId === props.gender.id
      ? "bg-red-300 text-gray-700"
      : "formBG ";
  return (
    <div>
      <button
        onClick={() => props.searchView(props.gender.id)}
        className={` p-2 m-1  rounded-full text-gray-200  shadow-sm hover:bg-red-400   ${btn_class}`}
      >
        {" "}
        {props.gender.name}{" "}
      </button>
    </div>
  );
}
