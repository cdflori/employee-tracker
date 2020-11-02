DROP DATABASE IF EXISTS emptrack_db;

CREATE DATABASE emptrack_db;

USE emptrack_db;

CREATE TABLE department (
id INT PRIMARY KEY,
name VARCHAR(30)
);

CREATE TABLE roles (
id INT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INT
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT, 
manager_id INT,
PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Myelin", "Fern", "18", "1156"), ("Marceline", "Tulip", "22", "1134"), ("Gus", "Burton", "55", "0021");

SELECT first_name, last_name, department.name FROM employee
LEFT JOIN roles 
ON employee.role_id = roles.id
LEFT JOIN department
ON roles.department_id = department.id;
