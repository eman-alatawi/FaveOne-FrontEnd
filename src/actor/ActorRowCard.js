import React from 'react'
import Card from 'react-bootstrap/Card'

export default function ActorRowCard(props) {
    const year = new Date(props.dateOfBirth);
    return (
        
        <Card style={{ width: '12rem' }} className="mr-5 shadow  ">
        <Card.Img variant="top" className="h-36 w-full object-cover" src={props.picture} />
        <Card.Body className="text-center bg-indigo-50">
          <Card.Title>{props.fullName}</Card.Title>
          <Card.Text>
          {year.getFullYear()}
           </Card.Text>
        </Card.Body>
      </Card>
      
    )
}
