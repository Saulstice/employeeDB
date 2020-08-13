INSERT INTO departments (department_name)
VALUES ("Engineering"), ("Sales"), ("Production"), ("Administration"), ("Recruitment");

INSERT INTO roles (title, salary, department_id)
VALUES ("Software Engineer I", 70000.50, 1), ("Software Engineer II", 100000, 1), ("Senior Software Engineer", 200000, 1), 
("Sales Associate", 43000, 2), ("Sales Operation Coordinator", 50000, 2),("Director of Sales", 90000, 2),
("Robotics Technician", 50000, 3),("Mechatronics Engineer", 100000, 3), ("Production Manager", 110000, 3),
("Staffing Specialist", 56000, 4), ("HR Associate", 70000, 4), ("Chief HR Officer", 120000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Saul", "Sallah", 1, 3), ("Jim", "Bo", 2, 3), ("Bill", "Gates", 3, NULL),
("Ed", "Gar", 4, 6), ("Jay", "Zee", 5, 6),("Jeff", "Bezos", 6, NULL),
("Jimmy", "Neutron", 7, 9),("Elon", "Musk",8,9), ("Tony", "Stark", 9, NULL),
("Charles", "Xavier", 10,12), ("Jack", "Sparrow", 11,12), ("Nick", "Fury", 12, NULL);