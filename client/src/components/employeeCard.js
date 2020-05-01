import React from 'react';

const styles = {
    card: {
        height: "200px",
        width: "400px",
        border: "1pt solid black",
        display: "inline-block",
        marginTop:"15px",
        marginRight: "15px",
        position: "relative",
        borderRadius:"10px",
        backgroundColor:"white"
    },
    photo: {
        width: "100px",
        height:"100px",
        margin:20
    },
    button: {
        width: "20%",
        marginRight: "15px"
    },buttonContainer:{
        position:"absolute",
        bottom:"0",
        right:"0",
        width:"100%",
        padding:"10px"
    },
    photoContainer:{

    },
    infoContainer:{
        padding:"10px",
        fontSize:"80%"
    }
};

const EmployeeCard = props => {


    return (
        <div style={styles.card}>
            <div className="row">
                <div className="col-md-5 text-center">
                    <img style={styles.photo} src={props.photo ? `https://issue-management-` + props.id + `.s3.amazonaws.com/` + props.photo : "./noimage.png"}/>
                </div>
                <div style={styles.infoContainer} className="col-md-7 text-left">
                    <span>Name: {props.fname} {props.lname}</span><br></br>
                    <span>Email: {props.email}</span><br></br>
                    <span>Title: {props.title}</span><br></br> 
                    <span>Salary: {props.salary}</span><br></br> 
                    <span>Hire Date: {props.hdate}</span><br></br>                    
                </div>
            </div>
            <div style={styles.buttonContainer}>
                <button style={styles.button} value = {props.id}>Issues</button>
                <button style={styles.button} value = {props.id} onClick={props.unHide}>Edit</button>
                <button style={styles.button} value = {props.id} >Delete</button>
            </div>
        </div>
    );
}

export default EmployeeCard; 