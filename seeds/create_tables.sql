-- psql -U postgres -d landscaping -f ./seeds/seed.jobs.sql
DROP TABLE IF EXISTS customers;

DROP TABLE IF EXISTS orders;

DROP TABLE IF EXISTS workers;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE customers (
    _id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL
);

CREATE TABLE orders (
    _id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL,
    type TEXT NOT NULL,
    date_requested TEXT NOT NULL,
    zip TEXT NOT NULL,
    items json
);

CREATE TABLE workers (
    _id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    data text []
);
