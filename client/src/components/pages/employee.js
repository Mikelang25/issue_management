import React, { Component } from "react";
import Nav from "../navBar"
import "./employee.css"
import EmployeeTable from "../employeeTable"
import PageHeader from "../PageHeader"

class employee extends Component {

    state = {
        tab: "employee"
    }

    selectedTab = myTab => {
        const desiredTab = myTab.target.value
        this.setState({
            tab: desiredTab
        });
    }

    renderHeader () {
        return(
            <div className="row">
                <PageHeader/>
            </div>
        );
    }

    renderNavBar () {
        return (
        <div className="row">
            <Nav/>
        </div>
        );
    }

    render() {
        return (
            <div className="wrapper">
                {this.renderHeader()}
                {this.renderNavBar()}
                <div className="row">
                    <div className="col-md-1"></div>
                        <EmployeeTable />
                    <div className="col-md-1"></div>
                </div>
            </div>
        );
    }


}

export default employee;