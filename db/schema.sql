-- DROP SCHEMA "g-311-db";

CREATE SCHEMA "g-311-db" AUTHORIZATION postgres;

-- DROP TYPE "g-311-db"."_users";

CREATE TYPE "g-311-db"."_users" (
	INPUT = array_in,
	OUTPUT = array_out,
	RECEIVE = array_recv,
	SEND = array_send,
	ANALYZE = array_typanalyze,
	ALIGNMENT = 8,
	STORAGE = any,
	CATEGORY = A,
	ELEMENT = "g-311-db".users,
	DELIMITER = ',');

-- DROP TYPE "g-311-db".users;

CREATE TYPE "g-311-db".users AS (
	id serial,
	"name" varchar,
	email varchar,
	phone varchar);
-- "g-311-db".users definition

-- Drop table

-- DROP TABLE "g-311-db".users;

CREATE TABLE "g-311-db".users (
	id serial NOT NULL DEFAULT nextval('"g-311-db".users_id_seq'::regclass),
	"name" varchar NOT NULL,
	email varchar NOT NULL,
	phone varchar NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY (id)
);


-- "g-311-db".issues definition

-- Drop table

-- DROP TABLE "g-311-db".issues;

CREATE TABLE "g-311-db".issues (
	id int4 NOT NULL,
	description varchar NOT NULL,
	title varchar NOT NULL,
	task_owner varchar NOT NULL,
	user_id int4 NOT NULL,
	lat float4 NOT NULL,
	lng float4 NOT NULL,
	reported_count int4 NOT NULL DEFAULT 0,
	upvotes_count int4 NOT NULL DEFAULT 0,
	confirm_resolved_count int4 NOT NULL DEFAULT 0,
	resolution_status int4 NOT NULL DEFAULT 0,
	date_marked_in_progress date NOT NULL,
	date_marked_resolved date NOT NULL,
	"type" varchar NOT NULL,
	CONSTRAINT issues_pk PRIMARY KEY (id),
	CONSTRAINT issues_fk FOREIGN KEY (id) REFERENCES "g-311-db".users(id)
);
