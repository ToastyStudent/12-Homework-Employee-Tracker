-- Seed Data used to populate the database based on what is shown in the assignment demonstration video on canvas

-- Seed Data for the Department Table
-- Due to the nature of the Schema File, as no ID is specified, the ID is automatically generated, starting at 1, and incremented by 1
-- for each subsequent entry meaning Sales has an ID of 1, Engineering has an ID of 2, Finance has an ID of 3, and Legal has an ID of 4
INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

-- Seed Data for the Role Table; Note the reference to the Department Table's Primary Key, ID, in the form of department_id
-- Due to the nature of the Schema File, as no ID is specified, the ID is automatically generated, starting at 1, and incremented by 1
-- for each subsequent entry meaning Sales Lead has an ID of 1, Salesperson has an ID of 2, Lead Engineer has an ID of 3, 
-- Software Engineer has an ID of 4, Account Manager has an ID of 5, Accountant has an ID of 6, Legal Team Lead has an ID of 7, and 
-- Lawyer has an ID of 8

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

-- Seed Data for the Employee Table; 
-- Note the reference to the Role Table's Primary Key, ID, in the form of role_id
-- Note the reference to the Employee Table's Primary Key, ID, in the form of manager_id for SOME but not ALL employees
-- Due to the nature of the Schema File, as no ID is specified, the ID is automatically generated, starting at 1, and incremented by 1
-- for each subsequent entry meaning John Doe has an ID of 1, Mike Chan has an ID of 2, Ashley Rodriguez has an ID of 3, Kevin Tupik has an ID of 4,
-- Kunal Singh has an ID of 5, Malia Brown has an ID of 6, Sarah Lourd has an ID of 7, and Tom Allen has an ID of 8

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7);
