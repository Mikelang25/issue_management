import React, { Component } from 'react';
import API from '../utils/API'



class EmployeeStats extends Component {

    state = {
        employees: [],
        totalSalary: "",
        averageTenure: 0
    }

    componentDidUpdate(prevProps) {
        if (prevProps.employees !== this.props.employees) {
            this.totalSalaries();
            this.averageTenure();
        }
    }

    averageTenure = () => {

        let totalDays = 0;
        for (var e = 0; e < this.props.employees.length; e++) {
            // Here are the two dates to compare
            let date1 = this.props.employees[e].hireDate
            let date2 = '2018-01-01';

            // First we split the values to arrays date1[0] is the year, [1] the month and [2] the day
            date1 = date1.split('-');
            date2 = date2.split('-');

            // Now we convert the array to a Date object, which has several helpful methods
            date1 = new Date(date1[0], date1[1], date1[2]);
            date2 = new Date(date2[0], date2[1], date2[2]);

            // We use the getTime() method and get the unixtime (in milliseconds, but we want seconds, therefore we divide it through 1000)
            let date1_unixtime = parseInt(date1.getTime() / 1000);
            let date2_unixtime = parseInt(date2.getTime() / 1000);

            // This is the calculated difference in seconds
            let timeDifference = date2_unixtime - date1_unixtime;

            // in Hours
            let timeDifferenceInHours = timeDifference / 60 / 60;

            // and finaly, in days :)
            let timeDifferenceInDays = timeDifferenceInHours / 24;

            totalDays = totalDays + timeDifferenceInDays
        }
        let averageTenue = Math.abs(Math.round(totalDays / this.props.employees.length,0))/365
        averageTenue = averageTenue.toFixed(2)
        console.log("Average Tenure (days):" + averageTenue)
        this.setState({
            averageTenure:averageTenue
        })
    }

    totalSalaries = () => {

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        })

        let totalPay = 0;
        for (var i = 0; i < this.props.employees.length; i++) {
            let salaryValue = parseInt(this.props.employees[i].salary.replace(/\D/g, ''))
            console.log(salaryValue)
            totalPay = totalPay + salaryValue

        }
        let formattedTotal = formatter.format(totalPay)
        this.setState({
            totalSalary: formattedTotal
        })
    }



    render() {

        return (
            <div className="row">
                <div style={styles.statsContainer} className="col-md-11 text-center">
                    <h3 style={styles.statsHeader}>Employee Stats</h3>
                    <h6 style={styles.statsHeader}>Total Employees</h6>
                    <span>{this.props.employees.length}</span>
                    <h6 style={styles.statsHeader}>Total Salaries</h6>
                    <span>{this.state.totalSalary}</span>
                    <h6 style={styles.statsHeader}>Average Tenure</h6>
                    <span>{this.state.averageTenure} years</span>
                </div>
            </div>
        );
    }
}

const styles = {
    statsContainer: {
        border: "1pt solid black",
        marginTop: 25
    },
    statsHeader:{
        marginTop:15
    }
}

export default EmployeeStats; 