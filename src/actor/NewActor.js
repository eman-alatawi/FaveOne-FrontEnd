import React, { Component } from 'react'
import swal from 'sweetalert';
import Footer from '../Shared/Footer';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';


class NewActor extends Component {
    state = {
        open: false
    }
    changeHandler = (e) => {
        let temp = { ... this.state }
        temp[e.target.name] = e.target.value;
        this.setState(temp)
        // console.log(temp);
    }

    handleSubmit = () => {
        if (this.validate()) {
            this.props.addActor(this.state)
            this.props.history.push('/actorIndex');
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    };
    handleClose = () => {
        this.setState({
            open: false
        })
    };
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

                <div className="w-2/4 ml-8 mb-5" >
                    <h2 className="text-center opacity-75 text-2xl mb-3">Add New Actor</h2>
                    <div className="flex flex-col  items-center">

                        <TextField id="fullName" label="Full Name" type="text" name="fullName" onChange={this.changeHandler} className="w-96 mb-3" color="primary" />

                        <Tooltip title="Date Of Birth">
                            <TextField id="dateOfBirth" type="date" name="dateOfBirth" onChange={this.changeHandler} className="w-96 mb-3" color="primary" />
                        </Tooltip>

                        <FormControl className="w-96 mb-3">
                            <InputLabel id="label-of-gender">Gender</InputLabel>
                            <Select
                                labelId="label-of-gender"
                                name="gender"
                                id="gender"
                                onChange={this.changeHandler}
                            >
                                <MenuItem value="">None</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Male">Male</MenuItem>
                            </Select>
                        </FormControl>

                        <Tooltip title="Maximum 5000 charactor">
                        <TextField
                            className="w-96 mb-4"
                            id="biography"
                            label="Biography - about the actor"
                            rowsMax={4}
                            multiline
                            name="biography"
                            onChange={this.changeHandler}
                        />
                        </Tooltip>


                        <TextField id="picture" label="Actor Picture URL" type="text" name="picture" onChange={this.changeHandler} className="w-96 mb-3" color="primary"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Tooltip title="Click this icon to view the picture">
                                            <ImageOutlinedIcon onClick={this.handleClickOpen} />
                                        </Tooltip>
                                    </InputAdornment>
                                ),
                            }} />

                          {/* if click on the picture icon show a dialog of the actor picture  */}
                        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
                            <div id="customized-dialog-title" onClose={this.handleClose}>
                                <span className="text-xl ml-3 mr-64">Actor Picture</span>
                                {this.state.open ? (
                                    <IconButton aria-label="close" onClick={this.handleClose}>
                                        <CloseIcon />
                                    </IconButton>
                                ) : null}
                            </div>
                            <img src={this.state.picture} />
                        </Dialog>


                        <TextField id="socialAccount" label="Social Account" type="text" name="socialAccount" onChange={this.changeHandler} className="w-96 mb-4" color="primary" />
                        <Button className="w-64" onClick={this.handleSubmit}>Add Actor</Button>

                    </div>

                </div>

                <Footer></Footer>
            </div >
        )
    }
}
export default withRouter(NewActor);
