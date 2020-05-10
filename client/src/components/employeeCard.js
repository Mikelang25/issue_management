import React from 'react';
import './employeeCard.css'

const styles = {
    card: {
        height: "175px",
        width: "400px",
        display: "inline-block",
        marginTop: "15px",
        marginLeft: "15px",
        position: "relative",
        backgroundColor: "white",
        objectFit: "contain",
        backgroundImage:"URL('./dust_scratches.png')",
        borderRadius:5,
        boxShadow: "3px 5px",
        border:"1pt solid black"
    },
    photo: {
        width: "110px",
        height: "100px",
        margin: 10,
        borderRadius:5
    },
    button: {
        width: "20%",
        marginRight: "15px",
        borderRadius:5,
        backgroundColor:"grey",
        paddingBottom:5,
        outline:"none"
    },
    buttonContainer: {
        position: "absolute",
        bottom: "0",
        right: "0",
        width: "100%",
        padding: "10px",
        textAlign:"center"
    },
    photoContainer: {
        
    },
    infoContainer: {
        padding: "10px",
        fontSize: "80%"
    },
    detailHeader: {
        fontSize:10,
        padding:0,
        fontWeight:"bold"
    },
    detailContent:{
        fontSize:12,
        padding:0,
        marginLeft:"-25px"
    }
};

const EmployeeCard = props => {

    return (
        <div style={styles.card}>
            <div className="row">
                <div style={styles.photoContainer} className="col-md-3 text-center">
                    <img alt="" style={styles.photo} src={props.photo ? `https://issue-management-` + props.id + `.s3.amazonaws.com/` + props.photo : "./noimage.png"} />
                </div>
                <div style={styles.infoContainer} className="col-md-9">
                    <div className="row">
                        <div className="col-md-4 text-right">
                            <span style={styles.detailHeader}>Name:</span>
                        </div>
                        <div className="col-md-6 text-left">
                            <span style={styles.detailContent}>{props.fname} {props.lname}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                            <span style={styles.detailHeader}>Email:</span>
                        </div>
                        <div className="col-md-6 text-left">
                            <span style={styles.detailContent}>{props.email}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                            <span style={styles.detailHeader}>Title:</span>
                        </div>
                        <div className="col-md-6 text-left">
                            <span style={styles.detailContent}>{props.title}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                            <span style={styles.detailHeader}>Salary:</span>
                        </div>
                        <div className="col-md-6 text-left">
                            <span style={styles.detailContent}>{props.salary}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-right">
                        <span style={styles.detailHeader}>Hire Date:</span>
                        </div>
                        <div className="col-md-6 text-left">
                        <span style={styles.detailContent}>{props.hdate}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div style={styles.buttonContainer}>
                <button style={styles.button} value={props.id} onClick={props.unHide}><img className="img-edit" src="https://img.icons8.com/cotton/18/000000/edit--v1.png"/></button>
                <button style={styles.button} value={props.id} onClick={props.delete}><img className="img-delete" src="https://img.icons8.com/flat_round/18/000000/delete-sign.png"/></button>
            </div>
        </div>
    );
}

export default EmployeeCard; 