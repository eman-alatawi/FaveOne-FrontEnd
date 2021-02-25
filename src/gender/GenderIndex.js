import React, { Component } from 'react'
import Footer from '../Footer'
import EditGender from './EditGender'
import GenderRowCard from './GenderRowCard'
import { Alert } from "react-bootstrap";
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import NewGender from './NewGender'
export default class GenderIndex extends Component {
    constructor(props) {
        super(props)

        this.state = {
            genders: props.genders,
            isEdit: false,
            isAdd: false,
            clickedGenderId: '',
            errorMessage: null,
            successMessage: null,
        }
    }

    addView = () =>{
        this.setState({
            isAdd: !this.state.isAdd
        })
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
            <div className="genderBg pt-5 bg-cover">
                {errorMessage}
                {successMessage}
                <div className="h-full w-full  ">
                    <h3 className=" mb-12  text-center text-gray-900 text-3xl opacity-75 ">Movie-Drama Genders</h3>
                </div>
                <div className=" h-ful flex flex-col mx-5 my-10  ">

                    {/* partion 1 */}
                    <div className=" w-full inline-grid grid-cols-5 gap-x-2  gap-y-3 justify-around px-5 overflow-x-scroll h-3/4">
                        {this.props.isAuth ? 
                        <div>
                        <Card style={{ width: '12rem' }} className="mb-3 shadow h-24" >
                            <Card.Body className="text-center hover:bg-pink-700 hover:border-transparent hover:shadow-lg group border-2  border-dashed   border-gray-300">
                                <Card.Title className="group-hover:text-white">New Gender</Card.Title>
                                <span  onClick={this.addView} className="material-icons transform hover:scale-110 motion-reduce:transform-none cursor-pointer text-xl group-hover:text-white">add</span>
                            </Card.Body>
                        </Card>
                        </div>
                        : null}
                        {this.state.genders.map((gender, index) =>
                            <div key={index}>
                                <GenderRowCard {...gender} isAuth={this.props.isAuth} editView={this.editView} deleteGender={this.deleteGender}></GenderRowCard>
                            </div>
                        )}
                    </div>

                    {/* partion 2 */}
                    <div className=" w-full flex flex-col justify-center h-2/4 ">
                        {this.state.genders.map((gender, index) =>
                            <div key={index}>
                                {(this.state.isEdit && this.state.clickedGenderId === gender.id) ? <EditGender gender={gender} editGender={this.editGender} ></EditGender> : null}
                            </div>
                        )}

                        {this.state.isAdd ? <NewGender addGender={this.props.addGender}></NewGender> : null }
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
