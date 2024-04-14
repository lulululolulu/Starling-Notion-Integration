const fs = require('fs');
const path = require('path');
const LAST_DATE_FILE = path.join(__dirname, 'lastDate.txt');

// function to save the last transaction date
function saveLastTransactionDate(date) {
    fs.writeFileSync(LAST_DATE_FILE, `${date}T23:59:59Z`);
}

// function to get the last transaction date from LAST_DATE_FILE
function getLastTransactionDate() {
    try {
        return fs.readFileSync(LAST_DATE_FILE, 'utf8');
    } catch (error) {
        console.error("Could not read last date file:", error);
        return null;  // Return null if there's an error (e.g., file doesn't exist)
    }
}

module.exports = { saveLastTransactionDate, getLastTransactionDate };
