import React from 'react'
import Card from 'react-bootstrap/Card'
import Tooltip from '@material-ui/core/Tooltip';

export default function GenderRowCard(props) {


  const showTool = (props.isAuth ?
    <div className="flex flex-col justify-evenly w-full ">
      <Tooltip title="Delete Catagory">
        <span onClick={() => { props.deleteGender(props.id) }} className=" mb-1 group-hover:text-white material-icons  cursor-pointer transform hover:scale-110 motion-reduce:transform-none" width="20" height="20">clear</span>
      </Tooltip>

      <Tooltip title="Edit Catagory">
      <span onClick={() => { props.editView(props.id) }} className=" group-hover:text-white material-icons  cursor-pointer transform hover:scale-110 motion-reduce:transform-none" width="20" height="20" >create</span>
      </Tooltip>

    </div>
    : null);


  return (

    <Card style={{ width: '14rem' }} className="mr-3 mb-5 shadow rounded-2xl" >
      <Card.Body className="flex flex-row bg-blue-300 text-center hover:bg-pink-700 hover:border-transparent hover:shadow-lg group border-2  border-dashed   border-gray-300" >
        <Card.Title className="w-3/4 group-hover:text-white ">{props.name}</Card.Title>
        <div className="w-1/4"> {showTool}</div>
      </Card.Body>
    </Card>

  )
}
