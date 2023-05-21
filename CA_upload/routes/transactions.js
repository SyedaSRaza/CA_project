var express = require('express');
var router = express.Router();

//import models

var database = require('../database');


router.get("/", function (request, response, next) {

	var query = "SELECT * FROM transactions ORDER BY id DESC";

	database.query(query, function (error, data) {

		if (error) {
			throw error;
		}
		else {
			response.render('transactions', {
	/* 			flag: 'normal',
				account_id: '101',
				date: new Date().toISOString().slice(0, 10), // Convert current date to MySQL format,
				account_name: 'land',
				debit: '1000',
				credit: 'NULL',
				 */
				title:'Transactions',action:'list',sampleTransactions:data
				
			});
}
});

	//response.send('List all Sample Data');

});


//Route for form in browser

router.get("/add", function(request, response, next){
//alert('Hello');
	response.render('transactions',{title:'Insert Transaction Data', action:'add'})

//	response.send('Add Sample Data');
});


//Insert and post data in database

router.post("/add_transactions",function(request,response,next){
	
	var flag= request.body.flag;
	var account_id = request.body.account_id;
	var date = request.body.date;
	var head = request.body.head;
	var account_name = request.body.account_name;
	var debit = request.body.debit;
	var credit = request.body.credit;

	var query = `INSERT INTO transactions (flag,account_id, date, head, account_name, debit,credit) VALUES ("${flag}","${account_id}","${date}","${head}", "${account_name}","${debit}","${credit}")`;

	database.query(query,function(error,data){
		if(error) throw error;
		else{
			response.redirect('/transactions')
		}
	});
})


//Edit
// Route for editing a transaction
router.get('/edit_transaction/:id', function (request, response, next) {
    var id = request.params.id;

    // Construct the SQL query to fetch the transaction with the specified ID
    var query = `SELECT * FROM transactions WHERE id = "${id}"`;

    // Execute the query
    database.query(query, function (error, data) {
        if (error) {
            throw error;
        } else {
            response.render('transactions', {
                title: 'Edit Transactions',
                action: 'edit',
                sampleTransactions: data[0]
            });
        }
    });
});

// POST UPDATED TRANSACTION
router.post('/edit/:id', function(request, response, next) {
    var id = request.params.id;
    var flag = request.body.flag;
    var account_id = request.body.account_id;
    var date = request.body.date;
    var head = request.body.head;
    var account_name = request.body.account_name;
    var debit = request.body.debit;
    var credit = request.body.credit;

    var query = `UPDATE transactions SET flag = "${flag}", account_id = "${account_id}", date = "${date}", head = "${head}", account_name = "${account_name}", debit = "${debit}", credit = "${credit}" WHERE id = "${id}"`;

    database.query(query, function(error, data) {
        if (error) {
            throw error;
        } else {
            response.redirect('/transactions');
        }
    });
});

//DELETE TRANSACTION

router.get('/transactions/delete/:id', function(request, response, next) {
    var id = request.params.id;

    var query = `DELETE FROM transactions WHERE id = "${id}"`;

    database.query(query, function(error, data) {
        if (error) {
            throw error;
        } else {
            response.redirect('/transactions');
        }
    });
});

module.exports = router;