import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { withRouter, useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import moment from "moment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Swal from "sweetalert2";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import StarIcon from "@material-ui/icons/Star";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";
function MDRowCard(props) {
  // console.log("this is props" + { props });
  const history = useHistory();
  const year = new Date(props.movieDrama.releaseYear);
  const lastUpdate = moment(props.movieDrama.updateAt);

  function confirmDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        props.deleteMD(props.movieDrama.id);
        Swal.fire(
          "Deleted!",
          `The ${props.movieDrama.type} has been deleted.`,
          "success"
        );
      }
    });
  }

  const showTool = props.isAuth &&
    props.email == props.movieDrama.user.emailAddress && (
      <div className="flex flex-row justify-evenly w-full absolute  text-gray-300">
        <Tooltip title="Delete Drama or Movie">
          <DeleteIcon
            // onClick={() => {
            //   props.deleteMD(props.movieDrama.id);
            // }}
            onClick={confirmDelete}
            className="p-1 rounded-full bg-pink-900 cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black"
          />
        </Tooltip>

        <Tooltip title="Edit Drama or Movie">
          <EditIcon
            onClick={() => {
              props.editView(props.movieDrama.id);
            }}
            className="p-1 rounded-full formBG  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black"
          />
        </Tooltip>
      </div>
    );

  const cardPopover = (
    <Card.Body className="text-left  w-full md:w-56  h-  text-gray-300  blackBg rounded-lg">
      <Card.Title className="  whitespace-normal  overflow-auto ">
        <div >
          <span className="mr-2 text-lg w-full">{props.movieDrama.title}</span>
        </div>
        <div className="my-2" ><span className="bg-pink-600 rounded-full w-max px-1 text-xs">
          {props.movieDrama.type}
        </span>
        </div>
        <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
          <div>
            <DateRangeIcon fontSize="small" className="mr-1 text-xs" />
            {props.movieDrama.duration}
          </div>
          <div>
            <AccessTimeIcon fontSize="small" className="mr-1 text-xs" />
            {year.getFullYear()}
          </div>
          <div>
            <PlayCircleFilledIcon fontSize="small" className="mr-1 text-xs" />
            {props.movieDrama.numOfEpisods} EP
          </div>
          <div>
            <StarIcon
              fontSize="small"
              className="mr-1 text-xs text-yellow-400"
            />
            {props.movieDrama.score}
          </div>
        </div>
      </Card.Title>
      <div className="mr-1 truncate  mb-2">
        <MovieFilterIcon fontSize="small" className="mr-1 " />
        {props.movieDrama.genders.map((gender, i) => (
          <span key={i} className=" text-xs mr-1">
            {gender.name}
            {i == props.movieDrama.genders.length - 1 ? "." : ","}
          </span>
        ))}
      </div>
      <p className="truncate text-xs">{props.movieDrama.description}</p>

      <span className="mr-2 text-xs text-gray-500">
        Added {lastUpdate.fromNow()}
      </span>
    </Card.Body>
  );

  //when user click on the image from the ActorDetails or from the main page in the ActorSection, redirect to the movieDramaIndex
  const cardImage = (
    <>
      <OverlayTrigger
        trigger="hover"
        placement="auto"
        onHide="null"
        overlay={cardPopover}
      >
        <Card.Img
          variant="top"
          className="h-56 md:h-96 w-full object-cover cursor-pointer "
          onClick={() => {
            history.push({
              pathname: `/movieDramaDetails/${props.movieDrama.title}`,
              movieDrama: props.movieDrama,
            });
          }}
          src={props.movieDrama.poster}
        />
      </OverlayTrigger>
      <div className="bg-red-300 opacity-85 text-gray-800 text-xs p-2 rounded-b-lg  border-fuchsia-400 absolute transform -translate-x-5 shadow-sm">
        {" "}
        {lastUpdate.fromNow()}
      </div>
      <span className="transform -translate-y-10 opacity-85">{showTool}</span>
    </>
  );

  return (
    <Card className="mx-3 mb-2 md:h-3/3 w-48 md:w-56 md:my-3 shadow-xl  transform hover:scale-110 motion-reduce:transform-none  border-0">
      {cardImage}
    </Card>
  );
}
export default withRouter(MDRowCard);
