import React from "react";
import Card from "react-bootstrap/Card";
import { withRouter, useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Typography from "@material-ui/core/Typography";
import Swal from 'sweetalert2'

function ActorRowCard(props) {
  const year = new Date(props.actor.dateOfBirth);
  const history = useHistory();

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
        props.deleteActor(props.actor.id);
        Swal.fire(
          'Deleted!',
          'The actor has been deleted.',
          'success'
        )
      }
    })
  }

  function countType(type) {
    const countTypes = props.actor.movieDramas.filter(movie => movie.type === type);
    return countTypes.length;
}

  const showTool = props.isAuth && (
    <div className="flex flex-row justify-evenly w-full absolute  text-gray-300">
      <Tooltip title="Delete Actor">
        <DeleteIcon
          // onClick={() => {
          //   props.deleteActor(props.actor.id);
          // }}
          onClick={confirmDelete}
          className="p-1 rounded-full bg-pink-900  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black"
        />
      </Tooltip>

      <Tooltip title="Edit Actor">
        <EditIcon
          onClick={() => {
            props.editView(props.actor.id);
          }}
          className="p-1 rounded-full formBG  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black"
        />
      </Tooltip>
    </div>
  );

  const cardPopover = (
    <Card.Body className="text-center  w-full md:w-56  h-  text-gray-300  formBG rounded-lg">
      <Card.Title className=" whitespace-normal  overflow-auto text-center">
        <Typography variant="h6" component="p">
          {props.actor.fullName}
        </Typography>
        <Typography variant="body2" component="p">
        {year.getFullYear()}
        </Typography>
      </Card.Title>
    </Card.Body>
  )

  const cardImage = (
    <>
      <OverlayTrigger trigger="hover" placement="auto-start" onHide="null" overlay={cardPopover}>
        <Card.Img
          variant="top"
          className="h-56 md:h-96 w-full  object-cover cursor-pointer"
          onClick={() => {
            history.push({
              pathname: `/actorDetails/${props.actor.fullName}`,
              actor: props.actor,
            });
          }}
          src={props.actor.picture}
        />
      </OverlayTrigger>
      <div className="bg-red-300 opacity-85 text-gray-800 text-xs p-2 rounded-b-lg  border-fuchsia-400 absolute transform -translate-x-5 shadow-sm">
        {" "}

        {countType('Movie')} {`${countType('Movie') > 1 ? 'Movies' : 'Movie'}`}  & {countType('Drama')} {`${countType('Drama') > 1 ? 'Dramas' : 'Drama'}`}
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
export default withRouter(ActorRowCard);
