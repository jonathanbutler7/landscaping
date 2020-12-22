const {
  hello,
  missingPostParams,
  numberOfValues,
} = require('../../src/routes/helpers');
const assert = require('chai').assert;

describe('Helpers', function () {
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
