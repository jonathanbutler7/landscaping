const {
  hello,
  missingPostParams,
  numberOfValues,
} = require('../../src/routes/helpers');
const supertest = require('supertest');
const app = require('../../src/app');
const assert = require('chai').assert;
const { API_TOKEN } = require('../../src/config');

describe('Route elpers', function () {
  it('should return hello', function () {
    const result = hello('hello');
    assert.equal(result, 'hello');
  });
  it('should return an array of null keys', function () {
    const post = {
      key: null,
      key2: null,
      item: 'truthy',
    };
    const result = missingPostParams(post);
    assert.typeOf(result, 'array');
  });
  it('should return 0', function () {
    const result = numberOfValues({});
    assert.equal(result, 0);
  });
});

describe('Server helpers', function () {
  it('should return 500', function () {
    return supertest(app)
      .get('/customers')
      .set('Authorization', '123')
      .expect(401, { error: 'Unauthorized request' });
  });
  it('should return with an error message', function () {
    return supertest(app)
      .get('/customersss')
      .set('Authorization', API_TOKEN)
      .expect(500);
  });
});
