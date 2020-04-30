
module.exports = function (sequelize, DataTypes) {
    var Employee = sequelize.define('Employee', {
    
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      profilePhoto: {
        type: DataTypes.STRING,
        allowNull: true
      },
      salary: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },      
      hireDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      termDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
      }
    })
  
    Employee.associate = function(models) {
      Employee.hasMany(models.Issue, {
        onDelete: "cascade"
      });
  
    };
    return Employee
  }