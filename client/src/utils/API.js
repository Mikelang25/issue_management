import axios from "axios";

export default {

    getEmployees: function () {
        return axios.get("/api/find/employees");
    },
    createEmployee: function (employee) {
        return axios.post("/api/employee", employee);
    },
    updateEmployee: function (employee) {
        return axios.put("/api/employee", employee);
    },
    uploadFile: function (file, employee) {
        return axios.post("/uploadfile/" + employee, file);
    },
    deleteEmployee: function (employee) {
        return axios.delete("/api/employee/" + employee)
    },
    getIssues: function (employee) {
        return axios.get("/api/find/issues/");
    },
    createIssue: function (issue) {
        return axios.post("/api/issue", issue);
    },
    deleteIssue: function (issue, employee) {
        return axios.delete("/api/issue/deleteall/" + issue + "/" + employee);
    },
    loginUser: function (info) {
        return axios.post("/api/login", {
            email: info.email,
            password: info.password
        });
    },
    createUser: function (user) {
        return axios.post("/api/signup", user);
    },
    logoutUser: function (user) {
        return axios.get("/logout", user);
    },
    findAccounting: function () {
        return axios.get("/api/find/accounting");
    },
    postAccounting: function (newItem) {
        return axios.post("/api/accounting", newItem)
    },
    deleteAccounting: function (itemID) {
        return axios.delete("/api/accounting/" + itemID)
    }
};