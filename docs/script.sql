CREATE TABLE alunos (
	id SERIAL NOT NULL,
	nome varchar(255) NULL,
	sobrenome varchar(255) NULL,
	endereco varchar(255) NULL,
	CONSTRAINT pk_id_alunos PRIMARY KEY (id)
);