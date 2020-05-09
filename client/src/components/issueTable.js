import React, { Component } from 'react';
import API from '../utils/API'
import './issueTable.css'
import Table from 'react-bootstrap/Table';
import IssueModal from './issueModal'
import EmployeeDropItem from './employeeDropDown'
import IssueStats from './IssueStats'

class IssueTable extends Component {

    state = {
        employees: [],
        employeeIssue: "",
        employeeIssues: [],
        issues: [],
        modalShow: false,
        employee: "",
        title: "",
        createdDate:"",
        incidentDate: "",
        description: "",
        supportingDocName: "",
        supportingDoc: []
    }

    componentDidMount() {
        this.findIssues();
        this.findEmployees();
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    selectEmployeeIssues = (event) => {
        const selectEmployee = event.target.value
        let selectIssues = this.state.issues.filter(issue => issue.EmployeeId == selectEmployee)
        this.setState({
            employeeIssue: selectEmployee,
            employeeIssues: selectIssues
        })
    }

    selectEmployeeIssuesLoad = (employee) => {
        const selectEmployee = employee
        let selectIssues = this.state.issues.filter(issue => issue.EmployeeId == selectEmployee)
        this.setState({
            employeeIssue: employee,
            employeeIssues: selectIssues
        })
    }

    findEmployees = () => {
        API.getEmployees()
            .then(res => {
                this.setState({
                    employees: res.data
                })
                let loadEmployee = this.state.employees[0].id
                this.selectEmployeeIssuesLoad(loadEmployee)
            })
    }

    findIssues = () => {
        API.getIssues()
            .then(res => {
                this.setState({
                    issues: res.data
                })
            })
    }

    setDocHandler = (event) => {

        if (event.target.files[0]) {
            console.log("getting to photo handler")
            this.setState({
                supportingDoc: event.target.files[0],
                supportingDocName: event.target.files[0].name
            })
            console.log(event.target.files[0])
            console.log(event.target.files[0].name)
        }
    }

    submitIssueHandler = (event) => {
        console.log("Submit Issue is working")

        event.preventDefault();

        //need check to see if a supporting document was selected
        if (this.state.supportingDocName != "") {
            const data = new FormData();
            const employee = this.state.employee;
            console.log(employee)
            data.append('file', this.state.supportingDoc)
            // upload photo to employee AWS bucket
            API.uploadFile(data, employee)
                .then(res => {
                    console.log("Supporting Document uploaded!")
                })
        }

        let newIssue = {
            issueTitle: this.state.title,
            created_date:this.state.createdDate,
            incidentDate: this.state.incidentDate,
            issueDescr: this.state.description,
            supportingDoc: this.state.supportingDocName,
            EmployeeId: this.state.employee
        }

        API.createIssue(newIssue)
            .then(res => {
                console.log(res)
                console.log("current employee: " + this.state.employeeIssue)
                let responseID = parseInt(res.data.EmployeeId)
                let myEmployee = parseInt(this.state.employeeIssues)
                console.log("responseID: " + responseID)
                
                let updateIssues = this.state.issues
                updateIssues.push(res.data)
                this.setState({
                    issues: updateIssues,
                    employee: "",
                    title: "",
                    createdDate: "",
                    incidentDate: "",
                    description: "",
                    supportingDocName: "",
                    supportingDoc: []
                })

                if (this.responseID === this.myEmployee) {
                    console.log("adding to already selected issues")
                    let selectUpdateIssues = this.state.employeeIssues
                    selectUpdateIssues.push(res.data)
                    this.setState({
                        employeeIssues: selectUpdateIssues
                    })
                }

                this.hideModal();
            })
    }

    showModal = () => {
        console.log("this works")
        this.setState({
            modalShow: true
        })
    }

    hideModal = () => {
        this.setState({
            modalShow: false
        })
    }

    removeIssueHandler = (event) => {
        const issueDelete = event.target.value
        const employee = this.state.employeeIssue
        console.log("delete in progress")

        API.deleteIssue(issueDelete, employee)
            .then(res => {
                const update_emp_issues = this.state.employeeIssues.filter(issue => issue.id != issueDelete)
                const update_all_issues = this.state.issues.filter(issue => issue.id != issueDelete)
                this.setState({
                    employeeIssues: update_emp_issues,
                    issues:update_all_issues
                })
                console.log(issueDelete)
                console.log(this.employeeIssues)
            })
            .catch(err => console.log(err));
    }

    renderModal() {
        return (
            <IssueModal
                employees={this.state.employees}
                title={this.state.title}
                createdDate={this.state.createdDate}
                incidentDate={this.state.incidentDate}
                description={this.state.description}
                show={this.state.modalShow}
                onHide={this.hideModal}
                onChange={this.handleInputChange}
                setDoc={this.setDocHandler}
                submit={this.submitIssueHandler}
            />
        );
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-9 main-container">
                        <div className="row">
                            <select className="emp-dropdown" name="employeeIssue" onChange={this.selectEmployeeIssues}>
                                {this.state.employees.map(employee => (
                                    <EmployeeDropItem
                                        key={employee.id}
                                        id={employee.id}
                                        fname={employee.firstName}
                                        lname={employee.lastName}
                                    />
                                ))}
                            </select>
                        </div>
                        {this.state.employeeIssues.length ? (
                            <Table striped bordered hover className="issue-table" variant="dark">
                                <thead>
                                    <tr className="table-headers">
                                        <th>Title</th>
                                        <th>Created Date</th>
                                        <th>Incident Date</th>
                                        <th>Description</th>
                                        <th>Supporting Document</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.employeeIssues.map(issue => (
                                        <tr key={issue.id}>
                                            <td>{issue.issueTitle}</td>
                                            <td className="table-date">{issue.created_date}</td>
                                            <td className="table-date">{issue.incidentDate}</td>
                                            <td>{issue.issueDescr}</td>
                                            <td className="table-date"><a className="support-doc" href={`https://issue-management-`+ issue.EmployeeId + `.s3.amazonaws.com/` + issue.supportingDoc} download>{issue.supportingDoc}</a></td>
                                            <td className="button-container"><button className="btn-delete" value={issue.id} onClick={this.removeIssueHandler}><i className="fa fa-trash"></i></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                                <div className="row">
                                    <div className="col-md-11 box-no-issues">
                                        <h2 className="text-center no-issues">No issues have been created for this employee<img className="thumbs" src="https://img.icons8.com/emoji/48/000000/thumbs-up.png" /></h2>
                                    </div>
                                </div>
                            )}
                    </div>
                    <div className="col-md-3 text-center">
                        <button className="btn-crt-iss" onClick={this.showModal}><img className="img-issue" src="https://img.icons8.com/plasticine/50/000000/file.png"/></button>
                        <IssueStats
                            employees = {this.state.employees}
                            issues = {this.state.issues}
                        />
                        {this.renderModal()}
                    </div>
                </div>
            </div>
        );
    }
}

export default IssueTable;
