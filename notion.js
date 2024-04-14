require('dotenv').config();

const { Client } = require('@notionhq/client');

// Check if the API key and database ID are provided
if (!(process.env.NOTION_API_KEY && process.env.NOTION_DATABASE_ID)) {
  throw new Error("Please fill in your API key and database ID in the .env file");
}

// ---------- Notion API ----------
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;
const incomeDatabaseId = process.env.NOTION_INCOME_DATABASE_ID;


// add a new transaction to the database
async function createTransactionPage(name, tags, amount, date) {

  const isIncome = tags.some(tag => tag.name.toLowerCase() === 'income');
  const targetDatabaseId = isIncome ? incomeDatabaseId : databaseId;

  const response = await notion.pages.create({
    parent: { database_id: targetDatabaseId },
    properties: {
      Name: { title: [{ text: { content: name } }] },
      Tags: { multi_select: tags },
      Amount: { number: amount },
      Date: { date: { start: date } }
    }
  });

  console.log('New transaction page created:', response); // log the response
}

module.exports = { createTransactionPage };