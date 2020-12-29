## What is this?

This is a database I am building with PostgreSQL and Node for a fictitious landscaping company, **Los Angeles Landscaping & Gardening**. The database has four endpoints, `/customers`, `/workers`, and `/login`. 

It will serve as the backend for a fullstack project which includes a modern landing page (which captures customer info for `/customers`), a customer-facing order page where customers may view services and pricing and place an order (`/orders`), and a worker-facing order page where workers may view orders currently in the database.

## Why build this?

I wanted to build a robust and secure backend to get more comfortable with PostgreSQL tables, writing tests, and building out a login feature (forthcoming).

## How to clone this:

1. Clone this repository to your local machine `git clone git@github.com:jonathanbutler7/landscaping-db.git`
2. `cd` into the cloned repository
3. Install the node dependencies `npm install`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`
## Folder Structure
```
├── src
│   ├── Procfile
│   ├── app.js
│   ├── config.js
│   ├── helpers.js
│   ├── routes
│   │   ├── helpers.js
│   │   ├── index.js
│   │   ├── route-service.js
│   │   └── routes
│   │       ├── customers-router.js
│   │       ├── orders-router.js
│   │       └── workers-router.js
│   └── server.js
└── test
    ├── app.spec.js
    ├── fixtures
    │   ├── customers-fixtures.js
    │   ├── orders-fixtures.js
    │   └── workers-fixtures.js
    ├── setup.js
    └── tests
        ├── test-customers.js
        ├── test-helpers.js
        ├── test-orders.js
        └── test-workers.js
```