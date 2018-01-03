CREATE TABLE frames (
	id bigserial NOT NULL,
	name text NOT NULL,
	PRIMARY KEY (ID)
);

CREATE TABLE components (
	id bigserial NOT NULL,
	name  text NOT NULL,
	frameId bigserial REFERENCES frames(id),
	PRIMARY KEY (ID)
);

CREATE TABLE logs (
	id bigserial NOT NULL,
	frameType text NOT NULL,
	frameNumber text,
	frameComponent text NOT NULL,
	shiftNumber text NOT NULL,
	processingTime text NOT NULL,
	status text NOT NULL,
	timestamp text NOT NULL,
	PRIMARY KEY (ID)
);

CREATE TABLE shifts (
	id bigserial NOT NULL,
	name text NOT NULL,
	startTime text NOT NULL,
	endTime text NOT NULL
);

CREATE TABLE users (
	id integer NOT NULL,
	username text NOT NULL,
	password text NOT NULL
);

CREATE INDEX idx_frames ON frames(id);
CREATE INDEX idx_components ON components(id);
CREATE INDEX idx_logs ON logs(id);
CREATE INDEX idx_users ON users(id);

INSERT INTO USERS(id, username, password)
VALUES(1, 'admin', 'admin');