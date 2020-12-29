## What is this?

This is a database I am building with PostgreSQL and Node for a fictitious landscaping company, **Los Angeles Landscaping & Gardening**. 

The database has three endpoints, `/customers`, `/workers`, and `/orders`. 

It will serve as the backend for a fullstack project which includes 

1. A customer-facing landing page where customers may enter contact details and place an order and 
2. A worker-facing page for workers to view orders the customers have placed.
## Why build this?

I wanted to build a robust and secure backend to get more comfortable with PostgreSQL tables and writing tests with Mocha.

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

## Test coverage
```
----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------|---------|----------|---------|---------|-------------------
All files             |   95.65 |       80 |     100 |   95.65 |                   
 src                  |   96.67 |    66.67 |     100 |   96.67 |                   
  app.js              |     100 |       50 |     100 |     100 | 4                 
  config.js           |     100 |       50 |     100 |     100 | 2-3               
  helpers.js          |   90.91 |    83.33 |     100 |   90.91 | 15                
 src/routes           |     100 |      100 |     100 |     100 |                   
  helpers.js          |     100 |      100 |     100 |     100 |                   
  index.js            |     100 |      100 |     100 |     100 |                   
  route-service.js    |     100 |      100 |     100 |     100 |                   
 src/routes/routes    |    94.7 |     87.5 |     100 |    94.7 |                   
  customers-router.js |   94.12 |    83.33 |     100 |   94.12 | 15,48,84          
  orders-router.js    |   95.92 |      100 |     100 |   95.92 | 15,79             
  workers-router.js   |   94.12 |    83.33 |     100 |   94.12 | 15,49,83          
----------------------|---------|----------|---------|---------|-------------------
```
