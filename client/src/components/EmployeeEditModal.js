import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import API from "../utils/API";
import Modal from 'react-bootstrap/Modal';

class employeeEditModal extends Component {

    state = {
        id: "",
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

    // updating state of edit modal each time a new employee is selected
    componentDidUpdate(prevProps) {
        if (prevProps.employee !== this.props.employee) {
            console.log("employee value has changed!")
            this.setState({
                id: this.props.employee,
                firstName: this.props.firstName,
                lastName: this.props.lastName,
                email: this.props.email,
                title: this.props.title,
                salary: this.props.salary,
                dob: this.props.dob,
                hireDate: this.props.hireDate,
                photoName: this.props.photo,
                photo: []
            })
        }
    }


    //changes state value based on modal form input value 
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    setPhotoHandler = (event) => {

        if (event.target.files[0]) {
            console.log("getting to photo handler")
            this.setState({
                photo: event.target.files[0],
                photoName: event.target.files[0].name
            })
            console.log(event.target.files[0])
            console.log(event.target.files[0].name)
        }
    }

    updateEmployeeHandler = (info) => {

        info.preventDefault();

        //need check to see if a new profile picture was selected
        if (this.state.photo != "") {
            const data = new FormData();
            const employee = this.state.id;
            console.log(employee)
            data.append('file', this.state.photo)
            // upload photo to employee AWS bucket
            API.uploadFile(data, employee)
                .then(res => {
                    console.log("Profile photo uploaded!")
                })
        }

        //creates new employee object from state items 
        let updatedEmployee = {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            title: this.state.title,
            salary: this.state.salary,
            dob: this.state.dob,
            hireDate: this.state.hireDate,
            profilePhoto: this.state.photoName
        }

        // forms request to update a specific employee record
        API.updateEmployee(updatedEmployee)
            .then(res => {
                console.log("Employee Updated!")
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
                        <h2 style={styles.modalTitle}><img alt="" src="https://img.icons8.com/color/48/000000/men-age-group-5.png" />Update Employee</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={styles.modal}>
                    <div className="col-md-12">
                        <form>
                            <div className="row">
                                <div className="col-md-6">
                                    <label style={styles.labels}>First name</label><br></br>
                                    <input style={styles.inputs} type="text" name="firstName" defaultValue={this.state.firstName} onChange={this.handleInputChange} required></input><br></br>
                                    <label style={styles.labels}>Last name</label><br></br>
                                    <input style={styles.inputs} type="text" name="lastName" defaultValue={this.state.lastName} onChange={this.handleInputChange} required></input><br></br>
                                    <label style={styles.labels}>DOB</label><br></br>
                                    <input style={styles.inputs} type="text" name="dob" defaultValue={this.state.dob} onChange={this.handleInputChange} required></input><br></br>
                                    <label style={styles.labels}>Hire Date</label><br></br>
                                    <input style={styles.inputs} type="text" name="hireDate" defaultValue={this.state.hireDate} onChange={this.handleInputChange} required></input><br></br>
                                </div>
                                <div className="col-md-6">
                                    <label style={styles.labels}>Email</label><br></br>
                                    <input style={styles.inputs} type="text" name="email" defaultValue={this.state.email} onChange={this.handleInputChange} required></input><br></br>
                                    <label style={styles.labels}>Title</label><br></br>
                                    <input style={styles.inputs} type="text" name="title" defaultValue={this.state.title} onChange={this.handleInputChange} required></input><br></br>
                                    <label style={styles.labels}>Salary</label><br></br>
                                    <input style={styles.inputs} type="text" name="salary" defaultValue={this.state.salary} onChange={this.handleInputChange} required></input><br></br>
                                    <label style={styles.labels}>Profile Photo</label><br></br>
                                    <input style={styles.inputs} type="file" name="photo" defaultValue={this.state.photo} onChange={this.setPhotoHandler}></input><br></br>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <button style={styles.button} onClick={this.updateEmployeeHandler}>Update</button>
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