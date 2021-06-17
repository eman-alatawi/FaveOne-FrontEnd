import React from "react";
import Card from "react-bootstrap/Card";
import { withRouter, useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";

function ActorRowCard(props) {
  const year = new Date(props.actor.dateOfBirth);
  const history = useHistory();

  const showTool = props.isAuth && (
    <div className="flex flex-row justify-evenly w-full ">
      <Tooltip title="Delete Actor">
        <span
          onClick={() => {
            props.deleteActor(props.actor.id);
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
              pathname: `/actorDetails/${props.actor.fullName}`,
              actor: props.actor,
            });
          }}
          className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black"
        >
          expand_more
        </span>
      </Tooltip>

      <Tooltip title="Edit Actor">
        <span
          onClick={() => {
            props.editView(props.actor.id);
          }}
          className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black"
        >
          create
        </span>
      </Tooltip>
    </div>
  );

  const cardImage = (
    <Card.Img
      variant="top"
      className="h-64 w-full object-cover"
      onClick={() => {
        history.push({
          pathname: `/actorDetails/${props.actor.fullName}`,
          actor: props.actor,
        });
      }}
      src={props.actor.picture}
    />
  );
  return (
    <Card style={{ width: "14rem" }} className="ml-3 mr-4  shadow ">
      {cardImage}
      <Card.Body className="text-center  bg-gray-800 text-gray-300 hover:bg-gray-50 hover:border-transparent hover:shadow-xl group rounded-b-lg">
        <Card.Title className="group-hover:text-gray-800  whitespace-nowrap overflow-x-scroll text-center">
          {props.actor.fullName}
        </Card.Title>
        <Card.Text className="group-hover:text-gray-800">
          {year.getFullYear()}
        </Card.Text>
        {showTool}
      </Card.Body>
    </Card>
  );
}
export default withRouter(ActorRowCard);
