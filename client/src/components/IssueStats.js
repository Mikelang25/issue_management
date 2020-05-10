import React, { Component } from 'react';

class IssueStats extends Component {

    state = {
        issueTotals: []
    }

    componentDidUpdate(prevProps) {
        if (prevProps.issues != this.props.issues || prevProps.employees != this.props.employees) {
            this.issueTotals()
        }
    }

    issueTotals = () => {
        const tempIssueTotals = [];
        for (var i = 0; i < this.props.employees.length; i++) {
            let issueCount = 0
            for (var e = 0; e < this.props.issues.length; e++) {
                if (this.props.issues[e].EmployeeId == this.props.employees[i].id) {
                    issueCount++
                }
                if (e === (this.props.issues.length - 1)) {
                    tempIssueTotals.push({
                        employee: this.props.employees[i].firstName + " " + this.props.employees[i].lastName,
                        totalIssues: issueCount
                    })
                }
            }
        }
        let sortedIssueTotals = [];
        sortedIssueTotals = tempIssueTotals.sort((a, b) => (b.totalIssues > a.totalIssues) ? 1 : -1)
        let portionedSortedTotals = sortedIssueTotals.slice(0, 3)
        console.log(portionedSortedTotals)
        this.setState({
            issueTotals: portionedSortedTotals
        })
    }

    render() {

        return (
            <div className="row">
                <div style={styles.statsContainer} className="col-md-11 text-center">
                    <h6 style={styles.statsHeader}>Total Issues</h6>
                    <span style={styles.isseTotal}>{this.props.issues.length}</span>
                    <h6 style={styles.statsHeader}>Top Three Offenders</h6>
                    {this.state.issueTotals.map(total => (
                        <div style={styles.offenderContainer} className="row" key={total.employees}>
                            <div className="col-md-3"></div>
                            <div className="col-md-4 text-center">
                                <span>{total.employee}</span>
                            </div>
                            <div className="col-md-5 text-left">
                                <span>{total.totalIssues}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const styles = {
    statsContainer: {
        background: "rgba(61, 59, 59, 0.4)",
        marginTop: 25,
        padding: 15,
        borderRadius:10,
        paddingBottom:35
    },
    statsHeader: {
        marginTop: 15,
        fontWeight:"bolder"
    },
    offenderContainer:{
        marginTop:20,
        fontWeight:"bolder",
        color:"white",
        fontSize:14
    },
    isseTotal:{
        fontSize:18,
        color:"white"
    }
}


export default IssueStats; 