import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeCard from './employeeCard'
import API from "../utils/API"
import "./employeeTable.css"
import EmployeeModal from "./EmployeeModal"
import EmployeeEditModal from "./EmployeeEditModal"
import EmployeeStats from "./EmployeeStats"


class employeeTable extends Component {

    state = {
        employees: [],
        modalShow: false,
        modelEditShow:false,
        selectEmployee:"",
        selectId:"",
        selectFirstName: "",
        selectLastName: "",
        selectEmail: "",
        selectTitle: "",
        selectSalary: "",
        selectDob: "",
        selectHireDate: "",
        selectPhotoName: ""
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

    deleteEmployee = (event) => {
        const employeeDelete = event.target.value
        API.deleteEmployee(employeeDelete)
            .then(res => {
                const updEmployees = this.state.employees.filter(employee => employee.id != employeeDelete)
                this.setState({
                    employees:updEmployees
                })
                console.log("Employee sucessfully deleted")
            })
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

    selectEditEmployeeHandler = (event) => {
        const select = parseInt(event.target.value)
        const selectEmployee = this.state.employees.filter(employee => employee.id === select)
        this.setState({
            selectEmployee: event.target.value,
            selectId:selectEmployee[0].id,
            selectFirstName: selectEmployee[0].firstName,
            selectLastName: selectEmployee[0].lastName, 
            selectEmail: selectEmployee[0].email,
            selectTitle: selectEmployee[0].title,
            selectSalary: selectEmployee[0].salary,
            selectDob: selectEmployee[0].dob,
            selectHireDate: selectEmployee[0].hireDate,
            selectPhotoName: selectEmployee[0].profilePhoto
        });
        console.log(selectEmployee)
        this.showEditModal();
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
    }

    renderModal() {
        return (
            <EmployeeModal 
                show={this.state.modalShow} 
                onHide={this.hideModal} 
            />
        );       
    }

    renderEditModal() {
        return (
            <EmployeeEditModal 
                employee={this.state.selectEmployee} 
                show={this.state.modalEditShow} 
                onHide={this.hideEditModal} 
                id={this.state.selectId}
                firstName={this.state.selectFirstName}
                lastName={this.state.selectLastName}
                email={this.state.selectEmail}
                title={this.state.selectTitle}
                salary={this.state.selectSalary}
                dob={this.state.selectDob}
                hireDate={this.state.selectHireDate}
                photo={this.state.selectPhotoName}
            />
        );       
    }


    render() {
        return (
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-9 employee-container text-left">
                        {this.state.employees.map(employee => (                            
                            <EmployeeCard
                                id={employee.id}
                                key={employee.id}
                                fname={employee.firstName}
                                lname={employee.lastName}
                                email={employee.email}
                                dob={employee.dob}
                                hdate={employee.hireDate}
                                tdate={employee.termDate}
                                salary={employee.salary}
                                title={employee.title}
                                photo={employee.profilePhoto}
                                unHide={this.selectEditEmployeeHandler}
                                delete={this.deleteEmployee}
                            />
                        ))}
                    </div>
                    <div className="col-md-3 text-center">
                        <button className="btn-crt-emp" onClick={this.showModal}>Create Employee</button>
                        <EmployeeStats 
                            employees={this.state.employees}
                        />
                        {this.renderModal()}
                        {this.renderEditModal()}
                    </div>
                </div>
            </div>
        );
    }

}

export default employeeTable; 