import React, { Component } from "react";
import Nav from "../navBar"
import "./accounting.css"
import PageHeader from "../PageHeader"
import AccountingTable from '../accountingTable'

class Accounting extends Component {

    state = {
        
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
                <div className="col-md-12">
                    <AccountingTable/>
                </div>
            </div>
        );
    }


}

export default Accounting;