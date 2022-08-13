DROP DATABASE IF EXISTS every_io;

CREATE DATABASE every_io;

USE every_io;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tasks;

CREATE TABLE users (
  id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  email varchar(45) NOT NULL,
  password varchar(40) NOT NULL,
  PRIMARY KEY (id)
) AUTO_INCREMENT=0;

CREATE TABLE tasks (
  id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  title varchar(30) NOT NULL DEFAULT '',
  description text DEFAULT NULL,
  status ENUM('To do', 'In Progress', 'Done', 'Archived'),
  user_id int(10) UNSIGNED NOT NULL,
  INDEX user_id_index (user_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (id)
) AUTO_INCREMENT=0;

INSERT INTO users (email, password) VALUES ('desantiagofer.02@gmail.com', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');
INSERT INTO users (email, password) VALUES ('test@gmail.com', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');