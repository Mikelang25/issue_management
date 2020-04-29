import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import API from "../utils/API"
import "./employeeTable.css"


class employeeTable extends Component {

    state = {
        employees: [],
        upddatedData: []
    }
    componentDidMount() {
        this.findEmployees()
    }

    filterUpdated = (newData, filterConfiguration) => {
        this.setState({
            upddatedData: newData
        });
    }

    findEmployees = () => {
        API.getEmployees()
            .then(res => this.setState({
                employees: res.data
            }))
    }

    render() {
        return (
            <div className="col-md-10 table-container text-center">
                <Table className="table-employees" variant="dark" striped bordered hover size="md">
                    <thead className="table-head">
                        <tr className="table-headers">
                                <th className="table-head" filterkey="firstname">First Name</th>
                                <th className="table-head" filterkey="lastname">Last Name</th>
                                <th className="table-head" filterkey="email">Email</th>
                                <th className="table-head" filterkey="dob">DOB</th>
                                <th className="table-head" filterkey="hiredate">Hire Date</th>
                                <th className="table-head" filterkey="termdate">Term Date</th>
                                <th className="table-head">Action</th>
                        </tr>
                    </thead>
                    <tbody className="table-bod">
                        {this.state.employees.map(employee => (
                            <tr className = "table-records"id={employee.id}>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>{employee.dob}</td>
                                <td>{employee.hireDate}</td>
                                <td>{employee.termDate}</td>
                                <td><button value={employee.id}>Delete</button></td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </div>
        );
    }

}

export default employeeTable; 