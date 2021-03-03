import React, { Component } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import Footer from '../Shared/Footer';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
class ChangePassword extends Component {

    //craete empty state - new version
    state = {
        user: {}
    }
    

    componentDidMount() {
        this.loadUser(this.props.user.sub);
    }

    loadUser = (emailAddress) => {
        axios.get(`${process.env.REACT_APP_BACK_END_URL}user/userProfile`,
            {
                params: { emailAddress: emailAddress },
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => {
                console.log("get user profile");
                console.log(response);

                this.setState({
                    user: response.data
                })
            })
            .catch(error => {
                console.log("Error while retriving user profile!!");
                console.log(error);
            })
    }


    //shortest way 
    changeHandler = (e) => {
        let temp = { ... this.state.user }
        if(e.target.name === 'oldPassword'){
            temp[e.target.name] = e.target.value;
        }else if (e.target.name === 'password'){
            temp[e.target.name] = e.target.value;
        }else{
            temp[e.target.name] = e.target.value;
        }
        this.setState({
            user: temp
        })
        console.log(temp);
    }

    validate = () => {
        var oldPassword = document.getElementById("oldPassword").value;
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirmPassword").value;

        if (oldPassword === '' || password === '' || confirmPassword === '') {
            swal("Empty!!", "Some Feilds are empty!", "error")
            return false;
        } else {
            if (password !== confirmPassword) {
                swal("Miss Match!", "The new Password and the confirm new password do not match!", "error")
                return false;
            } else {
                return true;
            }
        }
    }


    submitHandler = () => {
        if (this.validate()) {
            this.props.changePassword(this.state.user)
            this.props.show(); //show the sections in the root/home
            this.props.history.push('/');
        }
    }

    render() {

        return (
            <div className="formBG bg-cover bg-center  pt-4">
                <div class="container-sm flex flex-col justify-center my-5 bg-gray-100  rounded-2xl shadow p-10">
                    <h2 className="text-center opacity-75 text-3xl mb-2">Change Your Account's Password</h2>
                    <h4 className="text-xs text-center opacity-50 mb-5">In order to change your account's password, you should enter the Current password and the new password and confirm the new password</h4>
                    <Container>


                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Current Password</Form.Label>
                            <Col sm={9}>
                                <Form.Control required id="oldPassword" type="password" name="oldPassword" onChange={this.changeHandler} placeholder="********"></Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>New Password</Form.Label>
                            <Col sm={9}>
                                <Form.Control required id="password" type="password" name="password" onChange={this.changeHandler} placeholder="********"></Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Confirm New Password</Form.Label>
                            <Col sm={9}>
                                <Form.Control required id="confirmPassword" type="password" name="confirmPassword" onChange={this.changeHandler} placeholder="********"></Form.Control>
                            </Col>
                        </Form.Group>

                        <div className="w-full flex flex-row justify-center">
                            <Button onClick={this.submitHandler} className="btn w-64">Change Password</Button>
                        </div>
                    </Container>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
export default withRouter(ChangePassword);

