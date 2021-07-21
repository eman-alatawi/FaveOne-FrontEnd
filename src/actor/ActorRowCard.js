import React from "react";
import Card from "react-bootstrap/Card";
import { withRouter, useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function ActorRowCard(props) {
  const year = new Date(props.actor.dateOfBirth);
  const history = useHistory();

  const showTool = props.isAuth && (
    <div className="flex flex-row justify-evenly w-full ">
      <Tooltip title="Delete Actor">
        <DeleteIcon
          onClick={() => {
            props.deleteActor(props.actor.id);
          }}
          className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black"
        />
      </Tooltip>

      <Tooltip title="More Details">
        <ExpandMoreIcon
          onClick={() => {
            history.push({
              pathname: `/actorDetails/${props.actor.fullName}`,
              actor: props.actor,
            });
          }}
          className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black"
        />
      </Tooltip>

      <Tooltip title="Edit Actor">
        <EditIcon
          onClick={() => {
            props.editView(props.actor.id);
          }}
          className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black"
        />
      </Tooltip>
    </div>
  );

  const cardImage = (
    <Card.Img
      variant="top"
      className="h-64 w-full object-cover cursor-pointer"
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
    <Card className="mx-3.5 md:my-3  shadow w-64 md:w-56 ">
      {cardImage}
      <Card.Body className="text-center  bg-gray-800 text-gray-300 hover:bg-gray-50 hover:border-transparent hover:shadow-xl group rounded-b-lg">
        <Card.Title className="group-hover:text-gray-800  whitespace-normal h-10 overflow-auto text-center">
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
