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
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h2><img alt="" src="https://img.icons8.com/color/48/000000/men-age-group-5.png" />Create Issue</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={styles.modal}>
                    <div className="col-md-12">
                        <form>
                            <div className="row">
                                <div className="col-md-10">
                                    <label style={styles.labels}>Select Employee</label><br></br>
                                    <select name="employee" style={styles.dropDown} onChange={this.props.onChange}>
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
                                    <label style={styles.labels}>Date Created</label><br></br>
                                    <input style={styles.inputs} name="createdDate" type="text" value={this.props.createdDate} onChange={this.props.onChange} required></input><br></br>
                                    <label style={styles.labels}>Incident Date</label><br></br>
                                    <input style={styles.inputs} name="incidentDate" type="text" value={this.props.incidentDate} onChange={this.props.onChange} required></input><br></br>
                                    <label style={styles.labels}>Description</label><br></br>
                                    <input style={styles.inputs} name="description" type="text" value={this.props.description} onChange={this.props.onChange} required></input><br></br>
                                    <label style={styles.labels}>Supporting Document</label><br></br>
                                    <input style={styles.inputs} type="file" onChange={this.props.setDoc}></input><br></br>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <button style={styles.button} onClick={this.props.submit}>Submit</button>
                                    <button style={styles.button} onClick={this.props.onHide}>Close</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </Modal.Body>
                <Modal.Footer>

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
    },    
    dropDown: {
        width: "40%"
    }
}

export default IssueModal; 