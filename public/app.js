const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

//Import models
const connection = require('./models/connection');
const { insertTransaction } = require('./models/transactions');


const { title } = require("process");

// Static files
app.use(express.static('public'));

// Serve static files from the "public/assets" directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));
    
// Define a route to handle requests to your HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});


// ======================DATABASE======================//

// Database connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    process.exit(1);
  }
  console.log('MySQL connected');
});

// Create database
app.post('/createdb', (req, res) => {
  const sql = 'CREATE DATABASE IF NOT EXISTS ca_project';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error creating database:', err);
      res.status(500).json({ error: 'Failed to create database' });
    } else {
      console.log(result);
      res.send('Database created');
    }
  });
});

// Create transaction table
app.post('/transactiontable', (req, res) => {
  const sql = `CREATE TABLE IF NOT EXISTS transactions (
    transactions_ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    flag ENUM('normal', 'adjustment', 'closing') NOT NULL,
    date DATE,
    account_name VARCHAR(255),
    debit DECIMAL(10, 2),
    credit DECIMAL(10, 2)
  )`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error creating transaction table:', err);
      res.status(500).json({ error: 'Failed to create transaction table' });
    } else {
      console.log(result);
      res.send('Transaction table created');
    }
  });
});

//===================CRUD OPERATIONS==============//

// Create a transaction
app.post('/transactions', (req, res) => {
  const { flag, date, account_name, debit, credit } = req.body;

  // Call the insertTransaction function
  insertTransaction(flag, date, account_name, debit, credit);

  res.status(201).json({ message: 'Transaction created successfully' });
});


// Get all transactions
app.get("/transactions", (req, res) => {
  const sql = "SELECT * FROM transactions";

  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error retrieving transactions:", err);
      res.status(500).json({ error: "Failed to retrieve transactions" });
    } else {
      res.json(results);
    }
  });
});

// Update a transaction
app.put("/transactions/:id", (req, res) => {
  const transactionId = req.params.id;
  const { flag, date, account_name, debit, credit } = req.body;

  const sql = "UPDATE transactions SET flag = ?, date = ?, account_name = ?, debit = ?, credit = ? WHERE transactions_ID = ?";
  const values = [flag, date, account_name, debit, credit, transactionId];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating transaction:", err);
      res.status(500).json({ error: "Failed to update transaction" });
    } else {
      res.json({ message: "Transaction updated successfully" });
    }
  });
});

// Delete a transaction
app.delete("/transactions/:id", (req, res) => {
  const transactionId = req.params.id;

  const sql = "DELETE FROM transactions WHERE transactions_ID = ?";
  const values = [transactionId];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error deleting transaction:", err);
      res.status(500).json({ error: "Failed to delete transaction" });
    } else {
      res.json({ message: "Transaction deleted successfully" });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
