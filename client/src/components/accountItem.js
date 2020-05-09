import React from "react";

const styles = {
    button:{
        backgroundColor: "red",
        color:"black",
        width:"30px",
        textShadow: "none",
        border:"1pt solid black",
        borderRadius:"5px"
    },
    buttonContainer:{
        textAlign:"center",
        paddingTop:"10px"
    },
    tr:{
        padding:"10px"
    },
    amount:{
        textAlign:"center"
    },
    tran:{
        textAlign:"center"
    }
}

function Item(props) {
    return (
        <tr style={styles.tr}>
            <td style={styles.tran}>{props.month}</td>
            <td style={styles.tran}>{props.date}</td>
            <td style={styles.amount}>${props.credit}</td>
            <td style={styles.amount}>${props.debit}</td>    
            <td style={styles.tran}>{props.trantype}</td>        
            <td><p style={styles.comment}>{props.comment}</p></td>
            <td style={styles.buttonContainer}><button style={styles.button} onClick={props.remove} value={props.id}><i className="fa fa-trash"></i></button></td>            
        </tr>
    );
}

export default Item;
