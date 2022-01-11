BEGIN;

DROP TABLE IF EXISTS appellation, bottle;

CREATE TABLE appellation (
    id serial PRIMARY KEY,
    label TEXT NOT NULL
);

CREATE TABLE bottle (
    id serial PRIMARY KEY,
    label TEXT NOT NULL,
    color TEXT NOT NULL,
    millesime INT,
    guard INT,
    quantity INT NOT NULL,
    comment TEXT,
    note INT,
    rack INT,
    appellation_id INT REFERENCES appellation(id) NOT NULL
);

COMMIT;
