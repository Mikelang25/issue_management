USE issue_db;

INSERT INTO issues (created_by,issueTitle, incidentDate, issueDescr,createdAt, updatedAt, EmployeeId)
VALUES ("Admin", "Late for Work", "2020-04-01", "Late for work three time in 2 weeks", curdate(),curdate(),3);

INSERT INTO issues (created_by,issueTitle, incidentDate, issueDescr,createdAt, updatedAt, EmployeeId)
VALUES ("Admin", "Use of Foul Language", "2020-04-10", "Profanity use during meetings constantly", curdate(),curdate(),3)

INSERT INTO employees (firstName,lastName,email,dob,hireDate,createdAt,updatedAt)
VALUES ("Michael","Lang","michaellang2525@yahoo.com","1992-11-22","2010-08-24",curdate(),curdate());

INSERT INTO employees (firstName,lastName,email,dob,hireDate,createdAt,updatedAt)
VALUES ("Tim","Martin","michaellang2525@yahoo.com","1990-11-22","2010-08-24",curdate(),curdate());