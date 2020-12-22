const app = require('../../src/app');
const knex = require('knex');
const { API_TOKEN, DATABASE_URL } = require('../../src/config');
const { createOrders } = require('../fixtures/orders-fixtures');
const supertest = require('supertest');
const { expect } = require('chai');
const endpoint = '/orders';
const name = 'orders';

context('Orders endpoints', () => {
  const test = supertest(app);
  let db = knex({
    client: 'pg',
    connection: DATABASE_URL,
  });

  before('make knex instance', () => {
    app.set('db', db);
  });

  before('clean the table', () =>
    db.raw('TRUNCATE customers, orders, workers')
  );

  after('clean the table', () => db.raw('TRUNCATE customers, orders, workers'));

  context(`Given there ARE NO ${name}`, () => {
    it('GET responds with 200 and an empty list', () => {
      return test.get(endpoint).set('Authorization', API_TOKEN).expect(200, []);
    });
    it(`PUT responds with 404 and error message`, () => {
      const id = 'abc';
      return test
        .put(`${endpoint}/${id}`)
        .set('Authorization', API_TOKEN)
        .expect(404, { error: `Order with id ${id} does not exist.` });
    });
    describe(`DELETE ${endpoint}/id`, () => {
      it(`responds with 404`, () => {
        const id = 'abc';
        return test
          .delete(`${endpoint}/${id}`)
          .set('Authorization', API_TOKEN)
          .expect(404, { error: `Order with id ${id} does not exist.` });
      });
    });
  });

  context(`Given there ARE ${name} in the database`, () => {
    const testData = createOrders();
    before(`Insert ${name}`, () => {
      return db.into(name).insert(testData);
    });
    it(`GET / responds with 200 and all of the ${name}`, () => {
      return test
        .get(endpoint)
        .set('Authorization', API_TOKEN)
        .expect(200, testData);
    });
    it(`GET /id responds with the specified ${name}`, () => {
      const id = testData[0]._id;
      expectedWorker = testData.filter((worker) => worker._id === id);
      return test
        .get(`${endpoint}/${id}`)
        .set('Authorization', API_TOKEN)
        .expect(200, expectedWorker);
    });
    it(`DELETE /id responds with 204 and success message`, () => {
      const id = testData[1]._id;
      return test
        .delete(`${endpoint}/${id}`)
        .set('Authorization', API_TOKEN)
        .expect(200, { message: `Deleted order with id: ${id}` });
    });
    context(`PUT /id`, () => {
      describe(`Given a falsy field`, () => {
        it(`Responds with 404 and error message`, () => {
          const id = testData[0]._id;
          const newOrder = {
            type: 'Gutters',
            zip: undefined,
          };
          return test
            .put(`${endpoint}/${id}`, newOrder)
            .set('Authorization', API_TOKEN)
            .expect(404)
            .expect((res) => {
              expect(res.text).to.include('Must submit at least one field');
            });
        });
      });
      describe(`Given a valid PUT request`, () => {
        it(`Responds with 200 and the new${name} object`, () => {
          const id = testData[0]._id;
          const newOrder = {
            type: 'New Joe',
          };
          return test
            .put(`${endpoint}/${id}`)
            .send(newOrder)
            .set('Authorization', API_TOKEN)
            .expect(200)
            .expect((res) => {
              expect(res.body[0].name).to.eql(newOrder.name);
            });
        });
      });
    });
  });

  describe(`POST to ${endpoint}`, () => {
    describe(`Given the POST is missing a field`, () => {
      it(`responds with 400 and error message`, () => {
        const newOrder = {
          zip: '123456',
        };
        return test
          .post(endpoint)
          .send(newOrder)
          .set('Authorization', API_TOKEN)
          .expect(400)
          .expect((res) => {
            expect(res.text).to.include('Body has missing fields:');
          });
      });
    });
    describe(`Given the POST request body contains all fields`, () => {
      it(`creates a(n) ${name}, responds with 201, and a new ${name}`, () => {
        const newOrder = {
          type: 'Mowing',
          date_requested: 'ASAP',
          zip: '76023',
        };
        return test
          .post(endpoint)
          .send(newOrder)
          .set('Authorization', API_TOKEN)
          .expect(201)
          .retry(5)
          .expect((res) => {
            expect(res.body[0].type).to.eql(newOrder.type);
            expect(res.body[0].date_requested).to.eql(newOrder.date_requested);
            expect(res.body[0].zip).to.eql(newOrder.zip);
            expect(res.body[0]).to.have.property('_id');
            const expected = new Date().toLocaleString();
            const actual = new Date(res.body[0].date_created).toLocaleString();
            expect(actual).to.eql(expected);
          });
      });
    });
  });

  after('disconnect from db', () => db.destroy());
});
