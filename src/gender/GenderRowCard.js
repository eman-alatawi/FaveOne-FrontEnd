import React from "react";
import Card from "react-bootstrap/Card";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Swal from 'sweetalert2'
export default function GenderRowCard(props) {
 

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
        props.deleteGender(props.id);
        Swal.fire(
          'Deleted!',
          'The catagory has been deleted.',
          'success'
        )
      }
    })
  }

  const showTool = props.isAuth && (
    <div className="flex flex-col justify-evenly w-full text-gray-300">
      <Tooltip title="Delete Catagory">
        <DeleteIcon
          // onClick={() => {
          //   props.deleteGender(props.id);
          // }}
          onClick={confirmDelete}
          className="p-1 rounded-full bg-pink-900  mb-1 group-hover:text-white material-icons  cursor-pointer transform hover:scale-110 motion-reduce:transform-none"
          width="20"
          height="20"
        />
      </Tooltip>

      <Tooltip title="Edit Catagory">
        <EditIcon
          onClick={() => {
            props.editView(props.id);
          }}
          className="p-1 rounded-full formBG  group-hover:text-white material-icons  cursor-pointer transform hover:scale-110 motion-reduce:transform-none"
          width="20"
          height="20"
        />
      </Tooltip>
    </div>
  );

  return (
    <Card  className="mr-3 md:mb-5 shadow rounded-3xl w-48 md:w-56 border-0">
      <Card.Body className="flex flex-row formBG text-center hover:bg-pink-800 hover:border-transparent hover:shadow-lg group ">
        <Card.Title className="w-3/4 text-gray-200 group-hover:text-white ">
          {props.name}
        </Card.Title>
        <div className="w-1/4"> {showTool}</div>
      </Card.Body>
    </Card>
  );
}
