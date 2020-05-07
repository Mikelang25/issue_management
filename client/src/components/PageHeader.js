import React from 'react';

function PageHeader() {

    return (
        <div style={styles.headerContainer} className="col-md-12 text-left">
            <h1 style={styles.headMain}>HR +</h1>
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
    }
}

export default PageHeader;