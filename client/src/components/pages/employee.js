import React, { Component } from "react";
import Nav from "../navBar"
import "./employee.css"
import EmployeeTable from "../employeeTable"

class employee extends Component {

    state = {
        tab:"employee"
    }

    selectedTab = myTab => {
        const desiredTab = myTab.target.value
        this.setState({
            tab: desiredTab
        });
    }

    renderPage(){
        if (this.state.tab === "employee") {
            return (
                <div className="row">
                    <div className="col-md-1"></div>
                    <EmployeeTable/>
                    <div className="col-md-1"></div>
                </div>
            );
        } else if (this.state.tab === "issue") {
            return (
                <div className="row">
                    TEST3
                </div>
            );
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="row">
                    <div className="col-md-12 text-center header-conainer">
                        <h1 className="head-main">HR Issue +</h1>
                    </div>
                </div>
                {this.renderPage()}
            </div>
        );
    }


}

export default employee;