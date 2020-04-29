const db = require('../models')



module.exports = function (app) {

//finds all the employees
app.get('/api/find/employees', function (req, res) {
    db.Employee.findAll({}).then(function (resEmployees) {
        res.json(resEmployees)
    })
})

};