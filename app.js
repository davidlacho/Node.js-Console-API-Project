//Problem: simple way to look at a user's badge count and JavaScript points. Access the teamTreehouse JSON file and parse it.
//Solution Use Node.js to connect to Treehouse's API to get profile information to print count
const profile = require('./profile.js');

const readline = require('readline');
const rl = readline.createInterface( {
  input: process.stdin,
  output: process.stdout
});

rl.question('What is the username? ', (username) => {
  profile.getProfile(username);
  rl.close();
});
