const mysql = require('mysql');
const connection = require('./connection');

function insertTransaction(flag, date, accountName, debit, credit) {
    const sql = 'INSERT INTO transactions (flag, date, account_name, debit, credit) VALUES (?, ?, ?, ?, ?)';
    const values = [flag, date, accountName, debit, credit];
  
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting transaction:', err);
      } else {
        console.log('Transaction inserted successfully');
      }
    });
  }

  module.exports = { insertTransaction };

  