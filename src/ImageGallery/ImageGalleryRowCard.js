import React from "react";
import Card from "react-bootstrap/Card";
import { withRouter, useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

function ImageGalleryRowCard(props) {
  const history = useHistory();

  const showTool = props.isAuth && (
    <div className="flex flex-row justify-evenly w-full ml-3 ">
      <Tooltip title="Delete Image Gallery">
        <DeleteIcon
          onClick={() => {
            props.deleteImageGallery(props.id);
          }}
          className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black"
        />
      </Tooltip>

      <Tooltip title="Edit Image Gallery">
        <EditIcon
          onClick={() => {
            props.editView(props.id);
          }}
          className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black"
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
    <Card style={{ width: "24rem" }} className="ml-3 mr-2  shadow ">
      <div className=" p-2 flex flex-row justify-between text-center bg-gray-700 text-gray-300 hover:bg-gray-50 hover:border-transparent hover:shadow-xl group cursor-pointer">
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
                      className="group-hover:text-gray-800 cursor-pointer"
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

        {/* called from MDDetails  - Dispay Movie-Drama Title*/}
        {/* {props.movieDrama && (
          <div className="group-hover:text-gray-800 w-full text-center">
            {props.movieDrama.title}
          </div>
        )} */}
      </div>

      {cardImage}
    </Card>
  );
}
export default withRouter(ImageGalleryRowCard);
