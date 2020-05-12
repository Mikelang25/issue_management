const db = require('../models')
const aws2 = require("../AWS")
const nodemailer = require("nodemailer");


module.exports = function (app) {

    //finds all the employees
    app.get('/api/find/employees', function (req, res) {
        db.Employee.findAll({}).then(function (resEmployees) {
            console.log("test")
            res.json(resEmployees)
        })
    })

    //creates a new employee
    app.post('/api/employee', function (req, res) {
        db.Employee.create(req.body).then(function (newEmployee) {
            console.log("employee has been added to the databse")
            aws2.create(newEmployee.id)
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
            dob: req.body.dob,
            hireDate: req.body.hireDate
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

    //finds all users 
    app.get('/api/find/issues', function (req, res) {
        db.Issue.findAll({}).then(function (respTasks) {
            res.json(respTasks)
        })
    })

    //creates new issue
    app.post('/api/issue', function (req, res) {
        db.Issue.create(req.body).then(function (newIssue) {
            // locates employee info based on EmployeeId of the new issue
            db.Employee.findOne({
                where: {
                    id: newIssue.EmployeeId
                }
            }).then(function (employee) {

                console.log(employee.email)

                const transporter = nodemailer.createTransport({
                    host: 'smtp.ethereal.email',
                    port: 587,
                    auth: {
                        user: 'dax.schneider54@ethereal.email',
                        pass: 'hnuqB5Cqg4JRcFvQeC'
                    },
                    tls: {
                        // do not fail on invalid certs
                        rejectUnauthorized: false
                    }
                });

                var mailOptions = {
                    from: 'dax.schneider54@ethereal.email',
                    to: employee.email,
                    subject: "An Issue has been created for you - " + newIssue.issueTitle,
                    html: "<p>This is to let you know that an issue has been raised regarding your conduct.<p><br>" + 
                            newIssue.incidentDate + "<br><br>" + 
                            newIssue.issueDescr + "<br>"
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                })
            })
            res.json(newIssue)
        })
    })

    //deletes a selected employee issue
    app.delete('/api/issue/deleteall/:id/:employee', function (req, res) {
        db.Issue.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (issue) {
            db.Issue.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
                res.json(dbExample)
            })
            aws2.delete(issue.supportingDoc, req.params.employee)
        })
    })


    app.post("/api/login", function (req, res) {
        db.User.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        }).then(function (user) {
            res.json(user)
        })
    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", function (req, res) {
        db.User.create({
            email: req.body.email,
            password: req.body.password
        })
            .then(function () {
                res.redirect(307, "/api/login");
            })
            .catch(function (err) {
                res.status(401).json(err);
            });
    });

    // Route for logging user out
    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });

    // creates new accounting item
    app.post('/api/accounting', function (req, res) {
        db.Budget.create(req.body).then(function (newItem) {
            console.log("create budget item")
            res.json(newItem)
        })
    })

    // deletes a selected accounting item
    app.delete('/api/accounting/:id', function (req, res) {
        db.Budget.destroy({ where: { id: req.params.id } }).then(function (accountItem) {
            res.json(accountItem)
        })
    })

    // gets all accounting items 
    app.get('/api/find/accounting', function (req, res) {
        db.Budget.findAll({}).then(function (respItems) {
            res.json(respItems)
        })
    })

};