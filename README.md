# 12-Employee Tracker

## Description
This project was built from code provided via Northwestern University's Full-stack Development Coding Bootcamp's TAs, with me rewriting code in order to ensure I understand how to properly build the app were I to attempt to do so again under less time constraints than those I am currently under.

Specifically, I used Node.js, Inquirer, and MySQL to build a command-line application to manage a hypothetical company's employee database.

# Installation and Usage
One must first clone this Github respoitory, run npm i to install the various node_modules that allow the application to run.

Additionally, one must enter the [connnection.js file](./db/connection.js) and add in one's SQL credentials on lines 7 and 9.

Then, in a mySQL terminal, one will need to copy the contents of the [schema file](./db/schema.sql) and [seed file](./db/seed.sql) into said terminal's command line in that order.

Finally, in that same mySQL terminal one must run the command "node index" to launch the application.

After doing so, to use the app, one must engage the prompts which show up in the terminal in order to simulate the experience of accessing an employee management system by doing any number of the functions offered.

# Video Demo of App
[A video demonstration of the Application](./12-Homework-Video-Demo.webm)

# Credits
This entire project was built using code provided by Northwestern University's Full-stack Development Coding Bootcamp TAs from the following repository:

https://nu.bootcampcontent.com/NU-Coding-Bootcamp/NU-VIRT-FSF-PT-01-2023-U-LOLC/-/tree/main/00-homework-solutions/12-Main

With their express permission, I used the code provided as a template which I then modified, primarily through the renaming of elements, addition/modification of comments, and rearrangemet of variables.
