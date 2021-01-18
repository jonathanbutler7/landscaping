# What is this?

This is a full stack project built with PostgreSQL, Node.js, Express, and React for a fictitious landscaping company, **Los Angeles Landscaping**. 

I built this project to demonstrate my ability to automate a small business's order process by building a full stack application that includes:

## FRONTEND: 
1. a landing page: `/landscaping`
2. a form to capture customer data and redirect to an order page 
3. a form that allows the customer to create a new order `/orders`
4. a page for workers to view orders (in progress)
5. a page for workers to create an account `/workers`

## BACKEND: 
The database has three endpoints, `/customers`, `/workers`, and `/orders`. 

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