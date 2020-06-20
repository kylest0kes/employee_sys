INSERT INTO departments (name)
VALUES ("Sales"), ("Service"), ("IT"), ("HR"), ("Finance");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Manager", 60000, 1), ("Sales Rep", 45000, 1),
("Service Manager", 60000, 2), ("Service Tech", 45000, 2),
("IT Manager", 90000, 3), ("IT Tech", 75000, 3),
("HR Manager", 65000, 4), ("HR Rep", 50000, 4),
("Finance Manager", 85000, 5), ("Finance Rep", 70000, 5);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Kyle", "Stokes", 5), ("Johnny", "Hammersticks", 7), ("Olivia", "Pierce", 9), ("Elliot", "Alderson", 1), ("Scott", "Knowles", 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Tommy", "Noble", 6, 1), ("Samuel", "Hayden", 8, 3), ("John", "Laskey", 10, 5), ("Tyrell", "Wellick", 2, 7), ("Michael", "Scott", 4, 9);