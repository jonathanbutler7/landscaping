const app = require('../src/app');
const knex = require('knex');
const { API_TOKEN, DATABASE_URL } = require('../src/config');
const { createWorkers } = require('./workers-fixtures');
const supertest = require('supertest');
const endpoint = '/workers';
const name = 'workers';

describe('App', () => {
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

  describe(`GET ${endpoint}`, () => {
    context(`Given there are no ${name}`, () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get(endpoint)
          .set('Authorization', API_TOKEN)
          .expect(200, []);
      });
    });

    context(`Given there are ${name} in the database`, () => {
      const testWorkers = createWorkers();
      before(`Insert ${name}`, () => {
        return db.into(name).insert(testWorkers);
      });
      it(`Responds with 200 and all of the ${name}`, () => {
        return supertest(app)
          .get(endpoint)
          .set('Authorization', API_TOKEN)
          .expect(200, testWorkers);
      });
      it(`Responds with the specified ${name}`, () => {
        const id = '56442348-14b4-4e17-a2e2-964440c40224';
        expectedWorker = testWorkers.filter((worker) => worker._id === id);
        return supertest(app)
          .get(`${endpoint}/${id}`)
          .set('Authorization', API_TOKEN)
          .expect(200, expectedWorker);
      });
    });
  });

  describe(`POST to ${endpoint}`, () => {
    it(`creates a(n) ${name}, responds with 201, and a new ${name}`, () => {
      const newWorker = {
        name: 'Joe',
        email: 'tech@tech.com',
        phone: '123-123-1234',
        address: '123 Orchard Avenue',
        data: ['yard work', 'landscaping'],
      };
      return supertest(app)
        .post(endpoint)
        .send(newWorker)
        .set('Authorization', API_TOKEN)
        .expect(201)
        .expect((res) => {
          expect(res.body[0].name).to.eql(newWorker.name);
          expect(res.body[0].email).to.eql(newWorker.email);
          expect(res.body[0].address).to.eql(newWorker.address);
          expect(res.body[0]).to.have.property('_id');
          const expected = new Date().toLocaleString();
          const actual = new Date(res.body[0].date_created).toLocaleString();
          expect(actual).to.eql(expected);
        });
    });
  });

  describe(`DELETE ${endpoint}/id`, () => {
    context(`Given there are no ${name}`, () => {
      it(`responds with 404`, () => {
        const id = 'abc';
        return supertest(app)
          .delete(`${endpoint}/${id}`)
          .set('Authorization', API_TOKEN)
          .expect(404, { message: `Worker with ${id} does not exist` });
      });
    });
  });
  after('disconnect from db', () => db.destroy());
});
