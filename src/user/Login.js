import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default class Login extends Component {

    //craete empty state - new version
    state = {}

    //shortest way 
    changeHandler = (e) =>{
        let temp ={... this.state}
        temp[e.target.name] = e.target.value;
        this.setState(temp)
        console.log(temp);
    }


    //jsut call the registerHandler in the App.js (it's came as props of name register ) and pass the user when [Register Button]clicked 
    loginHandler= () =>{
        this.props.login(this.state)
    }

    render() {
        return (
            <div>
                <Container>
                 

                   <Form.Group>
                       <Form.Label>Email Address</Form.Label>
                       <Form.Control type="email" name="emailAddress" onChange={this.changeHandler}></Form.Control>
                   </Form.Group>

                   <Form.Group>
                       <Form.Label>Password</Form.Label>
                       <Form.Control type="password" name="password" onChange={this.changeHandler}></Form.Control>
                   </Form.Group>


                   <Button variant="primary" block onClick={this.loginHandler}>Login</Button>
                </Container>
            </div>
        )
    }
}

