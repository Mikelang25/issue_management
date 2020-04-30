import React, { Component } from "react";


class NavTab extends Component {

    styles = {
        buttonContainer: {
            margin: "10px",
            padding: "10px",
            border: "1pt solid black",
            borderRadius: "10px"
        },
        buttonEmp: {
            width: "70%",
        },
        buttonIss: {
            width: "70%",
            marginTop: "10px"
        }
    }

    render() {
        return (
            <div className="col-md-2 text-center">
                <div style={this.styles.buttonContainer}>
                    <button style={this.styles.buttonEmp} value="employee" onClick={this.props.switchtabs}>Employees</button><br></br>
                    <button style={this.styles.buttonIss} value="issue" onClick={this.props.switchtabs}>Issues</button>
                </div>
            </div>
        );
    }


}

export default NavTab;