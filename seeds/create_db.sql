DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS job;
DROP TABLE IF EXISTS technician;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE customer (
      _id uuid DEFAULT uuid_generate_v4 (),
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL,
    name TEXT NOT NULL
);
  
CREATE TABLE job (
    _id uuid DEFAULT uuid_generate_v4 (),
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL,
    type TEXT NOT NULL
);
CREATE TABLE technician (
    _id uuid DEFAULT uuid_generate_v4 (),
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL,
    name TEXT NOT NULL
);