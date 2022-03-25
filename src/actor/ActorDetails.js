import React, { useState, useEffect } from "react";
import MDRowCard from "../movieDrama/MDRowCard";
import { useLocation } from "react-router-dom";
import Footer from "../Shared/Footer";

export default function ActorDetails(props) {
  const location = useLocation();
  const [actor, setActor] = useState({});

  useEffect(() => {
    const actorDetails = location.actor;
    setActor({ ...actorDetails });
  }, [location]);

  // scroll to the top after render
  useEffect(() => {
    window.scrollTo(0, 500)
  }, [])

  console.log(actor.fullName);
  return (
    <div>
      <div className=" flex flex-col md:flex-row   text-gray-200  rounded-lg shadow p-10 ">
        <div className="h-96 w-full md:w-80   mr-10 flex flex-col  ">
          <img
            className=" h-80 w-full md:w-80  mr-10 shadow   object-cover"
            src={actor.picture}
          />
          <div className="w-full  flex flex-col text-center py-1">
            <h1 className="text-xl">Social Account</h1>
            <p>{`${actor.socialAccount === '-' ? "Doesn't have any social account" : actor.socialAccount}`}</p>
          </div>
        </div>
        <div className=" w-full flex flex-col pt-2">
          <div className=" p-4 flex flex-col md:flex-row justify-start w-full mb-4 rounded-lg  ">
            <h1 className="mr-20 text-xl">{actor.fullName}</h1>
            <h1 className="mr-20 text-xl">{actor.dateOfBirth}</h1>
            <h1 className="text-xl">{actor.gender}</h1>
          </div>

          <h1 className="text-2xl mb-3 px-4 ">Biography</h1>
          <p className="text-justify w-5/5 px-4 h-72 leading-8 overflow-auto">
            {actor.biography} 
          </p>
        </div>
      </div>

      {actor.movieDramas && (
        <div className="text-gray-200 flex flex-col items-center md:items-start shadow-2xl p-10  w-full ">
          <h4 className=" mb-3 text-xl ml-3">
            Related Movies/Dramas
          </h4>
          <div className="w-11/12 overflow-auto">
          <div className="flex flex-col gap-y-3 md:flex-row ">
            {" "}
            {actor.movieDramas.map((md, index) => (
              <div key={index}>
                <MDRowCard movieDrama={md} isAuth={props.isAuth}></MDRowCard>
              </div>
            ))}
          </div>
          </div>
        </div>
      )}
      <Footer></Footer>
    </div>
  );
}
