DROP DATABASE IF EXISTS emptrack_db;

CREATE DATABASE emptrack_db;

USE emptrack_db;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
dept_name VARCHAR(30),
PRIMARY KEY(id)
);

CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
PRIMARY KEY(id)
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
VALUES ("Myelin", "Fern", "18", "0023"), ("Marceline", "Tulip", "22", "1134"), ("Gus", "Burton", "55", "4593"),("Gilly", "Hex", "78", "6782"), ("Pom", "Blue", "93", "98734"),("Trixy", "Chris", "25", "1026");

SELECT roles.title, roles.salary, department.dept_name FROM roles
LEFT JOIN department
ON roles.department_id = department.id; 


INSERT INTO department (dept_name)
VALUES ("Patrol"), ("Investigation"), ("Human Resources");

INSERT INTO roles (title, salary, department_id)
VALUES ("Patroller", "1000", 1), ("Investigator", "2000", 2), ("Manager","3000", 3);

SELECT employee.first_name, employee.last_name, roles.title, roles.salary, department.dept_name, manager.first_name AS manager_firstname, manager.last_name AS manager_lastname FROM employee
LEFT JOIN roles 
ON employee.role_id = roles.id
LEFT JOIN department
ON roles.department_id = department.id
LEFT JOIN employee manager 
ON employee.manager_id = manager.id;