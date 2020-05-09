import React, { Component } from "react";
import './navBar.css'

class NavTab extends Component {

    signOutHandler = () => {
        localStorage.removeItem('authToken')
        window.location.replace("/")
    }

    render() {
        return (
            <div className="col-md-12 link-container">
                <div  className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-1 text-center">
                        <a className="links" href="/#/Employees">EMPLOYEES</a>
                    </div>
                    <div className="col-md-1 text-center">
                        <a className="links" href="/#/Issues">ISSUES</a>
                    </div>
                    <div className="col-md-1 text-center">
                        <a className="links" href="/#/Accounting">ACCOUNTING</a>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-1 text-right">
                         <button style={styles.buttonSignout} onClick={this.signOutHandler}>SIGN OUT</button>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    buttonSignout:{
        marginRight:"10px",
        borderRadius:5,
        backgroundColor:"darkGrey",
        color:"white",
        outline:"none"
    }
}

export default NavTab;