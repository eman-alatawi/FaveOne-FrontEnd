import React, { Component } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import swal from 'sweetalert';
import { Alert } from "react-bootstrap";
import Footer from '../Footer';

export default class NewActor extends Component {
    state = {}
    changeHandler = (e) => {
        let temp = { ... this.state }
        temp[e.target.name] = e.target.value;
        this.setState(temp)
        console.log(temp);
    }

    handleSubmit = () => {
        if (this.validate()) {
            this.props.addActor(this.state)
        }
    }

    validate = () => {
        var fullName = document.getElementById("fullName").value;
        var dateOfBirth = document.getElementById("dateOfBirth").value;
        var gender = document.getElementById("gender").value;
        var biography = document.getElementById("biography").value;
        var picture = document.getElementById("picture").value;
        var socialAccount = document.getElementById("socialAccount").value;

        if (fullName === '' || dateOfBirth === '' || gender === '' || biography === '' || picture === '' || socialAccount === '') {
            swal("Empty!!", "Some Feilds are empty!", "error")
            return false;
        } else {
            return true;
        }
    }
    render() {
        const errorMessage = this.props.errorMessage ? (
            <Alert variant="danger">{this.props.errorMessage}</Alert>
        ) : null;

        const successMessage = this.props.successMessage ? (
            <Alert variant="success">{this.props.successMessage}</Alert>
        ) : null;

        return (
            <div className="actorBg bg-cover pt-4">
            <div class="container-sm flex flex-col justify-center  bg-gray-100  rounded-2xl shadow p-10 mb-12 ">
                {errorMessage}
                {successMessage}
                <h2 className="text-center opacity-75 mb-5">Add New Actor</h2>
                <Container>
                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>Full Name</Form.Label>
                        <Col sm={10}>
                            <Form.Control required id="fullName" type="text" name="fullName" onChange={this.changeHandler} placeholder="Kim Jong woon"></Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Date Of Birth </Form.Label>
                        <Col sm={10}>
                            <Form.Control required id="dateOfBirth" type="date" name="dateOfBirth" onChange={this.changeHandler} placeholder="1984-08-24"></Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Gender</Form.Label>
                        <Col sm={10}>
                            <Form.Control required id="gender" as="select" name="gender" onChange={this.changeHandler}>
                                <option value="">Select Gender</option>
                                <option value="Female"> Female</option>
                                <option value="Male"> Male</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>biography</Form.Label>
                        <Col sm={10}>
                            <Form.Control as="textarea" id="biography" required type="text" name="biography" onChange={this.changeHandler} placeholder="About the Actor ..."></Form.Control>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Actor Picture URL</Form.Label>
                        <Col sm={10}>
                            <Form.Control required id="picture" type="text" name="picture" onChange={this.changeHandler} placeholder="https://YesungActorImage.com/"></Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}> Social Account</Form.Label>
                        <Col sm={10}>
                            <Form.Control required id="socialAccount" type="text" name="socialAccount" onChange={this.changeHandler} placeholder="instagram: @yesung1106"></Form.Control>
                        </Col>
                    </Form.Group>


                    <div className="w-full flex flex-row justify-center">
                        <Button onClick={this.handleSubmit} className="btn w-64">Add Actor</Button>
                    </div>
                </Container>
            </div>
            <Footer></Footer>
            </div>
        )
    }
}
