import React, { Component } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import swal from 'sweetalert';
import { Alert } from "react-bootstrap";

export default class join extends Component {
    state = {}

    changeHandler = (e) => {
        let temp = { ... this.state }
        temp[e.target.name] = e.target.value;
        this.setState(temp)
        console.log(temp);
    }

    handleSubmit = () => {
        // event.preventDefault();
        // const form = event.currentTarget;
        if (this.myFunction()) {
            console.log("inside check")
            // if (form.checkValidity() === false) {

            //     event.preventDefault();
            //     event.stopPropagation();
            //   }

            //   this.setState({
            //     setValidated: true
            //   })

            this.props.register(this.state)
        }

    }

    myFunction = (e) => {
        var userName = document.getElementById("userName").value;
        console.log("username value:" + userName);
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirmPassword").value;
        var userRole = document.getElementById("userRole").value;

        if (userName === '' || email === '' || password === '' || confirmPassword === '' || userRole === '') {
            console.log("inside if empty fields are null")
            swal("Empty!!", "Some Feilds are empty!", "error")
            return false;
        } else {
            console.log("inside else fields not null")
            if (password !== confirmPassword) {
                swal("Miss Match!", "Passwords do not match!", "error")
                return false;
            } else {
                return true;
            }

        }


    }
    render() {
        const message = this.props.message ? (
            <Alert variant="info">{this.props.message}</Alert>
        ) : null;

        return (

            <div class="container-sm flex flex-col justify-center my-5">
                {message}
                <h2 className="text-center opacity-75 mb-5">Sign up for an account</h2>
                <Container>
                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>UserName</Form.Label>
                        <Col sm={10}>
                            <Form.Control required id="userName" type="text" name="userName" onChange={this.changeHandler} placeholder="John Smith"></Form.Control>
                           
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Email Address</Form.Label>
                        <Col sm={10}>
                            <Form.Control required id="email" type="email" name="emailAddress" onChange={this.changeHandler} placeholder="JohnSmith@gmail.com"></Form.Control>
                            
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
                            <Form.Control required id="userRole" as="select" name="userRole" onChange={this.changeHandler}>
                                <option value="">Select Gender</option>
                                <option value="ROLE_USER"> User</option>
                                <option value="ROLE_ADMIN"> Admin</option>

                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <div className="w-full flex flex-row justify-center">
                        <Button type="submit" onClick={this.handleSubmit} className="btn w-64">Sign Up</Button>
                    </div>
                </Container>
            </div>

        )
    }
}
