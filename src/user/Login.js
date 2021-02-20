import React, { Component } from 'react'
import { Container, Form, Button , Row, Col } from 'react-bootstrap'

export default class Login extends Component {

    //craete empty state - new version
    state = {}

    //shortest way 
    changeHandler = (e) => {
        let temp = { ... this.state }
        temp[e.target.name] = e.target.value;
        this.setState(temp)
        console.log(temp);
    }


    loginHandler = () => {
        this.props.login(this.state)
    }

    render() {
        return (

            <div class="container-sm flex flex-col justify-center my-5">

                <h2 className="text-center opacity-75 mb-2">Login for your account</h2>
                <h4 className="text-xs text-center opacity-50 mb-5">In order to use FavOne wesite with full featues, you will need to login to your account. Is this your first time? you can Join Now</h4>
                <Container>


                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Email Address</Form.Label>
                        <Col sm={10}>
                        <Form.Control type="email" name="emailAddress" onChange={this.changeHandler}></Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Password</Form.Label>
                        <Col sm={10}>
                        <Form.Control type="password" name="password" onChange={this.changeHandler}></Form.Control>
                        </Col>
                    </Form.Group>

                    <div className="w-full flex flex-row justify-center">
                    <Button onClick={this.loginHandler} className="btn w-64">Login</Button>
                    </div>
                </Container>
            </div>
        )
    }
}

