const app = require('../src/app');
const knex = require('knex');
const { API_TOKEN, DATABASE_URL } = require('../src/config');
const { createTechnicians } = require('./technicians-fixtures');
const supertest = require('supertest');
const endpoint = '/technicians';
const name = 'technicians';

describe('App', () => {
  let db = knex({
    client: 'pg',
    connection: DATABASE_URL,
  });
  before('make knex instance', () => {
    app.set('db', db);
  });

  before('clean the table', () =>
    db.raw('TRUNCATE customers, jobs, technicians')
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
      const testTechnicians = createTechnicians();
      beforeEach(`Insert ${name}`, () => {
        return db.into(name).insert(testTechnicians);
      });
      it(`Responds with 200 and all of the ${name}`, () => {
        return supertest(app)
          .get(endpoint)
          .set('Authorization', API_TOKEN)
          .expect(200, testTechnicians);
      });
    });
  });
  after('disconnect from db', () => db.destroy());
});
