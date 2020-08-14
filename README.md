# Employee Database

A solution for managing a company's employees using node, inquirer, and MySQL.

## Description

Designed the following database schema containing three tables:


**department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

**role**:

  * **id** - INT PRIMARY KEY
  * **title** - VARCHAR(30) to hold role title
  * **salary** - DECIMAL to hold role salary
  * **department_id** - INT to hold reference to department role belongs to

**employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
  
Command-line application that allows the user to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update departments, roles, employees

 ### User Story 

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```


* Used the [MySQL](https://www.npmjs.com/package/mysql) NPM package to connect to my MySQL database and perform queries.

* Used [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3) NPM package to interact with the user via the command-line.

* Used [console.table](https://www.npmjs.com/package/console.table) to print MySQL rows to the console. 

## Demo

[Click Here for Walkthrough Video](https://drive.google.com/file/d/1Tev_0L5kJleeYkGJa6aW8up6A3MpZSAG/view)

