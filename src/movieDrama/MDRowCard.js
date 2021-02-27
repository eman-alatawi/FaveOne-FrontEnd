import React from 'react'
import Card from 'react-bootstrap/Card'
import { withRouter } from 'react-router-dom';


 function MDRowCard(props) {
    const year = new Date(props.releaseYear);
    const showTool = (props.isAuth ? 
      (props.email == props.user.emailAddress ?
      <div className="flex flex-row justify-evenly w-full ">
        <span onClick={()=>{props.deleteMD(props.id)}} className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black" >clear</span>
        <span onClick={() => props.detailView(props.id)} className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black" >expand_more</span>
        <span onClick={()=>{props.editView(props.id)}} className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black" >create</span>

      </div>
      : 
      <div className="flex flex-row justify-evenly w-full ">
        <span onClick={() => props.detailView(props.id)} className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black" >expand_more</span>

      </div>)
     : null );

     const cardImage = (props.hide ?<Card.Img variant="top" className="h-64  w-full object-cover" onClick={() =>{ props.hide(); props.history.push('/movieDramaIndex');}} src={props.poster} />
      : <Card.Img variant="top" className="h-64  w-full object-cover"  src={props.poster} />
      );

    return (
      
        <Card style={{ width: '14rem' }} className="ml-3 mr-4 shadow " >
          {cardImage}
        <Card.Body className="text-center bg-pink-900 text-gray-300 hover:bg-gray-50 hover:border-transparent hover:shadow-xl group">
          <Card.Title className="group-hover:text-gray-800  whitespace-nowrap overflow-x-scroll text-center">{props.title}</Card.Title>
          <Card.Text className="group-hover:text-gray-800">
          {year.getFullYear()}
           </Card.Text>
           {showTool}
        </Card.Body>
      </Card>

      
    )
} 
export default withRouter(MDRowCard); 

