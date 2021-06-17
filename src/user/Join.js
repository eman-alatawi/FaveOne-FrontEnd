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
import { Animated } from "react-animated-css";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';


class join extends Component {
    state = {
        open: false
    }

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

    handleClickCancel = () => {
        this.props.history.push('/');

    }

    validate = () => {
        var userName = document.getElementById("userName").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirmPassword").value;
        var userRole = document.getElementById("userRole").value;

        var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


        if (userName === '' || email === '' || password === '' || confirmPassword === '' || userRole === '') {
            swal("Empty!!", "Some Feilds are empty!", "error")
            return false;
        } else if (!mailformat.test(email)) {
            swal("Email!!", "You have entered an invalid email address!", "error")
            return false;
        }
        else {
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

            <div className="  pt-4" >
                <div class="w-full mb-5">
                    <h2 className="text-center opacity-75 text-2xl mb-2">Sign up for an account</h2>
                    <h4 className="text-xs text-center opacity-50 mb-5">In order to use FavOne wesite with full featues, you will need to login to your account. Is this your first time? you can Join Now</h4>

                    <div className="flex flex-col w-4/4 items-center">

                        <TextField id="userName" label="User Name" type="text" name="userName" onChange={this.changeHandler} className="w-96 mb-3" color="primary" />

                        <TextField id="email" label="Email Address" type="email" name="emailAddress" onChange={this.changeHandler} className="w-96 mb-3" color="primary" />

                        <Tooltip title="Your password must be 8-20 characters long, contain letters and numbers, and
                                    must not contain spaces, special characters, or emoji.">
                            <TextField id="password" label="Password" type="password" name="password" onChange={this.changeHandler} className="w-96 mb-3" color="primary" />
                        </Tooltip>

                        <Tooltip title="Confirm the password, they should be matched">
                            <TextField id="confirmPassword" label="Confirm Password" type="password" name="confirmPassword" onChange={this.changeHandler} className="w-96 mb-3" color="primary" />
                        </Tooltip>

                        <Tooltip title="Click this icon to view your profile image">
                            <TextField id="profileImage" label="Profile Image" type="text" name="profileImage" onChange={this.changeHandler} className="w-96 mb-3" color="primary"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">

                                            <Animated animationIn="tada" animationInDuration={8000} isVisible={true}>
                                                <div className=" cursor-pointer transform hover:scale-110 motion-reduce:transform-none">
                                                    <ImageOutlinedIcon onClick={this.handleClickOpen} />
                                                </div>
                                            </Animated>

                                        </InputAdornment>
                                    ),
                                }} />
                        </Tooltip>

                        {/* if click on the picture icon show a dialog of the actor picture  */}
                        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
                            <div id="customized-dialog-title" onClose={this.handleClose} className="flex flex-row w-full justify-between">
                                <span className="text-xl self-center pl-2">Profile Image</span>
                                {this.state.open ? (
                                    <IconButton aria-label="close" onClick={this.handleClose}>
                                        <CloseIcon />
                                    </IconButton>
                                ) : null}
                            </div>
                            {this.state.profileImage ?
                                <img src={this.state.profileImage} />
                                :
                                <div className="flex flex-col items-center ">
                                    <InfoOutlinedIcon color="primary" /> <p className="m-4 text-blue-400">Add the URL of your profiles image first</p></div>
                            }
                        </Dialog>

                        <FormControl className="w-96 mb-3">

                            <InputLabel id="label-of-role">Are You?</InputLabel>
                            <Select
                                labelId="label-of-role"
                                name="userRole"
                                id="userRole"
                                onChange={this.changeHandler}
                            >
                                <MenuItem value="ROLE_USER">User</MenuItem>
                                <MenuItem value="ROLE_ADMIN">Admin</MenuItem>

                            </Select>
                        </FormControl>

                        <div className="flex flex-row ">
                            <Button className="w-64" onClick={this.handleClickCancel}>Cancel</Button>
                            <Button type="submit" onClick={this.handleSubmit} className=" w-64">Sign Up</Button>
                        </div>
                    </div>

                </div>
                <Footer></Footer>
            </div>

        )
    }
}
export default withRouter(join);