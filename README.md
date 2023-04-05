<h1 align="center">employee-participation-backend</h1>

##  ℹ️About
This is an API REST that allows employers to register the participation rate of their employees. Data architecture, user authentication, cryptography, unitary tests and integration tests were implemented. CRUD (Create, Read, Update and Delete) requests were built respecting the semantics and organization necessary for the elaboration of an API with RESTful principles.

## 🔗Documentation

## ☑️Requests

## 💻Technologies
- TypeScript
- Node.js
- Express.js
- Knex.js
- MySQL
- Jest.js

## 🛰Running the project
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
    DB_HOST = ""
    DB_USER = ""
    DB_PASSWORD = ""
    DB_SCHEMA = ""

    PORT = 3003
    JWT_KEY = ""
    BCRYPT_COST = 12
  </code>
</pre>

To add the tables to your database, run the following command:
<pre>
  <code>npm run migrations</code>
</pre>

To initialize the project:
<pre>
  <code>npm run start</code>
</pre>

Finally, you can use Postman or another similar tool to test the endpoints.


