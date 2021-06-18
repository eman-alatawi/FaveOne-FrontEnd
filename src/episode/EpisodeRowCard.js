import React from "react";
import Card from "react-bootstrap/Card";
import { withRouter, useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";

function EpisodeRowCard(props) {
  const history = useHistory();

  const showTool = props.isAuth && (
    <div className="flex flex-row justify-evenly w-full ">
      <Tooltip title="Delete Episode">
        <span
          onClick={() => {
            props.deleteEpisode(props.episode.id);
          }}
          className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black"
        >
          clear
        </span>
      </Tooltip>

      <Tooltip title="More Details">
        <span
          onClick={() => {
            history.push({
              pathname: `/episodeDetails/${props.episode.episodNum}`,
              episode: props.episode,
            });
          }}
          className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black"
        >
          expand_more
        </span>
      </Tooltip>

      <Tooltip title="Edit Episode">
        <span
          onClick={() => {
            props.editView(props.episode.id);
          }}
          className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black"
        >
          create
        </span>
      </Tooltip>
    </div>
  );

  //when user click on the image from the main page in the EpisodeSection or from the MDDetails, redirect to the episodeIndex
  const cardImage = (
    <Card.Img
      variant="top"
      className="h-64 w-full object-cover cursor-pointer"
      onClick={() => {
        history.push({
          pathname: `/episodeDetails/${props.episode.episodNum}`,
          episode: props.episode,
        });
      }}
      src={props.episode.thumbnail}
    />
  );

  return (
    <Card style={{ width: "14rem" }} className="ml-3 mr-4  shadow ">
      {cardImage}
      <Card.Body className="text-center bg-pink-900 text-gray-300 hover:bg-gray-50 hover:border-transparent hover:shadow-xl group rounded-b-lg">
        <Card.Title className="group-hover:text-gray-800  whitespace-nowrap overflow-x-scroll text-center">
          {" "}
          Episode {props.episode.episodNum}
        </Card.Title>
        {/* called from EpisodeIndex/EpisodeSection  - Dispay Movie-Drama Title*/}
        {props.moviesDramas && (
          <div>
            {props.moviesDramas.map((md, index) => (
              <div key={index}>
                {md.episodes.findIndex((x) => x.id == props.episode.id) !==
                  -1 && (
                  <Card.Text className="group-hover:text-gray-800 mb-2 whitespace-nowrap overflow-x-scroll">
                    {md.title} - {md.type}{" "}
                  </Card.Text>
                )}
              </div>
            ))}
          </div>
        )}

        {/* called from MDDetails  - Dispay Movie-Drama Title*/}
        {props.movieDrama && (
          <Card.Text className="group-hover:text-gray-800 whitespace-nowrap overflow-x-scroll">
            {props.movieDrama.title} - {props.movieDrama.type}
          </Card.Text>
        )}

        {showTool}
      </Card.Body>
    </Card>
  );
}
export default withRouter(EpisodeRowCard);
