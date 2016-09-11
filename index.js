'use strict';

const verifier = require('./verifier');

const commandLineArgs = require('command-line-args');
const crypto = require('crypto');

const optionDefinitions = [
  {name: 'serverHash', alias: 'h', type: String},
  {name: 'serverSeed', alias: 's', type: String},
  {name: 'userSeed', alias: 'u', type: String},
  {name: 'nonce', alias: 'n', type: String}
];

const options = commandLineArgs(optionDefinitions);

if (!options.hasOwnProperty('serverHash') || 
    !options.hasOwnProperty('serverSeed') ||
    !options.hasOwnProperty('userSeed') ||
    !options.hasOwnProperty('nonce')) {
      console.log('Usage: ' + process.argv[0] + ' ' + process.argv[1] + ' -h SERVER_HASH -s SERVER_SEED -u USER_SEED -n NONCE');
      process.exit(1);
    }

if (!!verifier.verifyServerHash(options.serverHash, options.serverSeed)) {
  console.log('Server hash is correct');
} else {
  console.log('Server hash is incorrect!');
  process.exit(2);
}

console.log("Roll result is: " + verifier.calculateDiceRoll(options.serverSeed, options.userSeed + '_' + options.nonce));
