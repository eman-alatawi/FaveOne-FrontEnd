import React from 'react'
import Card from 'react-bootstrap/Card'
import { withRouter } from 'react-router-dom';

function EpisodeRowCard(props) {


  const showTool = (props.isAuth ?
    <div className="flex flex-row justify-evenly w-full ">
      <span onClick={() => { props.deleteEpisode(props.id) }} className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black" >clear</span>
      <span onClick={() => props.detailView(props.id)} className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black" >expand_more</span>
      <span onClick={() => { props.editView(props.id) }} className="material-icons  cursor-pointer  transform hover:scale-110 motion-reduce:transform-none group-hover:text-black" >create</span>
    </div>
    : null);

  const cardImage = (props.hide ? <Card.Img variant="top" className="h-64 w-full object-cover" onClick={() => { props.hide(); props.history.push('/episodeIndex'); }} src={props.thumbnail} />
    : <Card.Img variant="top" className="h-64 w-full object-cover" src={props.thumbnail} />
  );

  return (

    <Card style={{ width: '14rem' }} className="ml-3 mr-4  shadow " >
      {cardImage}
      <Card.Body className="text-center bg-pink-900 text-gray-300 hover:bg-gray-50 hover:border-transparent hover:shadow-xl group">
        <Card.Title className="group-hover:text-gray-800  whitespace-nowrap overflow-x-scroll text-center"> Episode #{props.episodNum}</Card.Title>
        {/* called from EpisodeIndex/EpisodeSection  - Dispay Movie-Drama Title*/}
        {props.moviesDramas ?
          <div>
            {props.moviesDramas.map((md, index) =>

              md.episodes.findIndex(x => x.id == props.id) !== -1 ? <Card.Text className="group-hover:text-gray-800">{md.title} </Card.Text> : null

            )}
          </div> : null}


        {/* called from MDDetails  - Dispay Movie-Drama Title*/}
        {props.movieDrama ?
          <div className="group-hover:text-gray-800">
            {props.movieDrama.title}
          </div> : null}


        {showTool}
      </Card.Body>
    </Card>

  )
}
export default withRouter(EpisodeRowCard);

