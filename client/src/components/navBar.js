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
                    <div className="col-md-1 text-center">
                        <a className="links" href="/Employees">Employees</a>
                    </div>
                    <div className="col-md-1 text-center">
                        <a className="links" href="/Issues">Issues</a>
                    </div>
                    <div className="col-md-1 text-center">
                        <a className="links" href="">Accounting</a>
                    </div>
                    <div className="col-md-9 text-right">
                         <button style={styles.buttonSignout} onClick={this.signOutHandler}>Sign Out</button>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    buttonSignout:{
        marginRight:"10px"
    }
}

export default NavTab;