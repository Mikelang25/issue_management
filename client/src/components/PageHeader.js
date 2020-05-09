import React from 'react';

function PageHeader() {

    return (
        <div style={styles.headerContainer} className="col-md-12 text-left">
            <h1 style={styles.headMain}><img style={styles.image} src="https://img.icons8.com/plasticine/100/000000/gender-neutral-employee-group.png"/>HR +</h1>
        </div>
    )
}

const styles = {
    headMain:{
        marginTop:"10px",
        marginLeft:"15px"
    },    
    headerContainer:{
        backgroundColor:"black",
        color:"white",
        height:"75px"
    },
    image:{
        marginRight:"10px"
    }
}

export default PageHeader;