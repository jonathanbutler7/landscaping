function numberOfValues(newObject) {
  const numberOfValues = Object.values(newObject).filter(Boolean).length;
  return numberOfValues;
}

function missingPostParams(newObject) {
  const pairs = Object.entries(newObject);
  const missingParams = [];
  pairs.forEach((key) => {
    if (!key[1]) {
      missingParams.push(key[0]);
    }
  });
  return missingParams;
}

module.exports = { numberOfValues, missingPostParams };
