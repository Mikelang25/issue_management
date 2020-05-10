import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import API from "../utils/API";
import Modal from 'react-bootstrap/Modal';

class employeeModal extends Component {

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
            hireDate: this.state.hireDate
        }

        // forms request to create new employee 
        API.createEmployee(newEmployee)
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
                    photo: null
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
                    <Modal.Title>
                        <h2><img alt="" src="https://img.icons8.com/color/48/000000/men-age-group-5.png" />Create Employee</h2>
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
                                    <button style={styles.buttonSub} onClick={this.addEmployeeHandler}>Create</button>
                                    <button style={styles.buttonSub} onClick={this.props.onHide}>Close</button>
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
    labels: {
      fontWeight: "bold",
      marginBottom: "15px",
      color: "black",
      fontFamily: "'Playfair Display SC', serif"
    },
    inputs: {
      marginBottom: "20px",
      width: "100%",
      borderRadius: "10px",
      paddingLeft: "10px",
      fontFamily: "'Gotu', sans-serif",
      outline: "none"
    },
    descr:{
      marginBottom: "20px",
      width: "100%",
      height:"120px",
      borderRadius: "10px",
      paddingLeft: "10px",
      fontFamily: "'Gotu', sans-serif"
    },
    buttonSub: {
      marginTop: "30px",
      marginRight: "30px",
      width: "15%",
      color: "white",
      borderRadius: "5px",
      fontFamily: "'Playfair Display SC', serif",
      backgroundColor:"black",
      outline:"none"
    },
    modal: {
      backgroundImage: "URL('./dust_scratches.png')"
    },
    modalHead: {
      color: "white",
      backgroundColor:"black"
    },
    modalFooter: {
      backgroundColor: "black"
    },
    modalTitle: {
      border: "1 solid black",
      fontFamily: "'Playfair Display SC', serif",
      color: "black"
    }
  }


export default employeeModal;