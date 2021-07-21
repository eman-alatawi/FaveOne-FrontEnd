import React from "react";
import Card from "react-bootstrap/Card";
import { withRouter, useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import moment from "moment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function EpisodeRowCard(props) {
  const history = useHistory();
  const lastUpdate = moment(props.episode.updateAt);

  const showTool = props.isAuth && (
    <div className="flex flex-row justify-evenly w-full ">
      <Tooltip title="Delete Episode">
        <DeleteIcon
          onClick={() => {
            props.deleteEpisode(props.episode.id);
          }}
          className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black"
        />
      </Tooltip>

      <Tooltip title="More Details">
        <ExpandMoreIcon
          onClick={() => {
            history.push({
              pathname: `/episodeDetails/${props.episode.episodNum}`,
              episode: props.episode,
            });
          }}
          className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black"
        />
      </Tooltip>

      <Tooltip title="Edit Episode">
        <EditIcon
          onClick={() => {
            props.editView(props.episode.id);
          }}
          className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black"
        />
      </Tooltip>
    </div>
  );

  //when user click on the image from the main page in the EpisodeSection or from the MDDetails, redirect to the episodeIndex
  const cardImage = (
    <>
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
      <div className="bg-blue-400 text-gray-200 text-xs p-2 rounded-b-lg  border-fuchsia-400 absolute transform -translate-x-3.5 shadow-sm">
        {" "}
        {lastUpdate.fromNow()}
      </div>
    </>
  );

  return (
    <Card  className="mx-3.5  md:my-3  shadow w-64 md:w-56 ">
      {cardImage}
      <Card.Body className="text-center bg-pink-900 text-gray-300 hover:bg-gray-50 hover:border-transparent hover:shadow-xl group rounded-b-lg">
        {/* called from EpisodeIndex/EpisodeSection  - Dispay Movie-Drama Title*/}
        {props.moviesDramas && (
          <div>
            {props.moviesDramas.map((md, index) => (
              <div key={index}>
                {md.episodes.findIndex((x) => x.id == props.episode.id) !==
                  -1 && (
                  <Card.Text
                    className="group-hover:text-gray-800 mb-2 whitespace-normal h-24 overflow-auto cursor-pointer"
                    onClick={() => {
                      history.push({
                        pathname: `/movieDramaDetails/${md.title}`,
                        movieDrama: md,
                      });
                    }}
                  >
                    <Card.Title className="group-hover:text-gray-800  whitespace-nowrap  text-center">
                      {" "}
                      Episode {props.episode.episodNum} / {md.numOfEpisods}
                    </Card.Title>
                    {md.title} - {md.type}{" "}
                  </Card.Text>
                )}
              </div>
            ))}
          </div>
        )}

        {/* called from MDDetails  - Dispay Movie-Drama Title*/}
        {props.movieDrama && (
          <Card.Text className="group-hover:text-gray-800 whitespace-normal h-24  overflow-auto">
            <Card.Title className="group-hover:text-gray-800  whitespace-nowrap  text-center">
              {" "}
              Episode {props.episode.episodNum} /{" "}
              {props.movieDrama.numOfEpisods}
            </Card.Title>
            {props.movieDrama.title} - {props.movieDrama.type}
          </Card.Text>
        )}

        {showTool}
      </Card.Body>
    </Card>
  );
}
export default withRouter(EpisodeRowCard);
