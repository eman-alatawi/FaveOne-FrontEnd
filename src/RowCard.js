import React from 'react'
import Card from 'react-bootstrap/Card'

export default function RowCard() {
    return (
        <Card style={{ width: '12rem' }} className="mr-5 shadow ">
        <Card.Img variant="top" className="h-36 w-full object-cover" src="https://pbs.twimg.com/media/C5VcflBUkAAauQp.jpg" />
        <Card.Body className="text-center bg-white opacity-75">
          <Card.Title>Voice</Card.Title>
          <Card.Text>
          2017
           </Card.Text>
        </Card.Body>
      </Card>
    )
}
