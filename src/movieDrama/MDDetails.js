import React, { useState, useEffect } from "react";
import ActorRowCard from "../actor/ActorRowCard";
import EpisodeRowCard from "../episode/EpisodeRowCard";
import ImageGalleryRowCard from "../ImageGallery/ImageGalleryRowCard";
import { useLocation } from "react-router-dom";
import Footer from "../Shared/Footer";

export default function MDDetails(props) {
  const location = useLocation();
  const [movieDrama, setMovieDrama] = useState({});

  useEffect(() => {
    const movieDetails = location.movieDrama;
    setMovieDrama({ ...movieDetails });
  }, [location]);

  // scroll to the top after render
  useEffect(() => {
    window.scrollTo(0, 500)
  }, [])

  const year = new Date(movieDrama.releaseYear);

  const thisMovieActors = props.actors.filter((actor) => {
    const index = actor.movieDramas.findIndex((x) => x.id === movieDrama.id);
    // console.log(index)
    return index != -1;
  });
  return (
    <div>
      <div className=" flex flex-col md:flex-row  text-gray-200   shadow-2xl p-10 ">
        <div className="md:h-3/3 w-full md:w-80  mr-10  rounded-lg bg-pink-900 ">
          <img
            className=" h-80 w-full md:w-80 mr-10 shadow object-cover"
            src={movieDrama.poster}
          />
          <div className="mt-3 w-full flex flex-col">
            <h4 className="text-xl text-center ">{movieDrama.type}</h4>
          </div>
        </div>
        <div className=" md:w-4/5 flex flex-col pt-2 ">
          <div className="  flex flex-col md:flex-row justify-start w-full md:px-5 md:leading-8  mb-1">
            <h4 className="mr-20 text-xl">{movieDrama.title}</h4>
            <h5 className="mr-20 md:mr-20 text-lg md:text-xl">{year.getFullYear()}</h5>
            <div className="mr-20 text-lg md:text-xl flex flex-row "><h5 className="mr-2 text-lg md:text-xl">Score: </h5>{movieDrama.score}</div>
          </div>

          <p className="text-justify w-full md:w-11/12  h-64 md:px-5 md:leading-8 overflow-auto mb-4 ">
            {movieDrama.description}
          </p>

          <div className="md:p-2 flex  flex-col md:flex-row justify-start w-full md:px-5 md:leading-8">
            <div className="mr-20 flex flex-row ">
              <h5 className="mr-2 text-lg  lg:text-xl">Duration: </h5>
              {movieDrama.duration}
            </div>
            <div className="mr-20 flex flex-row">
              <h5 className="mr-2 text-lg lg:text-xl">Content Rating: </h5>
              {movieDrama.contentRating}
            </div>
            <div className="mr-20 flex flex-row">
              <h5 className="mr-2 text-lg lg:text-xl" >Number Of Episodes: </h5>
              {movieDrama.numOfEpisods}
            </div>
          </div>
        </div>
        <div className="md:w-1/12 h-96 text-center pt-1 mt-2 mb-4 flex flex-col ">
          <h5 className="text-center md:text-left pl-1 text-xl">Categories </h5>
          {movieDrama.genders && (
            <ul className="text-center md:text-left  h-56 overflow-auto">
              {movieDrama.genders.map((gender, index) => (
                <li key={index} className="bg-pink-900 my-2 pl-1">
                  {gender.name} {" "}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {movieDrama.episodes && (

        <div className=" text-gray-200 flex flex-col items-center md:items-start  p-5   w-full ">
          <h4 className=" mb-2  text-xl ml-3">Related Episodes</h4>
          <div className="w-11/12 overflow-auto">
            <div className=" flex flex-col gap-y-3 md:flex-row ">
              {" "}
              {movieDrama.episodes
                .sort((a, b) => a.episodNum - b.episodNum)
                .map((episode, index) => (
                  <div key={index}>
                    <EpisodeRowCard
                      episode={episode}
                      movieDrama={movieDrama}
                    ></EpisodeRowCard>
                  </div>
                ))}
            </div>
          </div>
        </div>

      )}

      {movieDrama.imageGalleries && (
        <div className=" text-gray-200  flex flex-col items-center md:items-start   p-5   w-full ">
          <h4 className=" mb-2 text-xl ml-3">
            Related Image Galleries
          </h4>
          <div className="w-11/12 overflow-auto">
            <div className="flex flex-col gap-y-3 md:flex-row ">
              {" "}
              {movieDrama.imageGalleries.sort((a, b) => (a.createAt - b.createAt) ? 1:-1).map((imageGallery, index) => (
                <div key={index}>
                  <ImageGalleryRowCard
                    {...imageGallery}
                    movieDrama={movieDrama}
                  ></ImageGalleryRowCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="text-gray-200  flex flex-col items-center md:items-start  p-5   w-full ">
        <h4 className=" mb-2 text-xl ml-3"> Actors - Cast</h4>
        <div className="w-11/12 overflow-auto">
          <div className="flex flex-col gap-y-3 md:flex-row">
            {" "}
            {thisMovieActors.sort((a, b) => (b.movieDramas.length - a.movieDramas.length)).map((actor, index) => (
              <div key={index}>
                <ActorRowCard actor={actor}></ActorRowCard>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
