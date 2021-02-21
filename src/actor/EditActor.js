import React, { Component } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'

export default class EditActor extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             actor: props.actor
        }
    }
    changeHandler = (e) => {
        const attributeToChange = e.target.name;
    
        const newValue = e.target.value;

        const updatedActor = {...this.state.actor}
        updatedActor[attributeToChange] = newValue;
        console.log(updatedActor);

        this.setState({
            actor: updatedActor
        })
    }

    handleSubmit = () => {
        this.props.editActor(this.state.actor)
    }
    render() {
        return (
            <div class="container-sm flex flex-col justify-center my-5">

            <h2 className="text-center opacity-75 mb-5">Add New Actor</h2>
            <Container>
                <Form.Group as={Row} >
                    <Form.Label column sm={2}>Full Name</Form.Label>
                    <Col sm={10}>
                        <Form.Control required type="text" name="fullName" value={this.state.actor.fullName} onChange={this.changeHandler} placeholder="Kim Jong woon"></Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Date Of Birth </Form.Label>
                    <Col sm={10}>
                        <Form.Control required type="date" name="dateOfBirth" value={this.state.actor.dateOfBirth} onChange={this.changeHandler} placeholder="1984-08-24"></Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Gender</Form.Label>
                    <Col sm={10}>
                        <Form.Control required as="select" name="gender"   onChange={this.changeHandler}>
                            <option value="">Select Gender</option>
                            <option value="Female"> Female</option>
                            <option value="Male"> Male</option>
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm={2}>biography</Form.Label>
                    <Col sm={10}>
                        <Form.Control as="textarea" required type="text" name="biography" value={this.state.actor.biography} onChange={this.changeHandler} placeholder="About the Actor ..."></Form.Control>
                    </Col>

                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Actor Picture</Form.Label>
                    <Col sm={10}>
                        <Form.Control required  type="text" name="picture" value={this.state.actor.picture} onChange={this.changeHandler} placeholder="https://YesungActorImage.com/"></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}> Social Account</Form.Label>
                    <Col sm={10}>
                        <Form.Control required type="text" name="socialAccount" value={this.state.actor.socialAccount} onChange={this.changeHandler} placeholder="instagram: @yesung1106"></Form.Control>
                    </Col>
                </Form.Group>
              

                <div className="w-full flex flex-row justify-center">
                    <Button onClick={this.handleSubmit} className="btn w-64">Edit Actor</Button>
                </div>
            </Container>
        </div>
        )
    }
}
