CREATE DATABASE beer_db;

USE beer_db;

CREATE TABLE beerTbl(
	id int auto_increment not null,
	name varchar(30),
	color int,
	hoppieness int, 
	style varchar(30),
	smell varchar(30),
	feel  varchar(30),
	triedThis Boolean,
	primary key(id)
);