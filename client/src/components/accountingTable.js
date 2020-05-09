import React, { Component } from "react";
import API from "../utils/API";
import Table from 'react-bootstrap/Table';
import Item from "./accountItem";
import "./accountingTable.css"
import { VictoryPie, VictoryChart, VictoryScatter, VictoryTheme } from "victory";
import AccountingModal from "./accountingModal";

class accountingTable extends Component {

    state = {
        totalbudgetItems: [],
        budgetItems: [],
        months: ["select", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        tranTypes: ["select", "cash deposit", "cash disbursement", "sale", "expense"],
        tranYears: ["2019", "2020", "2021"],
        selectedType: "",
        selectedMonth: "",
        selectedYear: "",
        tranAmount: "",
        tranDescr: "",
        tranDate: "",
        monthCreditTotals: [],
        monthDebitTotals: [],
        modalShow: false
    }

    componentDidMount() {
        this.getAccountingItems()
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    hideModal = () => {
        this.setState({
            modalShow: false
        })
    }

    showModal = () => {
        console.log("this works")
        this.setState({
            modalShow: true
        })
    }

    selectYearItemsLoad = (year) => {
        const selectedYear = parseInt(year);
        const selectedItems = this.state.totalbudgetItems.filter(item => item.budget_year == selectedYear)
        console.log(selectedItems)

        this.setState({
            budgetItems: selectedItems
        }, () => {
            this.getCreditTotals()
            this.getDebitTotals()
        });
    }

    selectYearItems = (event) => {
        const selectedYear = parseInt(event.target.value);
        const selectedItems = this.state.totalbudgetItems.filter(item => item.budget_year == selectedYear)
        console.log(selectedItems)

        this.setState({
            budgetItems: selectedItems
        }, () => {
            this.getCreditTotals()
            this.getDebitTotals()
        });
    }

    getCreditTotals = () => {
        console.log("getting credit totals")
        const monthTotals = []
        let distinctMonths = []
        for (var i = 0; i < this.state.budgetItems.length; i++) {
            if (!distinctMonths.includes(this.state.budgetItems[i].budget_month) && parseInt(this.state.budgetItems[i].budget_credit) > 0) {
                distinctMonths.push(this.state.budgetItems[i].budget_month)
            }

        }
        for (var k = 0; k < distinctMonths.length; k++) {
            let month = distinctMonths[k]
            let monthTotal = 0
            for (var j = 0; j < this.state.budgetItems.length; j++) {
                if (this.state.budgetItems[j].budget_month === month) {
                    monthTotal = monthTotal + parseInt(this.state.budgetItems[j].budget_credit)
                }
            }
            monthTotals.push({ month, monthTotal })
        }

        this.setState({
            monthCreditTotals: monthTotals
        });
        console.log(monthTotals)
    }

    getDebitTotals = () => {
        console.log("getting credit totals")
        const monthTotals = []
        let distinctMonths = []
        for (var i = 0; i < this.state.budgetItems.length; i++) {
            if (!distinctMonths.includes(this.state.budgetItems[i].budget_month) && parseInt(this.state.budgetItems[i].budget_debit) > 0) {
                distinctMonths.push(this.state.budgetItems[i].budget_month)
            }

        }
        for (var k = 0; k < distinctMonths.length; k++) {
            let month = distinctMonths[k]
            let monthTotal = 0
            for (var j = 0; j < this.state.budgetItems.length; j++) {
                if (this.state.budgetItems[j].budget_month === month) {
                    monthTotal = monthTotal + parseInt(this.state.budgetItems[j].budget_debit)
                }
            }
            monthTotals.push({ month, monthTotal })
        }

        this.setState({
            monthDebitTotals: monthTotals
        });
        console.log(monthTotals)
    }

    getAccountingItems = () => {
        API.findAccounting()
            .then(res => this.setState({
                totalbudgetItems: res.data
            }))
            .then(res => {
                this.selectYearItemsLoad(this.state.tranYears[0])
            })
            .catch(err => console.log(err));
    }

    removeAccountingItem = (item) => {
        console.log("this works")
        let deletedItem = item.target.value
        API.deleteAccounting(deletedItem)
            .then(res => {
                console.log("item deleted")
                let updateTotal = this.state.totalbudgetItems.filter(item => item.id != deletedItem)
                let updatedFiltered = this.state.budgetItems.filter(item => item.id != deletedItem)
                this.setState({
                    totalbudgetItems: updateTotal,
                    budgetItems: updatedFiltered
                })
                this.getCreditTotals();
                this.getDebitTotals();
            })
            .catch(err => console.log(err));
    }

    addAccountingItem = (event) => {
        event.preventDefault();
        console.log("attempting to add item")
        let dmount = ""
        let cmount = ""
        const creditType = ["cash deposit", "sale"]

        if (creditType.includes(this.state.selectedType)) {
            dmount = "0"
            cmount = this.state.tranAmount
        } else {
            dmount = this.state.tranAmount
            cmount = "0"
        }

        var todayDate = new Date().toISOString().slice(0, 10);

        let yearSelect = this.state.selectedYear

        API.postAccounting({
            budget_year: this.state.selectedYear,
            budget_month: this.state.selectedMonth,
            budget_credit: cmount,
            budget_debit: dmount,
            budget_description: this.state.selectedType,
            budget_comment: this.state.tranDescr,
            budget_tran_date: todayDate
        })
            .then(res => {
                console.log(res.data)
                let addItem = {
                    budget_year: res.data.budget_year,
                    budget_month: res.data.budget_month,
                    budget_credit: res.data.budget_credit,
                    budget_debit: res.data.budget_debit,
                    budget_description: res.data.budget_description,
                    budget_comment: res.data.budget_comment,
                    budget_tran_date: res.data.budget_tran_date
                }
                const updateTotal = this.state.totalbudgetItems
                updateTotal.push(addItem)
                const updatedFiltered = this.state.budgetItems
                updatedFiltered.push(addItem)

                this.setState({
                    selectedType: "select",
                    selectedMonth: "select",
                    selectedYear: "select",
                    tranAmount: "",
                    tranDescr: "",
                    totalbudgetItems: updateTotal,
                    budgetItems: updatedFiltered
                }, () => {
                    this.getCreditTotals()
                    this.getDebitTotals()
                });
            })
            .catch(err => console.log(err));
    }

    renderModal() {
        return (
            <AccountingModal
                show={this.state.modalShow}
                onHide={this.hideModal}
                handleInputChange={this.handleInputChange}
                months={this.state.months}
                tranYears={this.state.tranYears}
                tranTypes={this.state.tranTypes}
                selectedType={this.state.selectedType}
                selectedMonth={this.state.selectedMonth}
                selectedYear={this.state.selectedYear}
                tranAmount={this.state.tranAmount}
                tranDescr={this.state.tranDescr}
                tranDate={this.state.tranDate}
                addAccountingItem={this.addAccountingItem}
            />
        );
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12 table-container">
                    <div className="row">
                        <div>
                            <span className="lbl-sl-year">Year</span>
                            <select className="dropdown-year" defaultValue="" onChange={this.selectYearItems}>
                                {this.state.tranYears.map(year => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-7 table-hold">
                            <Table className="item-table" variant="dark" striped bordered hover size="md">
                                <thead>
                                    <tr className="table-headers">
                                        <th className="head-month">Month</th>
                                        <th className="head-date">Posted Date</th>
                                        <th className="head-amount">Credit</th>
                                        <th className="head-amount">Debit</th>
                                        <th className="head-type">Type</th>
                                        <th className="head-descr">Description</th>
                                        <th className="head-action">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="table-issue">
                                    {this.state.budgetItems.map(item => (
                                        <Item
                                            key={item.id}
                                            id={item.id}
                                            month={item.budget_month}
                                            date={item.budget_tran_date}
                                            credit={item.budget_credit}
                                            debit={item.budget_debit}
                                            trantype={item.budget_description}
                                            comment={item.budget_comment}
                                            remove={this.removeAccountingItem}
                                        />
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        <div className="col-md-5 text-center">
                            <div className="row">
                                <div className="col-md-12 text-right">
                                    <button className="btn-show" onClick={this.showModal}><img className="img-account" src="https://img.icons8.com/dusk/48/000000/transaction-list.png" /></button>
                                    {this.renderModal()}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-11 text-center graphs">
                                    <div className="row">
                                        <div className="col-md-12 text-center">
                                            <h4 className="graph-head">Cash In</h4>
                                            <VictoryPie
                                                data={
                                                    this.state.monthCreditTotals.map(item => (
                                                        { x: item.month + ' - $' + item.monthTotal, y: parseInt(item.monthTotal) }
                                                    ))}
                                                height={175}
                                                colorScale={["tomato", "orange", "red", "grey", "navy"]}
                                                style={{
                                                    labels: {
                                                        fontSize: 10, fill: "black"
                                                    }
                                                }}

                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 text-center">
                                            <h4 className="graph-head">Cash Out</h4>
                                            <VictoryPie
                                                data={
                                                    this.state.monthDebitTotals.map(item => (
                                                        { x: item.month + ' - $' + item.monthTotal, y: parseInt(item.monthTotal) }
                                                    ))}
                                                height={175}
                                                colorScale={["purple", "yellow", "red", "black", "navy"]}
                                                style={{
                                                    labels: {
                                                        fontSize: 10, fill: "black"
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default accountingTable;