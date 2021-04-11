import React, { Component } from 'react'
import swal from 'sweetalert';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

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
                <div class="container-sm flex flex-col w-2/4 items-center bg-white rounded-r-lg px-6 py-4 border-2  border-dashed   border-gray-300">

                    <h2 className="text-center opacity-75 text-2xl mb-5">Edit Catagory</h2>

                    <Tooltip title="catagories like: Action, History, ...etc ">
                        <TextField id="name" label="Catagory Name" type="text" name="name" value={this.state.gender.name} onChange={this.changeHandler} className="w-96 mb-5" color="primary" />
                    </Tooltip>

                    <Button onClick={this.handleSubmit} className=" w-64">Edit Catagory</Button>

                </div>
            </div>
        )
    }
}
