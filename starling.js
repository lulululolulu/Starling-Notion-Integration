require('dotenv').config();

const Starling = require('starling-developer-sdk');


// Check if the Starling token is provided
if (!(process.env.STARLING_TOKEN)) {
    throw new Error("Please fill in your Starling token in the .env file");
}

// ---------- Starling API ----------
const client = new Starling({
    accessToken: process.env.STARLING_TOKEN
});


const { saveLastTransactionDate, getLastTransactionDate } = require('./dateManager');

const fromDate = getLastTransactionDate() || "2024-04-01T00:00:00Z"; // Fallback to a default date if none is stored

const now = new Date();
const toDate = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59).toISOString().slice(0, -5) + 'Z';

async function fetchTransactions() {
    try {
        const accountsResponse = await client.account.getAccounts();
        if (accountsResponse.data.accounts && accountsResponse.data.accounts.length > 0) {
            const accountUid = accountsResponse.data.accounts[0].accountUid;
            const categoryUid = accountsResponse.data.accounts[0].defaultCategory;

            const transactionsResponse = await client.feedItem.getFeedItemsBetween({
                accountUid: accountUid,
                categoryUid: categoryUid,
                minTransactionTimestamp: fromDate,
                maxTransactionTimestamp: toDate
            });

            return formatForNotion(transactionsResponse.data.feedItems);  // Return the transactions data
        } else {
            throw new Error("No accounts found.");
        }
    } catch (err) {
        console.error("Error fetching transactions:", err);
        throw err;
    }
}


fetchTransactions().then(transactions => {
    const lastTransaction = transactions[0]; // first transaction is the most recent
    saveLastTransactionDate(lastTransaction.Date.date.start);
}).catch(error => {
    console.error('Failed to fetch transactions:', error);
});

function formatForNotion(transactions) {
    return transactions.map(transaction => {
        const dateObject = new Date(transaction.transactionTime);
        const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')}`;

        return {
            "Name": {
                "title": [
                    {
                        "text": {
                            "content": transaction.reference || "No Reference"
                        }
                    }
                ]
            },
            "Tags": {
                "multi_select": formatCategory(transaction.spendingCategory)
            },
            "Amount": {
                "number": transaction.amount.minorUnits / 100
            },
            "Date": {
                "date": {
                    "start": formattedDate,
                    "end": null
                }
            }
        };
    });
}

function formatCategory(category) {
    return category.toLowerCase().replace(/_/g, ' ');
}



module.exports = { fetchTransactions };