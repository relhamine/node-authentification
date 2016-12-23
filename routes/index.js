var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();

// create application/x-www-form-urlencoded parser
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false})


router.get('/', function (req, res) {
    if (req.session.passport && req.session.passport.user != null) {
        res.render('accueil');
    } else {
        res.render('formulaire', {user: req.user});
    }
});

router.get('/register', function (req, res) {
    if (req.session.passport.user != null) {
        res.redirect('/');
    } else {
        res.render('register', {
            title: 'Sign-up'
        });
    }
});


router.post('/register', urlencodedParser, function (req, res, next) {
    console.log("ddd");
    req.logIn(new Account({username: req.body.username}), req.body.password, function (err, account) {
        if (err) {
            return next(err);
        }
        console.log(account);
        console.log("logIn");

         passport.deserializeUser(function(id, done) {
         Account.findById(id)
         .populate('companyRoles._company', ['name', '_id'])
         .run(function (err, user) {
         console.log('dddd')
         done(err, user);
         });


         });
        Account.findOne({username: req.body.username}, function (err, user) {
            if (err) {
                return done(err)
            }
            if (user) {
                console.log(user);
                res.redirect('/register');
            }
            else {
                console.log("lalla")
                Account.register(new Account({username: req.body.username}), req.body.password, function (err, account) {
                    if (err) {
                        return res.render('error', {error: err.message});
                    }

                    passport.authenticate('local')(req, res, function () {
                        req.session.save(function (err) {
                            if (err) {
                                return next(err);
                            }
                            res.redirect('/');
                        });
                    });
                });
            }
        })

    });

});

module.exports = router;