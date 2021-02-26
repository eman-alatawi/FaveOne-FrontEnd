import React, { Component } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import swal from 'sweetalert';

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

        const updatedActor = { ...this.state.actor }
        updatedActor[attributeToChange] = newValue;
        console.log(updatedActor);

        this.setState({
            actor: updatedActor
        })
    }

    handleSubmit = () => {
        if (this.validate()) {
            this.props.editActor(this.state.actor)
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

        return (
            <div className="formBG bg-cover pt-4">
                <div class="container-md w-full  flex flex-col justify-center my-5 bg-gray-200  rounded-2xl shadow p-10  ">

                    <h2 className="text-center opacity-75 mb-5">Edit Actor</h2>
                    <div className=" flex flex-row w-full mb-3">
                        <div className="w-3/4 flex flex-col">
                            <Form.Group>
                                <Form.Label className="ml-3">Full Name</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="fullName" type="text" name="fullName" value={this.state.actor.fullName} onChange={this.changeHandler} placeholder="Kim Jong woon"></Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="ml-3">Date Of Birth </Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="dateOfBirth" type="date" name="dateOfBirth" value={this.state.actor.dateOfBirth} onChange={this.changeHandler} placeholder="1984-08-24"></Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="ml-3">Gender</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="gender" as="select" name="gender" onChange={this.changeHandler}>

                                        <option value="">Select Gender</option>
                                        {this.state.actor.gender === 'Female' ? <option selected value="Female"> Female</option> : <option value="Female"> Female</option>}
                                        {this.state.actor.gender === 'Male' ? <option selected value="Male"> Male</option> : <option value="Male"> Male</option>}
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group >
                                <Form.Label className="ml-3">biography</Form.Label>
                                <Col sm={10}>
                                    <Form.Control as="textarea" id="biography" required type="text" name="biography" value={this.state.actor.biography} onChange={this.changeHandler} placeholder="About the Actor ..." className="resize-none"></Form.Control>
                                </Col>

                            </Form.Group>
                            <Form.Group >
                                <Form.Label className="ml-3">Actor Picture URL</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="picture" type="text" name="picture" value={this.state.actor.picture} onChange={this.changeHandler} placeholder="https://YesungActorImage.com/"></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group >
                                <Form.Label className="ml-3"> Social Account</Form.Label>
                                <Col sm={10}>
                                    <Form.Control required id="socialAccount" type="text" name="socialAccount" value={this.state.actor.socialAccount} onChange={this.changeHandler} placeholder="instagram: @yesung1106"></Form.Control>
                                </Col>
                            </Form.Group>


                            <div className="w-full flex flex-row justify-center">
                                <Button onClick={this.handleSubmit} className="btn w-64">Edit Actor</Button>
                            </div>
                        </div>
                        <div className="w-1/4 mr-4 flex flex-col pt-10  ">
                            <p className="text-center opacity-40">picture preview</p>

                            {/* show poster */}
                            <div className="   mb-3 flex-row flex justify-center h-72 ">
                                <img src={this.state.actor.picture} className=" bg-contain shadow-md "></img>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
