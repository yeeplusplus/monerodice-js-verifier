const crypto = require('crypto');

function verifyServerHash(serverHash, serverSeed) {
  const sha256HashGenerator = crypto.createHash('sha256');
  sha256HashGenerator.update(serverSeed);

  const calculatedServerHash = sha256HashGenerator.digest('hex');

  return calculatedServerHash === serverHash;
}

function calculateDiceRoll(serverSeed, secret) {
  const hmacGenerator = crypto.createHmac('sha512', secret);
  hmacGenerator.update(serverSeed);
  const hmacHash = hmacGenerator.digest('hex');

  let i;
  let sub;
  let decimalValue;
  let modulus;
  for (i = 0; i < hmacHash.length; i += 5) {
    sub = hmacHash.substring(i, 5);

    if (sub.length === 5) {
      decimalValue = parseInt(sub, 16);
      if (decimalValue < 1000000) {
        modulus = decimalValue % 10000;
        return modulus / 100;
      }
    } else {
      break;
    }
  }
}


module.exports = {
  verifyServerHash: verifyServerHash,
  calculateDiceRoll: calculateDiceRoll
};