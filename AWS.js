const AWS = require('aws-sdk');

module.exports = {

    create: function (employee) {

        const bucketName = "issue-management-" + employee
        // Create S3 service object
        s3 = new AWS.S3({ apiVersion: '2006-03-01' });
        // call S3 to create the bucket
        s3.createBucket({ Bucket: bucketName }, function (err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data.Location);
            }
            
        });

    },
    upload: function (selectedFile, employeeID) {
        // Create S3 service object
        s3 = new AWS.S3({ apiVersion: '2006-03-01' });
        const bucketName = "issue-management-" + employeeID;
        var file = selectedFile.data;
        var fileName = selectedFile.name
        // call S3 to retrieve upload file to specified bucket
        var uploadParams = { Bucket: bucketName, Key: fileName, Body: file, ACL: 'public-read' };
        // call S3 to retrieve upload file to specified bucket
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                console.log("Error", err);
            } if (data) {
                console.log("Upload Success", data.Location);
            }
        });
    },
    delete: function (selectedFile, employeeID) {
        let bucketInstance = new AWS.S3();

        var params = {
            Bucket: 'issue-management-' + employeeID,
            Key: selectedFile
        };

        bucketInstance.deleteObject(params, function (err, data) {
            if (data) {
                console.log("File deleted successfully");
            }
            else {
                console.log("Check if you have sufficient permissions : " + err);
            }
        });
    },
    uploadphoto: function (employeeID) {
        s3 = new AWS.S3({ apiVersion: '2006-03-01' });

        // call S3 to retrieve upload file to specified bucket
        var uploadParams = { Bucket: 'issue-management-' + employeeID, Key: '', Body: '' , ACL: 'public-read'};
        var file = "./client/public/noimage.png"

        // Configure the file stream and obtain the upload parameters
        var fs = require('fs');
        var fileStream = fs.createReadStream(file);
        fileStream.on('error', function (err) {
            console.log('File Error', err);
        });
        uploadParams.Body = fileStream;
        var path = require('path');
        uploadParams.Key = path.basename(file);

        // call S3 to retrieve upload file to specified bucket
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                console.log("Error", err);
            } if (data) {
                console.log("Upload Success", data.Location);
            }
        });
    }
}



