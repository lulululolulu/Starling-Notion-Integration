require('dotenv').config();

const { fetchTransactions } = require('./starling');
const { createTransactionPage } = require('./notion');

async function processAndUploadTransactions() {
    try {
        // Fetch transactions from Starling API
        const transactions = await fetchTransactions();

        // Iterate over each transaction and create a page in Notion
        for (const transaction of transactions) {
            await createTransactionPage(
                transaction.Name,
                [{ name: transaction.Tags }],
                transaction.Amount,
                transaction.Date.transactionTime
            );
        }
        if (transactions.length > 0) {
            console.log('All transactions have been processed and uploaded to Notion.');
        }
    } catch (error) {
        console.error('Failed to process transactions:', error);
    }
}

processAndUploadTransactions();
