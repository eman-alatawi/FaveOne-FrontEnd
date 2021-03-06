import React, { Component } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import swal from 'sweetalert';

export default class EditGender extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gender: props.gender
        }
    }
    changeHandler = (e) => {
        const attributeToChange = e.target.name;

        const newValue = e.target.value;

        const updatedGender = { ...this.state.gender }
        updatedGender[attributeToChange] = newValue;
        // console.log(updatedGender);

        this.setState({
            gender: updatedGender
        })
    }

    handleSubmit = () => {
        if (this.validate()) {
            this.props.editGender(this.state.gender)
        }
    }

    validate = () => {
        var name = document.getElementById("name").value;

        if (name === '') {
            swal("Empty!!", "The Gender Name Feild is empty!", "error")
            return false;
        } else {
            return true;
        }
    }

    render() {

        return (
            <div>
                <div class="container-sm flex flex-col justify-center my-5 bg-gray-200  rounded-2xl shadow p-10">

                    <h2 className="text-center opacity-75 text-3xl mb-5">Edit Gender</h2>
                    <Container>
                        <Form.Group as={Row} >
                            <Form.Label column sm={2}> Gender Name</Form.Label>
                            <Col sm={10}>
                                <Form.Control required id="name" type="text" name="name" value={this.state.gender.name} onChange={this.changeHandler} placeholder="Action"></Form.Control>
                            </Col>
                        </Form.Group>

                        <div className="w-full flex flex-row justify-center">
                            <Button onClick={this.handleSubmit} className="btn w-64">Edit Gender</Button>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}
