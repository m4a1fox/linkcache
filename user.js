/**
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

/**
 * @author Maxim Bogdanov <sin666m4a1fox@gmail.com>
 */
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

EmployeeProvider = function(host, port) {
    this.db= new Db('node-link-cache', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}), {w: 1});
    this.db.open(function(){});
};


EmployeeProvider.prototype.getCollection= function(callback) {
    this.db.collection('user', function(error, employee_collection) {
        if( error ) callback(error);
        else callback(null, employee_collection);
    });
};

//find all employees
EmployeeProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, employee_collection) {
        if( error ) callback(error)
        else {
            employee_collection.find().toArray(function(error, results) {
                if( error ) callback(error)
                else callback(null, results)
            });
        }
    });
};

//save new employee
EmployeeProvider.prototype.save = function(employees, callback) {
    this.getCollection(function(error, employee_collection) {
        if( error ) callback(error)
        else {
            if( typeof(employees.length)=="undefined")
                employees = [employees];

            for( var i =0;i< employees.length;i++ ) {
                employee = employees[i];
                employee.created_at = new Date();
            }

            employee_collection.insert(employees, function() {
                callback(null, employees);
            });
        }
    });
};

exports.EmployeeProvider = EmployeeProvider;
