import React, { Component } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import swal from 'sweetalert';
import Footer from '../Shared/Footer';
import { withRouter } from 'react-router-dom';

 class join extends Component {
    state = {}

    changeHandler = (e) => {
        let temp = { ... this.state }
        temp[e.target.name] = e.target.value;
        this.setState(temp)
        console.log(temp);
    }

    handleSubmit = () => {

        if (this.validate()) {
            this.props.register(this.state)
            this.props.history.push('/login');
        }

    }

    validate = () => {
        var userName = document.getElementById("userName").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirmPassword").value;
        var userRole = document.getElementById("userRole").value;

        if (userName === '' || email === '' || password === '' || confirmPassword === '' || userRole === '') {
            swal("Empty!!", "Some Feilds are empty!", "error")
            return false;
        } else {
            if (password !== confirmPassword) {
                swal("Miss Match!", "Passwords do not match!", "error")
                return false;
            } else {
                return true;
            }

        }
    }
    render() {

        return (

            <div className=" formBG bg-cover bg-center  pt-4" >
            <div class="container-sm flex flex-col justify-center my-5 bg-gray-100  rounded-2xl shadow p-10">
                <h2 className="text-center opacity-75 text-3xl mb-5">Sign up for an account</h2>
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
                                <option value="">Select Your Role</option>
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
            <Footer></Footer>
            </div>

        )
    }
}
export default withRouter(join); 