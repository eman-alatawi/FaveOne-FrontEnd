import React from "react";
import Card from "react-bootstrap/Card";
import { withRouter, useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";

function MDRowCard(props) {
  console.log("this is props" + {props})
  const history = useHistory()
  const year = new Date(props.movieDrama.releaseYear);
  const showTool = props.isAuth ? (
    props.email == props.movieDrama.user.emailAddress ? (
      <div className="flex flex-row justify-evenly w-full ">
        <Tooltip title="Delete Drama or Movie">
          <span
            onClick={() => {
              props.deleteMD(props.movieDrama.id);
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
                pathname: `/movieDramaDetails/${props.movieDrama.title}`,
                movieDrama: props.movieDrama
              });
            }}
            className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black"
          >
            expand_more
          </span>
        </Tooltip>

        <Tooltip title="Edit Drama or Movie">
          <span
            onClick={() => {
              // history.push({
              //   pathname: `/movieDramaEdit/${props.movieDrama.title}`,
              //   movieDrama: props.movieDrama
              // });
              props.editView(props.movieDrama.id);
            }}
            className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black"
          >
            create
          </span>
        </Tooltip>
      </div>
    ) : (
      <div className="flex flex-row justify-evenly w-full ">
        <Tooltip title="More Details">
          <span
            onClick={() => {
              history.push({
                pathname: `/movieDramaDetails/${props.movieDrama.title}`,
                movieDrama: props.movieDrama
              });
            }}
            className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black"
          >
            expand_more
          </span>
        </Tooltip>
      </div>
    )
  ) : null;

  //when user click on the image from the ActorDetails or from the main page in the ActorSection, redirect to the movieDramaIndex
  const cardImage = (
    <Card.Img
      variant="top"
      className="h-64  w-full object-cover"
      onClick={() => {
        history.push({
        pathname: `/movieDramaDetails/${props.movieDrama.title}`,
        movieDrama: props.movieDrama
      });}}
      src={props.movieDrama.poster}
    />
  );

  return (
    <Card style={{ width: "14rem" }} className="ml-3 mr-4 shadow ">
      {cardImage}
      <Card.Body className="text-center bg-pink-900 text-gray-300 hover:bg-gray-50 hover:border-transparent hover:shadow-xl group rounded-b-lg">
        <Card.Title className="group-hover:text-gray-800  whitespace-nowrap overflow-x-scroll text-center">
          {props.movieDrama.title}
        </Card.Title>
        <Card.Text className="group-hover:text-gray-800">
          {props.movieDrama.type}
        </Card.Text>
        <Card.Text className="group-hover:text-gray-800">
          {year.getFullYear()}
        </Card.Text>
        {showTool}
      </Card.Body>
    </Card>
  );
}
export default withRouter(MDRowCard);
