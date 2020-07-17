INSERT INTO department (name) VALUES (Finance);
INSERT INTO department (name) VALUES (Sales);
INSERT INTO department (name) VALUES (Tech);
INSERT INTO department (name) VALUES (Marketing);
INSERT INTO department (name) VALUES (Advertising);
INSERT INTO department (name) VALUES (Human Resources);

INSERT INTO role (title, salary, department_id) VALUES ("Chief of Finance", "230000", "1");
INSERT INTO role (title, salary, department_id) VALUES ("Financial Advisor", "80000", "1");
INSERT INTO role (title, salary, department_id) VALUES ("Sales Director", "137000", "2");
INSERT INTO role (title, salary, department_id) VALUES ("Sales Associate", "68000", "2");
INSERT INTO role (title, salary, department_id) VALUES ("Lead Engineer", "182000", "3");
INSERT INTO role (title, salary, department_id) VALUES ("Intern", "0", "3");
INSERT INTO role (title, salary, department_id) VALUES ("Marketing Director", "102000", "4");
INSERT INTO role (title, salary, department_id) VALUES ("Graphic Designer", "82000", "5");
INSERT INTO role (title, salary, department_id) VALUES ("Social Media Pro", "70100", "4");
INSERT INTO role (title, salary, department_id) VALUES ("Graphic Specialist", "88000", "5");
INSERT INTO role (title, salary, department_id) VALUES ("Human Resources Lead", "94000", "6");

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Smith", "1", "");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Harriot", "Jordan", "2", "");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Margret", "Harrison", "3", "");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Gordy", "Ragnarson", "4", "");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Raihan", "O'Roark", "5", "");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Knightengale", "6", "");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Missy", "Nelis", "7", "");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Brady", "Tomlinson", "8", "");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Candince", "Nelson", "9", "");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Brawnson", "Hilliar", "10", "");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Abigail", "Daggerty", "11", "");