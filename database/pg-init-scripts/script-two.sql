\c sbf; 

CREATE TABLE IF NOT EXISTS Users (
  uid SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  last_active timestamp,
  phone_number int,
  access_level int DEFAULT 1
);

CREATE TABLE IF NOT EXISTS Subjects (
  sid SERIAL PRIMARY KEY,
  subject_name TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Preferences (
  uid SERIAL REFERENCES Users(uid),
  sid SERIAL REFERENCES Subjects(sid),
  min_grade float(2),
  PRIMARY KEY (uid,sid)
);

\c sbf_test; 

CREATE TABLE IF NOT EXISTS Users (
  uid SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  last_active timestamp,
  phone_number int,
  access_level int DEFAULT 1
);

CREATE TABLE IF NOT EXISTS Subjects (
  sid SERIAL PRIMARY KEY,
  subject_name TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Preferences (
  uid SERIAL REFERENCES Users(uid),
  sid SERIAL REFERENCES Subjects(sid),
  min_grade float(2),
  PRIMARY KEY (uid,sid)
);

INSERT INTO Subjects (subject_name, description) VALUES ('CSE154', 'A');
INSERT INTO Subjects (subject_name, description) VALUES ('CSE666', 'B');