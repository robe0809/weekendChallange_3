CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	description VARCHAR (255) NOT NULL,
	complete VARCHAR(1) DEFAULT 'N'
);

DROP TABLE tasks;

INSERT INTO tasks (description, complete)
VALUES ('go to the gym', 'N'), ('get groceries', 'N'), ('get dog food', 'N'), ('finished weekend challenge Number 3', 'N');

SELECT * FROM tasks WHERE complete='N';