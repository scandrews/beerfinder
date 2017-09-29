CREATE DATABASE beer_db;

USE beer_db;

CREATE TABLE users(
	id int auto_increment not null,
	firstname varchar(255),
	lastname varchar(255),
	username text, 
	about text,
	email varchar(255),
	password varchar(255),
	last_login datetime,
	status enum('active','inactive')
);
