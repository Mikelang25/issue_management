import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeCard from './employeeCard'
import API from "../utils/API"
import "./employeeTable.css"
import EmployeeModal from "./EmployeeModal"
import EmployeeEditModal from "./EmployeeEditModal"


class employeeTable extends Component {

    state = {
        employees: [],
        modalShow: false,
        modelEditShow:false
    }

    componentDidMount() {
        this.findEmployees()
    }

    findEmployees = () => {
        API.getEmployees()
            .then(res => this.setState({
                employees: res.data
            }))
    }

    showModal = () => {
        console.log("this works")
        this.setState({
            modalShow: true
        })
    }

    showEditModal = () => {
        console.log("this works")
        this.setState({
            modalEditShow: true
        })
    }

    hideModal = () => {
        this.setState({
            modalShow: false
        })
        this.findEmployees();
    }

    hideEditModal = () => {
        this.setState({
            modalEditShow: false
        })
        this.findEmployees();
    }

    renderModal() {
        return (
            <EmployeeModal show={this.state.modalShow} onHide={this.hideModal} />
        );       
    }

    renderEditModal() {
        return (
            <EmployeeEditModal show={this.state.modalEditShow} onHide={this.hideEditModal} />
        );       
    }


    render() {
        return (
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-10 employee-container text-center">
                        {this.state.employees.map(employee => (
                            <EmployeeCard
                                id = {employee.id}
                                key = {employee.id}
                                fname={employee.firstName}
                                lname={employee.lastName}
                                email={employee.email}
                                dob={employee.dob}
                                hdate={employee.hireDate}
                                tdate={employee.termDate}
                                salary={employee.salary}
                                title={employee.title}
                                photo={employee.profilePhoto}
                                unHide={this.showEditModal}
                            />
                        ))}
                    </div>
                    <div className="col-md-2 text-center">
                        <button className="btn-crt-emp" onClick={this.showModal}>Create Employee</button>
                        {this.renderModal()}
                        {this.renderEditModal()}
                    </div>
                </div>
            </div>
        );
    }

}

export default employeeTable; 