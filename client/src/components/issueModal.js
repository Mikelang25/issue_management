import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import API from "../utils/API";
import Modal from 'react-bootstrap/Modal';
import EmployeeDropItem from './employeeDropDown'


class IssueModal extends Component {

    state = {
        employees: []
    }

    componentDidMount() {
        this.findEmployees();
    }

    findEmployees = () => {
        API.getEmployees()
            .then(res => this.setState({
                employees: res.data
            }))
    }

    render() {
        return (
            <Modal
                show={this.props.show}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header style={styles.modalHead}>
                    <Modal.Title>
                        <h2><img style={styles.image} alt="" src="https://img.icons8.com/color/48/000000/factory-breakdown.png" />Create Issue</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={styles.modal}>
                    <div className="col-md-12">
                        <form>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label style={styles.labels}>Select Employee</label><br></br>
                                            <select style={styles.inputs} defaultValue={this.props.employee} name="employee" onChange={this.props.onChange}>
                                                {this.state.employees.map(employee => (
                                                    <EmployeeDropItem
                                                        key={employee.id}
                                                        id={employee.id}
                                                        fname={employee.firstName}
                                                        lname={employee.lastName}
                                                    />
                                                ))}
                                            </select><br></br>
                                            <label style={styles.labels}>Title</label><br></br>
                                            <input style={styles.inputs} name="title" type="text" value={this.props.title} onChange={this.props.onChange} required></input><br></br>
                                        </div>
                                        <div className="col-md-6">
                                            <label style={styles.labels}>Incident Date</label><br></br>
                                            <input style={styles.inputs} name="incidentDate" type="text" value={this.props.incidentDate} onChange={this.props.onChange} required></input><br></br>
                                            <label style={styles.labels}>Date Created</label><br></br>
                                            <input style={styles.inputs} name="createdDate" type="text" value={this.props.createdDate} onChange={this.props.onChange} required></input><br></br>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label style={styles.labels}>Description</label><br></br>
                                    <input style={styles.inputs} name="description" type="text" value={this.props.description} onChange={this.props.onChange} required></input><br></br>
                                    <label style={styles.labels}>Supporting Document</label><br></br>
                                    <input style={styles.inputs} type="file" onChange={this.props.setDoc}></input><br></br>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <button style={styles.buttonSub} onClick={this.props.submit}>Submit</button>
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
        color: "black",
        outline: "none"
    },
    descr: {
        marginBottom: "20px",
        width: "100%",
        height: "120px",
        borderRadius: "10px",
        paddingLeft: "10px",
        fontFamily: "'Gotu', sans-serif",
        outline: "none"
    },
    buttonSub: {
        marginTop: "30px",
        marginRight: "30px",
        width: "15%",
        color: "white",
        borderRadius: "5px",
        fontFamily: "'Playfair Display SC', serif",
        backgroundColor: "black",
        outline: "none"
    },
    modal: {
        backgroundImage: "URL('./dust_scratches.png')"
    },
    modalHead: {
        color: "white",
        backgroundColor: "black"
    },
    modalFooter: {
        backgroundColor: "black"
    },
    modalTitle: {
        border: "1 solid black",
        fontFamily: "'Playfair Display SC', serif",
        color: "black"
    },
    image: {
        marginRight: "10px"
    }
}

export default IssueModal; 