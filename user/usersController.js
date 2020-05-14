const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('./User');


router.get('/admin/users', (req, res) => {
    User.findAll().then(users => {
        res.render('admin/users/index', {users: users, user: req.session.user});
    }).catch(error => {
        console.log(error);
        res.redirect('/');
    }); 
});

router.get('/admin/users/create', (req, res) => {
    var cadastrado = "";
    res.render('admin/users/create', {cadastrado: cadastrado, user: req.session.user});
});

router.post('/users/create', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var cadastrado = "";
    User.findOne({where: {email : email}}).then(user => {
        if(user == undefined || user == null) {
            var salt = bcrypt.genSaltSync(10);

            var hash = bcrypt.hashSync(password, salt);
        
            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect('/');
            }).catch((error) => {
                console.log(error);
                res.redirect('/');
            });
        } else {
            cadastrado = "O usuário já se encontra cadastrado";
            res.render('admin/users/create', {cadastrado: cadastrado, user: req.session.user});
        }
    });
 
});

router.get('/login', (req, res) => {
    res.render('admin/users/login');
});

router.post('/authenticate', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where: {email: email}}).then(user => {
        if(user != undefined) { // if user exist
            // validate password
            var passCheck = bcrypt.compareSync(password, user.password);
            if(passCheck) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                };
                res.redirect('/');
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect('/login');
        }
    });
});

router.get('/logout', (req, res) => {
    req.session.user = undefined;
    res.redirect('/');
});

module.exports = router;
