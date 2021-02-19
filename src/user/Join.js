import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import swal from 'sweetalert';
export default class join extends Component {
    state = {}

    changeHandler = (e) =>{
        let temp ={... this.state}
        temp[e.target.name] = e.target.value;
        this.setState(temp)
        console.log(temp);
    }

    registerHandler= () =>{
        this.props.register(this.state)
    }

     myFunction =() =>{
        var x = document.getElementById("password").value;
        var y = document.getElementById("confirmPassword").value;
        var ok = true;
        if(x !== y)
        {
            swal("Miss Match!", "Passwords do not match!", "error")
            return false;  
        }else{
            return true;
        }
       
    }
    render() {
        return (
            <Container>
                   <Form.Group >
                       <Form.Label>UserName</Form.Label>
                       <Form.Control type="text" name="userName" onChange={this.changeHandler} placeholder="John Smith"></Form.Control>
                   </Form.Group>

                   <Form.Group>
                       <Form.Label>Email Address</Form.Label>
                       <Form.Control type="email" name="emailAddress" onChange={this.changeHandler} placeholder="JohnSmith@gmail.com"></Form.Control>
                   </Form.Group>

                   <Form.Group>
                       <Form.Label>Password</Form.Label>
                       <Form.Control id="password"  type="password" name="password" onChange={this.changeHandler} placeholder="********"></Form.Control>
                   </Form.Group>
                   <Form.Group>
                       <Form.Label>Confirm Password</Form.Label>
                       <Form.Control id="confirmPassword" type="password" name="confirmPassword" onChange={this.changeHandler} placeholder="********"></Form.Control>
                   </Form.Group>
                   <Form.Group>
                       <Form.Label> Profile Image</Form.Label>
                       <Form.Control type="text" name="profileImage" onChange={this.changeHandler} placeholder="https://ProfileImage.com/"></Form.Control>
                   </Form.Group>
                   <Form.Group>
                       <Form.Label>User Role</Form.Label>
                       <Form.Control as="select" name="userRole" onChange={this.changeHandler}>

                           <option value="">Select Role</option>
                           <option value="ROLE_ADMIN"> Admin</option>
                           <option value="ROLE_USER"> User</option>

                       </Form.Control>
                   </Form.Group>

                   <Button variant="primary" block onClick={this.registerHandler}>Register</Button>
                </Container>
            
        )
    }
}
