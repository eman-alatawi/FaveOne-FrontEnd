import React from "react";
import Card from "react-bootstrap/Card";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
export default function GenderRowCard(props) {
  const showTool = props.isAuth && (
    <div className="flex flex-col justify-evenly w-full ">
      <Tooltip title="Delete Catagory">
        <DeleteIcon
          onClick={() => {
            props.deleteGender(props.id);
          }}
          className=" mb-1 group-hover:text-white material-icons  cursor-pointer transform hover:scale-110 motion-reduce:transform-none"
          width="20"
          height="20"
        />
      </Tooltip>

      <Tooltip title="Edit Catagory">
        <EditIcon
          onClick={() => {
            props.editView(props.id);
          }}
          className=" group-hover:text-white material-icons  cursor-pointer transform hover:scale-110 motion-reduce:transform-none"
          width="20"
          height="20"
        />
      </Tooltip>
    </div>
  );

  return (
    <Card  className="mr-3 md:mb-5 shadow rounded-2xl w-48 md:w-56">
      <Card.Body className="flex flex-row bg-blue-300 text-center hover:bg-pink-700 hover:border-transparent hover:shadow-lg group border-2  border-dashed   border-gray-300">
        <Card.Title className="w-3/4 group-hover:text-white ">
          {props.name}
        </Card.Title>
        <div className="w-1/4"> {showTool}</div>
      </Card.Body>
    </Card>
  );
}
