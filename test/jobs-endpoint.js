const app = require('../src/app');
const knex = require('knex');
const { API_TOKEN, DATABASE_URL } = require('../src/config');
const endpoint = '/jobs';
const name = 'jobs';
describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!lol"', () => {
    return supertest(app).get('/').expect(200, 'Hello, boilerplate!');
  });

  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: DATABASE_URL,
    });
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
    after("disconnect from db", () => db.destroy());
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
});
