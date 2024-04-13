require('dotenv').config();

const Starling = require('starling-developer-sdk');

if (!(process.env.STARLING_TOKEN)) {
    throw new Error("Please fill in your Starling token in the .env file");
}

const client = new Starling({
    // apiUrl: 'https://api-sandbox.starlingbank.com',
    accessToken: process.env.STARLING_TOKEN
});


client.account.getAccounts()
    .then(({ data }) => console.log(data))
    .catch(err => console.log(err))
