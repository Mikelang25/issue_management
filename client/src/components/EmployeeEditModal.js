import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import API from "../utils/API";
import Modal from 'react-bootstrap/Modal';

class employeeEditModal extends Component {

    state = {

        firstName: "",
        lastName: "",
        email: "",
        title: "",
        salary: "",
        dob: "",
        hireDate: "",
        photo: null,
        photoName: ""
    }

    //changes state value based on modal form input value 
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    setPhotoHandler = (event) => {
        this.setState({
            photo: event.target.files[0],
            photoName: event.target.files[0].name
        })
        console.log(event.target.files[0])
        console.log(event.target.files[0].name)
    }

    addEmployeeHandler = (info) => {
        info.preventDefault();
        
        //creates new employee object from state items 
        let newEmployee = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            title: this.state.title,
            salary: this.state.salary,
            dob: this.state.dob,
            hireDate: this.state.hireDate,
            profilePhoto:"noimage.png"
        }

        // forms request to create new employee 
        API.updateEmployee(newEmployee)
            .then(res => {

                console.log(res)
                this.setState({
                    firstName: "",
                    lastName: "",
                    email: "",
                    title: "",
                    salary: "",
                    dob: "",
                    hireDate: "",
                    photo: null,
                    photoName:""
                })
            })
    };


    render() {

        return (
            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header style={styles.modalHead}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h2 style={styles.modalTitle}><img src="https://img.icons8.com/color/48/000000/men-age-group-5.png" />Update Employee</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={styles.modal}>
                    <div className="col-md-12">
                        <form>
                            <div className="row">
                                <div className="col-md-6">
                                    <label style={styles.labels}>First name</label><br></br>
                                    <input style={styles.inputs} type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} required></input><br></br>
                                    <label style={styles.labels}>Last name</label><br></br>
                                    <input style={styles.inputs} type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} required></input><br></br>
                                    <label style={styles.labels}>DOB</label><br></br>
                                    <input style={styles.inputs} type="text" name="dob" value={this.state.dob} onChange={this.handleInputChange} required></input><br></br>
                                    <label style={styles.labels}>Hire Date</label><br></br>
                                    <input style={styles.inputs} type="text" name="hireDate" value={this.state.hireDate} onChange={this.handleInputChange} required></input><br></br>
                                </div>
                                <div className="col-md-6">
                                    <label style={styles.labels}>Email</label><br></br>
                                    <input style={styles.inputs} type="text" name="email" value={this.state.email} onChange={this.handleInputChange} required></input><br></br>
                                    <label style={styles.labels}>Title</label><br></br>
                                    <input style={styles.inputs} type="text" name="title" value={this.state.title} onChange={this.handleInputChange} required></input><br></br>
                                    <label style={styles.labels}>Salary</label><br></br>
                                    <input style={styles.inputs} type="text" name="salary" value={this.state.salary} onChange={this.handleInputChange} required></input><br></br>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <button style={styles.button} >Update</button>
                                    <button style={styles.button} onClick={this.props.onHide}>Close</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer style={styles.modalFooter}>

                </Modal.Footer>
            </Modal>
        );
    }
}

const styles = {
    button: {
        marginTop: 20,
        marginRight: 30,
        width: "20%"
    },
    labels: {
        marginTop: 10,
        fontWeight: "bold"
    },
    inputs: {
        width: "80%"
    }
}


export default employeeEditModal;