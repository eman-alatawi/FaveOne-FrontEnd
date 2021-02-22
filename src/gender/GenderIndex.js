import React, { Component } from 'react'
import Footer from '../Footer'
import EditGender from './EditGender'
import GenderRowCard from './GenderRowCard'
import { Alert } from "react-bootstrap";
import axios from 'axios';

export default class GenderIndex extends Component {
    constructor(props) {
        super(props)

        this.state = {
            genders: props.genders,
            isEdit: false,
            clickedGenderId: '',
            errorMessage: null,
            successMessage: null,
        }
    }


    editView = (id) => {
        this.setState({
            isEdit: !this.state.isEdit,
            clickedGenderId: id
        })
    }

    editGender = (gender) => {
        axios.put("/favone/mdgender/edit", gender,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => {
                console.log("edit gender");
                console.log(response);
                this.props.loadGenders();
                this.setState({
                    successMessage: "Gender Edited Successfully!!",
                    isEdit: false
                })
            })
            .catch(error => {
                console.log("error in editing gender");
                console.log(error);
                this.setState({
                    errorMessage: "Error while Editing Gender, Try again later!!"
                })
            })
    }


    deleteGender = (id) => {
        axios.delete("/favone/mdgender/delete",
            {
                params: { id: id },
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => {
                console.log("delete gender");
                console.log(response);
                this.props.loadGenders();
                this.setState({
                    successMessage: "Gender Deleted Successfully!!",
                })
            })
            .catch(error => {
                console.log("error in deleting gender");
                console.log(error);
                this.setState({
                    errorMessage: "Error while Deleting Gender, Try again later!!"
                })
            })
    }


    render() {
        const errorMessage = this.props.errorMessage ? (
            <Alert variant="danger">{this.props.errorMessage}</Alert>
        ) : null;

        const successMessage = this.props.successMessage ? (
            <Alert variant="success">{this.props.successMessage}</Alert>
        ) : null;

        return (
            <div>
                {errorMessage}
                {successMessage}
                <div className="h-full w-full  ">
                    <h3 className=" my-12  text-center text-gray-700 text-3xl">Movie-Drama Genders</h3>
                </div>
                <div className="bg-red-200 h-ful flex flex-row mx-5 my-10 ">
                    <div className="bg-blue-300 w-1/4 flex flex-col justify-around px-5 ">
                        {this.state.genders.map((gender, index) =>
                            <div key={index}>
                                <GenderRowCard {...gender} isAuth={this.props.isAuth} editView={this.editView} deleteGender={this.deleteGender}></GenderRowCard>
                            </div>
                        )}
                    </div>
                    <div className="bg-pink-300 w-9/12 flex flex-col justify-center h-72">
                        {this.state.genders.map((gender, index) =>
                            <div key={index}>
                                {(this.state.isEdit && this.state.clickedGenderId === gender.id) ? <EditGender gender={gender} editGender={this.editGender} ></EditGender> : null}
                            </div>
                        )}
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
