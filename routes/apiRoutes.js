const db = require('../models')
const aws2 = require("../aws")


module.exports = function (app) {

    //finds all the employees
    app.get('/api/find/employees', function (req, res) {
        db.Employee.findAll({}).then(function (resEmployees) {
            res.json(resEmployees)
        })
    })

    //creates a new employee
    app.post('/api/employee', function (req, res) {
        db.Employee.create(req.body).then(function (newEmployee) {
            console.log("employee has been added to the databse")
            aws2.create(newEmployee.id)
            setTimeout(function () {
                aws2.uploadphoto(newEmployee.id)
            }, 2000)
            res.json(newEmployee)
        })
    })

    //updates an employee record
    app.put('/api/employee', function (req, res) {
        db.Employee.update({
            emp_fname: req.body.emp_fname,
            emp_lname: req.body.emp_lname,
            emp_email: req.body.emp_email,
            emp_pay: req.body.emp_pay,
            emp_hire_date: req.body.emp_hire_date,
            emp_photo: req.body.emp_photo
        }, {
            where: { id: req.body.id }
        }).then(function (dbExample) {
            res.json(dbExample)
        })
    })

};