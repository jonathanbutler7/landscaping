const app = require('../src/app');
const knex = require('knex');
const { API_TOKEN, DATABASE_URL } = require('../src/config');
const { createWorkers } = require('./fixtures/workers-fixtures');
const supertest = require('supertest');
const endpoint = '/workers';
const name = 'workers';

context('Workers endpoints', () => {
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

  context(`GET ${endpoint}`, () => {
    describe(`Given there are no ${name}`, () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get(endpoint)
          .set('Authorization', API_TOKEN)
          .expect(200, []);
      });
      context(`DELETE ${endpoint}/id`, () => {
        it(`responds with 404`, () => {
          const id = 'abc';
          return supertest(app)
            .delete(`${endpoint}/${id}`)
            .set('Authorization', API_TOKEN)
            .expect(404, { error: `Worker with id ${id} does not exist.` });
        });
      });
    });

    context(`Given there are ${name} in the database`, () => {
      const testData = createWorkers();
      before(`Insert ${name}`, () => {
        return db.into(name).insert(testData);
      });
      it(`Responds with 200 and all of the ${name}`, () => {
        return supertest(app)
          .get(endpoint)
          .set('Authorization', API_TOKEN)
          .expect(200, testData);
      });
      it(`Responds with the specified ${name}`, () => {
        const id = testData[0]._id;
        expectedWorker = testData.filter((worker) => worker._id === id);
        return supertest(app)
          .get(`${endpoint}/${id}`)
          .set('Authorization', API_TOKEN)
          .expect(200, expectedWorker);
      });
      it(`Responds with 204 and success message`, () => {
        const id = testData[1]._id;
        // expectedWorkers = testData.filter((worker) => worker._id === id);
        return supertest(app)
          .delete(`${endpoint}/${id}`)
          .set('Authorization', API_TOKEN)
          .expect(200, { message: `Deleted worker with id: ${id}` });
      });
    });
  });

  describe(`POST to ${endpoint}`, () => {
    describe(`Given the POST is missing a field`, () => {
      it(`responds with 400 and error message`, () => {
        const newWorker = {
          name: 'John',
        };
        return supertest(app)
          .post(endpoint)
          .send(newWorker)
          .set('Authorization', API_TOKEN)
          .expect(400, { message: 'Body fields must not be falsy.' });
      });
    });

    it(`creates a(n) ${name}, responds with 201, and a new ${name}`, () => {
      // this.retries(3);
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
        .retry(3)
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

  describe(`PUT ${endpoint}/id`, () => {
    const testData = createWorkers();
    context(`Given no articles`, () => {
      it(`Responds with 404`, () => {
        const id = 'abc';
        return supertest(app)
          .put(`${endpoint}/${id}`)
          .set('Authorization', API_TOKEN)
          .expect(404, { error: `Worker with id ${id} does not exist.` });
      });
    });
    beforeEach(`Insert ${name}`, () => {
      return db.into(name).insert(testData);
    });
    context(`PUT ${endpoint}/id`, () => {
      describe(`Given a falsy field`, () => {
        it(`Responds with 404 and error message`, () => {
          const id = testData[0]._id;
          const newWorker = {
            name: 'Jim',
            email: undefined,
          };
          return supertest(app)
            .put(`${endpoint}/${id}`, newWorker)
            .set('Authorization', API_TOKEN)
            .expect(404, { message: 'Body fields must not be falsy.' });
        });
      });
    });
    context(`PUT ${endpoint}/id`, () => {
      describe(`Given a valid PUT request`, () => {
        it(`Responds with 200 and the new${name} object`, () => {
          const id = testData[0]._id;
          const newWorker = {
            name: 'New Joe',
          };
          return supertest(app)
            .put(`${endpoint}/${id}`)
            .send(newWorker)
            .set('Authorization', API_TOKEN)
            .expect(200)
            .expect((res) => {
              expect(res.body[0].name).to.eql(newWorker.name);
            });
        });
      });
    });
  });

  after('disconnect from db', () => db.destroy());
});
