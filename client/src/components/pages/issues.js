import React, { Component } from 'react';
import NavBar from "../navBar";
import PageHeader from "../PageHeader";
import IssuesTable from "../issueTable"



class Issues extends Component {
    
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
            <NavBar/>
        </div>
        );
    }

    

    render(){

        return(
            <div className="wrapper">
                {this.renderHeader()}
                {this.renderNavBar()}
                <div className="row">
                    <IssuesTable/>
                </div>
            </div>  
        );
    }
}


export default Issues; 