-- psql -U postgres -d construction -f ./seeds/seed.jobs.sql

DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS technicians;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE customers (
      _id uuid DEFAULT uuid_generate_v4 (),
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL
);
  
CREATE TABLE jobs (
    _id uuid DEFAULT uuid_generate_v4 (),
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL,
    type TEXT NOT NULL,
    date_requested TEXT NOT NULL,
    zip TEXT NOT NULL,
    items text[][],
    data json
);
CREATE TABLE technicians (
    _id uuid DEFAULT uuid_generate_v4 (),
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL
);