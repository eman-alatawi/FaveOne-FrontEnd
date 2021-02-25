import React from 'react'
import Card from 'react-bootstrap/Card'

export default function EpisodeRowCard(props) {

    
    const showTool = (props.isAuth ? 
           <div className="flex flex-row justify-evenly w-full ">
             <span onClick={()=>{props.deleteEpisode(props.id)}} className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black" >clear</span>
             <span onClick={() => props.detailView(props.id)} className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black" >expand_more</span>
             <span onClick={()=>{props.editView(props.id)}} className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black" >create</span>
           </div>
          : null );

    return (
        
        <Card style={{ width: '14rem' }} className="mr-5 shadow " >
        <Card.Img variant="top" className="h-64 w-full object-cover" src={props.thumbnail} />
        <Card.Body className="text-center bg-purple-900 text-gray-300 hover:bg-gray-50 hover:border-transparent hover:shadow-xl group">
          <Card.Title className="group-hover:text-gray-800  whitespace-nowrap overflow-x-scroll text-center"> Episode #{props.episodNum}</Card.Title>
            {props.moviesDramas.map((md, index) =>
            
           md.episodes.findIndex(x => x.id == props.id) !== -1 ? <Card.Text className="group-hover:text-gray-800">{md.title} </Card.Text> : null 

            )}
           
           {showTool}
        </Card.Body>
      </Card>
      
    )
}