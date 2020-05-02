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
    deleteEmployee: function(employee){
      return axios.delete("/api/employee/" + employee)
    }
};