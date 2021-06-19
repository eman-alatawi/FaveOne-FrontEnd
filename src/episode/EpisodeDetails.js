import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useLocation, useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import Footer from "../Shared/Footer";

export default function EpisodeDetails(props) {
  const history = useHistory();

  const location = useLocation();
  const [episode, setEpisode] = useState({});

  useEffect(() => {
    const episodeDetails = location.episode;
    setEpisode({ ...episodeDetails });
  }, [location]);

  const getMovieDramaByTitle = props.moviesDramas.filter(
    (movieDrama, index) => {
      const movieTitle =
        movieDrama.episodes.findIndex((x) => x.id == episode.id) !== -1
          ? movieDrama.title
          : "";
      // console.log(movieTitle);
      return movieTitle;
    }
  );
  // console.log(getMovieDramaByTitle);

  function detailView(id) {
    let filteredEpisode = props.allEpisodes.find((ep) => {
      return ep.id === id;
    });
    setEpisode({ ...filteredEpisode });
  }

  const relatedEpisodes =
    getMovieDramaByTitle != "" &&
    getMovieDramaByTitle[0].episodes
      .sort((a, b) => a.episodNum - b.episodNum)
      .map((episode, index) => (
        <li
          key={index}
          className="bg-pink-900 hover:bg-white  hover:text-gray-800  my-2 pl-1 text-center"
        >
          {" "}
          <span
            onClick={() => {
              detailView(episode.id);
              history.push({
                pathname: `/episodeDetails/${episode.episodNum}`,
                episode: episode,
              });
            }}
            className=" cursor-pointer "
          >
            Episode {episode.episodNum} / {getMovieDramaByTitle[0].numOfEpisods}
          </span>
        </li>
      ));

  return (
    <div className=" bg-gray-50 rounded-lg shadow">
      <div className="h-full w-full  ">
        <h3 className="  mt-3 text-center text-gray-900 text-3xl opacity-75">
          Enjoy Watching
        </h3>
      </div>
      <div className=" flex flex-row p-10 ">
        <div className="h-96 w-80  mr-10 flex flex-col rounded-lg bg-pink-900 text-gray-300">
          <img
            className=" h-80 w-80 mr-10 shadow  object-cover "
            src={episode.thumbnail}
          />
          <div className="w-64  text-center flex flex-col">
            {props.moviesDramas.map(
              (md, index) =>
                md.episodes.findIndex((x) => x.id == episode.id) !== -1 && (
                  <Tooltip title={`Go to ${md.title} ${md.type} details page`}>
                    <div
                      className="group-hover:text-gray-800 cursor-pointer"
                      onClick={() => {
                        history.push({
                          pathname: `/movieDramaDetails/${md.title}`,
                          movieDrama: md,
                        });
                      }}
                    >
                      {md.title}{" "}
                    </div>
                  </Tooltip>
                )
            )}
            <div className="">Episode {episode.episodNum}</div>
          </div>
        </div>
        <div className=" w-4/5 flex flex-col pt-2 ">
          {/* light={props.episode.thumbnail} */}
          <ReactPlayer
            url={episode.episodeVideoUrl}
            controls={true}
            width="800px"
            height="375px"
          />
        </div>

        <div className="w-2/12  text-center pt-10 mt-2 mb-4 flex flex-col bg-gray-700 shadow-xl text-gray-300">
          <h5 className="text-center">All Episodes: </h5>

          <ul className="text-left  h-72 overflow-auto">{relatedEpisodes}</ul>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
