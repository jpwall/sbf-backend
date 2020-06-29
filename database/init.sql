CREATE TABLE IF NOT EXISTS Users (
  uid SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  last_active timestamp,
  phone_number bigint NOT NULL UNIQUE,
  verified BOOLEAN NOT NULL,
  access_level int DEFAULT 1
);

CREATE TABLE IF NOT EXISTS Courses (
  cid SERIAL PRIMARY KEY,
  subject_name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Preferences (
  uid SERIAL REFERENCES Users(uid),
  cid SERIAL REFERENCES Courses(cid),
  min_grade float(2),
  course_role TEXT NOT NULL,
  PRIMARY KEY (uid,cid)
);
