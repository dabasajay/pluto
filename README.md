# pluto

[![Ajay Dabas](https://img.shields.io/badge/Ajay-Dabas-825ee4.svg)](https://dabasajay.github.io/)

> **_Be like pluto, stand out from the rest._**

Pluto is a platform where college students showcase their tech projects and see what their peers are working on.

Pluto users are able to
<ul type="square">
  <li>login/signup on the platform with high security.</li>
  <li>CRUD operations on their projects.</li>
  <li>like and comment on the projects.</li>
  <li>search other projects based on technology tags, description, college, etc.</li>
</ul>

## Table of Contents

1. [Features](#1-features)
2. [ER Model](#2-er-model)
3. [Tools and Tech used](#3-tools-and-tech-used)
4. [References](#4-references)

## 1. Features

<ul type="square">
	<li>Secure JWT-based authentication and authorization.</li>
	<li>Well-defined CRUD APIs.</li>
	<li>It uses a relational database. Even though the project was built using MySQL, it's really independent of the underlying database, as long as it's a sql database and supported by Sequelize library. Some of the supported databases are PostgreSQL, MariaDB, SQLite3, Microsoft SQL Server.</li>
	<li>Robust error handling.</li>
	<li>Persistent logging of events and stack traces.</li>
	<li><strong><code>.env</code></strong> configuration file for environment variables.</li>
</ul>

## 2. ER Model

<p align="center">
  <img src="https://github.com/dabasajay/pluto/raw/master/docs/model/er_model.png" width="70%" title="ER Model of Pluto" alt="ER Model of Pluto">
</p>

## 3. Tools and Tech used

<ul type="square">
  <li>Node, Express for backend development</li>
  <li>React, Redux for frontend development</li>
  <li>MySQL database with Sequelize library for connection.</li>
	<li>MySQL workbench tool for ER modeling and database management.</li>
  <li>Postman for API testing</li>
  <li>Jest library for testing</li>
  <li>Winston logger</li>
</ul>


## 4. References

<ul type="square">
	<li><a href="https://reactjs.org/docs/getting-started.html">React Docs</a></li>
	<li><a href="https://expressjs.com/en/api.html">Express JS Docs</a></li>
	<li><a href="https://sequelize.org/master/manual/getting-started.html">Sequelize Docs</a></li>
	<li><a href="https://github.com/Redocly/redoc">Redoc</a></li>
</ul>