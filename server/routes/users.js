const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const validator = require('validator');
const serverSettings = require('../settings/settings')();
const db = mongojs(serverSettings.mongo_connectionString, ['users']);

//Get All Users
router.get('/', (req, res, next) => {
    db.users.find((err, users) => {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
});

//Get Single User
router.get('/:id', (req, res, next) => {
    db.users.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
})

//Save User
router.post('/user', (req, res, next) => {
    var user = req.body;
    if (validator.isEmpty(user.firstName) || validator.isEmpty(user.lastName) || validator.isEmpty(user.address[0])) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        })
    } else {
        db.users.save(user, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        })
    }
});

//Delete User
router.delete('/:id', (req, res, next) => {
    db.users.remove({ _id: mongojs.ObjectId(req.params.id) }, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});

module.exports = router;