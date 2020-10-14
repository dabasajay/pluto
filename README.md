# pluto

[![Ajay Dabas](https://img.shields.io/badge/Ajay-Dabas-825ee4.svg)](https://dabasajay.github.io/)

> Be like pluto, stand out from the rest.

Pluto is a platform where college students showcase their tech projects and see what their peers are working on.

Pluto users are able to
  - login/signup on the platform with high security.
  - CRUD operations on their projects.
  - like and comment on the projects.
  - search other projects based on technology tags, description, college, etc.

## Table of Contents

1. [Features](#1-features)
2. [ER Model](#2-er-model)
3. [References](#3-references)

## 1. Features

<ul type="square">
	<li>Secure JWT-based authentication and authorization.</li>
	<li>Well-defined CRUD APIs.</li>
	<li>It uses a relational database. Even though the project was build using MySQL, it's really independent of the underlying database, as long as it's a sql-based database and supported by Sequelize library. Some of the supported databases are PostgreSQL, MariaDB, SQLite3, Microsoft SQL Server.</li>
	<li>Robust error handling.</li>
	<li>Persistent logging of events and stack traces.</li>
	<li><strong><code>.env</code></strong> configuration file for environment variables.</li>
</ul>

## 2. ER Model

<p align="center">
  <img src="https://github.com/dabasajay/pluto/raw/master/docs/model/er_model.png" width="70%" title="ER Model of Pluto" alt="ER Model of Pluto">
</p>

## 3. References

<ul type="square">
	<li><a href="https://reactjs.org/docs/getting-started.html">React Docs</a></li>
	<li><a href="https://expressjs.com/en/api.html">ExpressJS Docs</a></li>
	<li><a href="https://sequelize.org/master/manual/getting-started.html">Sequelize Docs</a></li>
	<li><a href="https://github.com/Redocly/redoc">Redoc</a></li>
</ul>