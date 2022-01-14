import express from 'express';
let router = express.Router();
import DBConnection from "../configs/DBConnection";

 
// display books page
router.get('/', function(req, res, next) {
      
    DBConnection.query('SELECT p_titre, p_text, p_date_published  FROM post_messages WHERE p_parent = 0 ORDER BY p_date_published DESC;',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('books',{data:''});   
        } else {
            // render to views/books/index.ejs
            res.render('books',{data:rows, p_titre: '',
        p_text: '', p_parent:'', p_user_id:''});
        }
    });
});

// render to views/books/add.ejs
router.get('/add', function(req, res, next) {
      
    DBConnection.query('SELECT p_titre, p_text, p_date_published  FROM post_messages WHERE p_parent = 0 ORDER BY p_date_published DESC;',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('books/add',{data:''});   
        } else {
            // render to views/books/index.ejs
            res.render('books/add',{data:rows, p_titre: '',
        p_text: '', p_parent:'', p_user_id:''});
        }
    });
});

// display add book page
router.get('/add', function(req, res, next) {    
    // render to add.ejs
    res.render('books/add', {
        p_titre: '',
        p_text: '',
        p_id: '',
        p_parent:'',

        p_user_id:'', 
        data: rows        
    })
})

// add a new book
router.post('/add', function(req, res, next) {    

    let p_titre = req.body.p_titre;
    let p_text = req.body.p_text;
    let p_parent = req.body.p_parent;
    let p_user_id = req.body.p_user_id;
    let errors = false;

    if(p_titre.length === 0 || p_text.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Please enter name and author");
        // render to add.ejs with flash message
        res.render('books/add', {
            p_titre: p_titre,
            p_text: p_text,
            p_parent:p_parent,
            p_user_id:p_user_id
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            p_titre: p_titre,
            p_text: p_text,
            p_parent:p_parent,
            p_user_id:p_user_id
        }
        
        // insert query
        DBConnection.query('INSERT INTO post_messages SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('books/add', {
                    p_titre: form_data.p_titre,
                    p_text: form_data.p_text,
                    p_parent:form_data.p_parent,
                    p_user_id:form_data.p_user_id               
                })
            } else {                
                req.flash('success', 'Book successfully added');
                res.redirect('/books');   
                // faire reload dans le frontend
            }
        })
    }
})
// add a new book in add.ejs
router.post('/books', function(req, res, next) {    

    let p_titre = req.body.p_titre;
    let p_text = req.body.p_text;
    let p_parent = req.body.p_parent;
    let p_user_id = req.body.p_user_id;
    let errors = false;

    if(p_titre.length === 0 || p_text.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Please enter name and author");
        // render to add.ejs with flash message
        res.render('books', {
            p_titre: p_titre,
            p_text: p_text, 
            p_parent:form_data.p_parent,
            p_user_id:form_data.p_user_id
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            p_titre: p_titre,
            p_text: p_text,
            p_parent:p_parent,
            p_user_id:p_user_id
        }
        
        // insert query
        DBConnection.query('INSERT INTO post_messages SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('/books', {
                    p_titre: form_data.p_titre,
                    p_text: form_data.p_text,
                    p_parent:form_data.p_parent,
                    p_user_id:form_data.p_user_id              
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