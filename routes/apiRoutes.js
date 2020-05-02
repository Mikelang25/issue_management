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
            }, 1000)
            res.json(newEmployee)
        })
    })

    //updates an employee record
    app.put('/api/employee', function (req, res) {
        db.Employee.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            title: req.body.title,
            profilePhoto: req.body.profilePhoto,
            salary: req.body.salary,
            dob:req.body.dob,
            hireDate:req.body.hireDate
        }, {
            where: { id: req.body.id }
        }).then(function (updatedEmployee) {
            res.json(updatedEmployee)
        })
    })

    // uploads file to specified employee bucket
    app.post('/uploadfile/:employee', function (req, res) {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        let sampleFile = req.files.file;
        let selectEmployee = req.params.employee
        aws2.upload(sampleFile, selectEmployee)

    });

    //deletes a specified employee
    app.delete('/api/employee/:id', function (req, res) {
        db.Employee.destroy({ where: { id: req.params.id } }).then(function (employeeInfo) {
            res.json(employeeInfo)
        })
    })

};