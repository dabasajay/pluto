# pluto

[![Ajay Dabas](https://img.shields.io/badge/Ajay-Dabas-825ee4.svg)](https://dabasajay.github.io/)

> **_Be like pluto, stand out from the rest._**

Pluto is a platform where college students showcase their tech projects and see what their peers are working on.

<p align="center">
  <img src="https://github.com/dabasajay/pluto/raw/master/imgs/landing.png" width="80%" title="Landing page of Pluto" alt="Landing page of Pluto">
</p>

Pluto users are able to
<ul type="square">
  <li>login/signup on the platform with high security.</li>
  <li>CRUD operations on their projects.</li>
  <li>like and comment on the projects.</li>
  <li>search other projects based on technology tags, description, college, etc.</li>
  <li>see hot :fire: projects</li>
</ul>

## Table of Contents

1. [Features](#1-features)
2. [Gallery](#2-gallery)
3. [ER Model](#3-er-model)
4. [Tools and Tech used](#4-tools-and-tech-used)
5. [References](#5-references)

## 1. Features

<ul type="square">
	<li>Secure JWT-based authentication and authorization.</li>
	<li>Well-defined CRUD APIs.</li>
	<li>It uses a relational database. Even though the project was built using MySQL, it's really independent of the underlying database, as long as it's a sql database and supported by Sequelize library. Some of the supported databases are PostgreSQL, MariaDB, SQLite3, Microsoft SQL Server.</li>
	<li>Robust error handling.</li>
	<li>API Documentation (hosted on Postman)</li>
	<li>Persistent logging of events and stack traces.</li>
	<li><strong><code>.env</code></strong> configuration file for environment variables.</li>
</ul>

## 2. Gallery

<p align="center">
  <img src="https://github.com/dabasajay/pluto/raw/master/imgs/signup.png" width="70%" title="Signup page of Pluto" alt="Signup page of Pluto">
</p>

<p align="center">
  <img src="https://github.com/dabasajay/pluto/raw/master/imgs/signin.png" width="70%" title="Signin page of Pluto" alt="Signin page of Pluto">
</p>

<p align="center">
  <img src="https://github.com/dabasajay/pluto/raw/master/imgs/hot.png" width="70%" title="Hot projects page of Pluto" alt="Hot projects page of Pluto">
</p>

[See all](https://github.com/dabasajay/pluto/tree/master/imgs)

## 3. ER Model

<p align="center">
  <img src="https://github.com/dabasajay/pluto/raw/master/pluto-backend/docs/model/er_model.png" width="70%" title="ER Model of Pluto" alt="ER Model of Pluto">
</p>

## 4. Tools and Tech used

<ul type="square">
  <li>Node, Express for backend development</li>
  <li>TypeScript, React, Redux, Ant Design for frontend development</li>
  <li>MySQL database with Sequelize library for connection.</li>
	<li>MySQL workbench tool for ER modeling and database management.</li>
  <li>Postman for API testing and documentation</li>
  <li>Winston logger</li>
</ul>


## 5. References

<ul type="square">
	<li><a href="https://reactjs.org/docs/getting-started.html">React</a></li>
	<li><a href="https://ant.design/components/overview/">Ant Design</a></li>
	<li><a href="https://expressjs.com/en/api.html">Express Framework</a></li>
	<li><a href="https://sequelize.org/master/manual/getting-started.html">Sequelize</a></li>
	<li><a href="https://www.freepik.com/">Freepik</a></li>
</ul>