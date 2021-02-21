import React, { Component } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import swal from 'sweetalert';

export default class join extends Component {
    state = {}
    changeHandler = (e) => {
        let temp = { ... this.state }
        temp[e.target.name] = e.target.value;
        this.setState(temp)
        console.log(temp);
    }

    registerHandler = () => {
        //    if(this.myFunction()) {
        this.props.register(this.state)
        //    }

    }

    myFunction = () => {
        var x = document.getElementById("password").value;
        var y = document.getElementById("confirmPassword").value;
        var ok = true;
        if (x !== y) {
            swal("Miss Match!", "Passwords do not match!", "error")
            return false;
        } else {
            return true;
        }

    }
    render() {
        return (
            <div class="container-sm flex flex-col justify-center my-5">

                <h2 className="text-center opacity-75 mb-5">Sign up for an account</h2>
                <Container>
                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>UserName</Form.Label>
                        <Col sm={10}>
                            <Form.Control required type="text" name="userName" onChange={this.changeHandler} placeholder="John Smith"></Form.Control>
                            {/* <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback> */}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Email Address</Form.Label>
                        <Col sm={10}>
                            <Form.Control required type="email" name="emailAddress" onChange={this.changeHandler} placeholder="JohnSmith@gmail.com"></Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Password</Form.Label>
                        <Col sm={10}>
                            <Form.Control required id="password" type="password" name="password" onChange={this.changeHandler} placeholder="********"></Form.Control>
                            <Form.Text id="passwordHelpBlock" muted>
                                Your password must be 8-20 characters long, contain letters and numbers, and
                                must not contain spaces, special characters, or emoji.
                            </Form.Text>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Confirm Password</Form.Label>
                        <Col sm={10}>
                            <Form.Control required id="confirmPassword" type="password" name="confirmPassword" onChange={this.changeHandler} placeholder="********"></Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}> Profile Image</Form.Label>
                        <Col sm={10}>
                            <Form.Control required type="text" name="profileImage" onChange={this.changeHandler} placeholder="https://ProfileImage.com/"></Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Are You?</Form.Label>
                        <Col sm={10}>
                            <Form.Control required as="select" name="userRole" onChange={this.changeHandler}>
                                <option value="">Select Role</option>
                                <option value="ROLE_ADMIN"> Admin</option>
                                <option value="ROLE_USER"> User</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <div className="w-full flex flex-row justify-center">
                        <Button onClick={this.registerHandler} className="btn w-64">Sign Up</Button>
                    </div>
                </Container>
            </div>

        )
    }
}
