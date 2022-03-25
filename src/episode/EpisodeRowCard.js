import React from "react";
import Card from "react-bootstrap/Card";
import { withRouter, useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import moment from "moment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Typography from "@material-ui/core/Typography";
import Swal from 'sweetalert2'

function EpisodeRowCard(props) {
  const history = useHistory();
  const lastUpdate = moment(props.episode.updateAt);

  function confirmDelete(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        props.deleteEpisode(props.episode.id);
        Swal.fire(
          'Deleted!',
          'The episode has been deleted.',
          'success'
        )
      }
    })
  }

  const showTool = props.isAuth && (
    <div className="flex flex-row justify-evenly w-full absolute  text-gray-300">
      <Tooltip title="Delete Episode">
        <DeleteIcon
          // onClick={() => {
          //   props.deleteEpisode(props.episode.id);
          // }}
          onClick={confirmDelete}
          className="p-1 rounded-full bg-pink-900 cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black"
        />
      </Tooltip>

      <Tooltip title="Edit Episode">
        <EditIcon
          onClick={() => {
            props.editView(props.episode.id);
          }}
          className="p-1 rounded-full formBG  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black"
        />
      </Tooltip>
    </div>
  );

  const cardPopover = (
    <Card.Body className="text-center  w-full md:w-56  h-  text-gray-300  formBG rounded-lg">
      {/* called from EpisodeIndex/EpisodeSection  - Dispay Movie-Drama Title*/}
      {props.moviesDramas && (
        <div>
          {props.moviesDramas.map((md, index) => (
            <div key={index}>
              {md.episodes.findIndex((x) => x.id == props.episode.id) !==
                -1 && (
                  <Card.Text
                    className="group-hover:text-pink-800 mb-2 whitespace-normal h-24 overflow-auto cursor-pointer"
                    onClick={() => {
                      history.push({
                        pathname: `/movieDramaDetails/${md.title}`,
                        movieDrama: md,
                      });
                    }}
                  >
                    <Card.Title className="group-hover:text-pink-800  whitespace-nowrap  text-center">
                      {" "}
                      Episode {props.episode.episodNum} / {md.numOfEpisods}
                    </Card.Title>
                    {md.title}  {md.type}{" "}
                  </Card.Text>
                )}
            </div>
          ))}
        </div>
      )}

      {/* called from MDDetails  - Dispay Movie-Drama Title*/}
      {props.movieDrama && (
        <Card.Text className=" whitespace-normal h-24  overflow-auto">
          <Card.Title className=" whitespace-nowrap  text-center">
            <Typography variant="h6" component="p">
              Episode {props.episode.episodNum} /
              {props.movieDrama.numOfEpisods}
            </Typography>
            <Typography variant="body1" component="p">
              {props.movieDrama.title}
            </Typography> 
            <Typography variant="body2" component="p">
              {props.movieDrama.type}</Typography>
          </Card.Title>

        </Card.Text>
      )}

    </Card.Body>
  )

  //when user click on the image from the main page in the EpisodeSection or from the MDDetails, redirect to the episodeIndex
  const cardImage = (
    <>
      <OverlayTrigger trigger="hover" placement="auto-start" onHide="null" overlay={cardPopover}>

        <Card.Img
          variant="top"
          className="h-56 md:h-96 w-full object-cover cursor-pointer"
          onClick={() => {
            history.push({
              pathname: `/episodeDetails/${props.episode.episodNum}`,
              episode: props.episode,
            });
          }}
          src={props.episode.thumbnail}
        />
      </OverlayTrigger>

      <div className="bg-red-300 opacity-85 text-gray-800 text-xs p-2 rounded-b-lg  border-fuchsia-400 absolute transform -translate-x-5 shadow-sm">
        {" "}
         <span className="font-mono">EP-{props.episode.episodNum} </span> Added {lastUpdate.fromNow()}
      </div>
      <span className="transform -translate-y-10 opacity-85">{showTool}</span>

    </>
  );

  return (
    <Card className="mx-3 mb-2 md:h-3/3 w-48 md:w-56 md:my-3 shadow-xl  border-0 ">
      {cardImage}
    </Card>
  );
}
export default withRouter(EpisodeRowCard);
