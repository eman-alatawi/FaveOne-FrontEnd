import React from "react";
import Card from "react-bootstrap/Card";
import { withRouter, useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Swal from 'sweetalert2'

function ImageGalleryRowCard(props) {
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
        props.deleteImageGallery(props.id);
        Swal.fire(
          'Deleted!',
          'The image has been deleted.',
          'success'
        )
      }
    })
  }

  const showTool = props.isAuth && (
    <div className="flex flex-row justify-evenly w-full ml-3 ">
      <Tooltip title="Delete Image Gallery">
        <DeleteIcon
          // onClick={() => {
          //   props.deleteImageGallery(props.id);
          // }}
          onClick={confirmDelete}
          className="p-1 rounded-full bg-pink-900  mb-1 group-hover:text-white material-icons  cursor-pointer transform hover:scale-110 motion-reduce:transform-none"
        />
      </Tooltip>

      <Tooltip title="Edit Image Gallery">
        <EditIcon
          onClick={() => {
            props.editView(props.id);
          }}
          className="p-1 rounded-full formBG  mb-1 group-hover:text-white material-icons  cursor-pointer transform hover:scale-110 motion-reduce:transform-none"
        />
      </Tooltip>
    </div>
  );

  //when user click on the image from the MDDetails, redirect to the ImageGalleryIndex
  const cardImage = (
    <Card.Img
      variant="top"
      className="h-64 w-full object-cover cursor-pointer"
      onClick={() => props.history.push("/imageGalleryIndex")}
      src={props.imageUrl}
    />
  );

  return (
    <Card className="ml-3 mr-3  shadow w-80 md:w-96 border-0">
      <div className=" p-2 flex flex-row justify-between text-center formBG text-gray-300 hover:bg-gray-50 hover:border-transparent hover:shadow-xl group cursor-pointer">
        <div>{showTool}</div>

        {/* called from ImageGalleryIndex  - Dispay Movie-Drama Title*/}
        {props.moviesDramas && (
          <div className="mr-4 ">
            {props.moviesDramas.map((md, index) => (
              <div key={index}>
                {md.imageGalleries.findIndex((x) => x.id == props.id) !==
                  -1 && (
                  <Tooltip title={`Go to ${md.title} ${md.type} details page`}>
                    <Card.Text
                      className="group-hover:text-gray-200 cursor-pointer"
                      onClick={() => {
                        history.push({
                          pathname: `/movieDramaDetails/${md.title}`,
                          movieDrama: md,
                        });
                      }}
                    >
                      {md.title}{" "}
                    </Card.Text>
                  </Tooltip>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {cardImage}
    </Card>
  );
}
export default withRouter(ImageGalleryRowCard);
