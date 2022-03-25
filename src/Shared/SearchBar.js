import React from "react";
import SearchIcon from '@material-ui/icons/Search';
export default function SearchBar(props) {
  return (
    
      <div className="pl-2 bg-pink-800 mt-2 rounded-2xl h-6 w-80 flex flex-row hover:bg-pink-700">
        <SearchIcon className="material-icons text-gray-200  flex flex-col justify-center" />
        <input
          name="movieDrama-filter"
          type="text"
          placeholder="Search..."
          value={props.value}
          onChange={props.onChange}
          className=" text-white rounded-2xl bg-transparent w-full text-center "
        ></input>
      </div>

  );
}
