import express from 'express';
let router = express.Router();
import DBConnection from "../configs/DBConnection";

 
// display books page
router.get('/', function(req, res, next) {
      
    DBConnection.query('SELECT * FROM books ORDER BY id desc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('books',{data:''});   
        } else {
            // render to views/books/index.ejs
            res.render('books',{data:rows, name:'', author:''});
        }
    });
});

// render to views/books/add.ejs
router.get('/add', function(req, res, next) {
      
    DBConnection.query('SELECT * FROM books ORDER BY id desc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('books/add',{data:''});   
        } else {
            // render to views/books/index.ejs
            res.render('books/add',{data:rows,name: '',
        author: ''});
        }
    });
});

// display add book page
router.get('/add', function(req, res, next) {    
    // render to add.ejs
    res.render('books/add', {
        name: '',
        author: '',
        data: rows        
    })
})

// add a new book
router.post('/add', function(req, res, next) {    

    let name = req.body.name;
    let author = req.body.author;
    let errors = false;

    if(name.length === 0 || author.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Please enter name and author");
        // render to add.ejs with flash message
        res.render('books/add', {
            name: name,
            author: author
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            name: name,
            author: author
        }
        
        // insert query
        DBConnection.query('INSERT INTO books SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('books/add', {
                    name: form_data.name,
                    author: form_data.author                    
                })
            } else {                
                req.flash('success', 'Book successfully added');
                res.redirect('/books');
            }
        })
    }
})
// add a new book in add.ejs
router.post('/books', function(req, res, next) {    

    let name = req.body.name;
    let author = req.body.author;
    let errors = false;

    if(name.length === 0 || author.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Please enter name and author");
        // render to add.ejs with flash message
        res.render('books', {
            name: name,
            author: author
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            name: name,
            author: author
        }
        
        // insert query
        DBConnection.query('INSERT INTO books SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('/books', {
                    name: form_data.name,
                    author: form_data.author                    
                })
            } else {                
                req.flash('success', 'Book successfully added');
                res.redirect('/books');
            }
        })
    }
})
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
     
    DBConnection.query('DELETE FROM books WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to books page
            res.redirect('/books')
        } else {
            // set flash message
            req.flash('success', 'Book successfully deleted! ID = ' + id)
            // redirect to books page
            res.redirect('/books')
        }
    })
})


module.exports = router;