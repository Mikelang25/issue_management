module.exports = function (sequelize, DataTypes) {
    var Issue = sequelize.define('Issue', {
      created_by: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "admin"
      },
      created_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      issueTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      incidentDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      issueDescr: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      confirmDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          len: [1]
        }
      },
      supportingDoc: {
        type: DataTypes.STRING,
        allowNull: true,
      }     
    })
  
    Issue.associate = function(models) {
      Issue.belongsTo(models.Employee, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Issue
  }
  