import React from 'react'
import Card from 'react-bootstrap/Card'
import { withRouter } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

function ImageGalleryRowCard(props) {


  const showTool = (props.isAuth ?
    <div className="flex flex-row justify-evenly w-full ml-3 ">
      <Tooltip title="Delete Image Gallery">
        <span onClick={() => { props.deleteImageGallery(props.id) }} className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black" >clear</span>
      </Tooltip>

      <Tooltip title="Edit Image Gallery">
      <span onClick={() => { props.editView(props.id) }} className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black" >create</span>
      </Tooltip>
    </div>
    : null
  );

  //when user click on the image from the MDDetails, redirect to the ImageGalleryIndex
  const cardImage = ( <Card.Img variant="top" className="h-64 w-full object-cover" onClick={() =>  props.history.push('/imageGalleryIndex')} src={props.imageUrl} />);

  return (

    <Card style={{ width: '24rem' }} className="ml-3 mr-2  shadow " >

      <div className="flex flex-row justify-between text-center bg-gray-700 text-gray-300 hover:bg-gray-50 hover:border-transparent hover:shadow-xl group">
        <div>
          {showTool}
        </div>


        {/* called from ImageGalleryIndex  - Dispay Movie-Drama Title*/}
        {props.moviesDramas ?
          <div className="mr-4">
            {props.moviesDramas.map((md, index) =>
              <div key={index}>
                {md.imageGalleries.findIndex(x => x.id == props.id) !== -1 ? <Card.Text className="group-hover:text-gray-800">{md.title} </Card.Text> : null}
              </div>
            )}
          </div> : null}


        {/* called from MDDetails  - Dispay Movie-Drama Title*/}
        {props.movieDrama ?
          <div className="group-hover:text-gray-800 w-full text-center">
            {props.movieDrama.title}
          </div> : null}


      </div>

      {cardImage}
    </Card>

  )
}
export default withRouter(ImageGalleryRowCard);

