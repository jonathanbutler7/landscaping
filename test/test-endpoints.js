const app = require('../src/app');
const knex = require('knex');
const { API_TOKEN, DATABASE_URL } = require('../src/config');
const { createTechnicians } = require('./technicians-fixtures');
const supertest = require('supertest');
const endpoint = '/technicians';
const name = 'technicians';

describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!lol"', () => {
    return supertest(app).get('/').expect(200, 'Hello, boilerplate!');
  });
  let db = knex({
    client: 'pg',
    connection: DATABASE_URL,
  });
  before('make knex instance', () => {
    app.set('db', db);
  });

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
    // context("Given there are articles in the database", () => {
    //   const testUsers = makeUsersArray();
    //   const testArticles = makeArticlesArray();

    //   beforeEach("insert articles", () => {
    //     return db.into('blogful_users').insert(testUsers)
    //     .then(() => {
    //       return db.into("blogful_articles").insert(testArticles);
    //     })

    //   });
    //   it("responds with 200 and all of the articles", () => {
    //     return supertest(app).get("/api/articles").expect(200, testArticles);
    //   });
    // });
  });
  after('disconnect from db', () => db.destroy());
});
