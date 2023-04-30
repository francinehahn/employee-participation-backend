<h1 align="center">API REST Employee Participation: Cubo Challenge</h1>

##  ℹ️About
This is an API REST that allows employers to register the participation rate of their employees in each of their projects. Data architecture, user authentication, cryptography, unitary tests were implemented. CRUD (Create, Read, Update and Delete) requests were built respecting the semantics and organization necessary for the elaboration of an API with RESTful principles.

## 🔗Deploy
https://employee-participation.onrender.com

## 🔗Documentation
https://documenter.getpostman.com/view/26335922/2s93RWPr7s

## ☑️Requests
- Signup
- Login
- Get Account Info
- Get All Employees
- Get Employee Info
- Get Average Participation Of Each Employee
- Get Average Participation In A Project
- Register An Employee
- Register A Project
- Add Employee To A Project
- Edit Employee Status
- Edit Employee Participation In A Project
- Edit Project Info
- Delete Account
- Delete A Project
- Delete A Collaborator From A Project
- Delete An Employee From The User Account

## 💻Technologies
- TypeScript
- Node.js
- Express.js
- Mongoose
- MongoDB
- Jest.js

## 🛰 Running the project
<pre>
  <code>git clone https://github.com/francinehahn/employee-participation-backend.git</code>
</pre>

<pre>
  <code>cd employee-participation-backend</code>
</pre>

<pre>
  <code>npm install</code>
</pre>

Create a file .env and complete the following variables:
<pre>
  <code>
    DB_PASSWORD = ""
    PORT = 3003
    JWT_KEY = ""
    BCRYPT_COST = 12
  </code>
</pre>

Don't forget to create a MongoDB cluster and then add the link that was provided to you to the connection file so you can use your own database.

To initialize the project:
<pre>
  <code>npm run start</code>
</pre>

Finally, you can use Postman or another similar tool to test the endpoints.


