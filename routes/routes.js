const express = require('express');
const router = express.Router();

const { getAllUsers, deleteUser, getUser, register, login, updateRating } = require('../controllers/users');
const {getInventionsFromUser, getAllInventions, addInvention, deleteInvention, rateInvention} = require('../controllers/inventions');


router
    .route('/')
    .get(getAllUsers)
// .get(getAllInventions)
// .post(addInvention)

router
    .route('/inventions')
    .get(getAllInventions)
    .post(addInvention) 

router
    .route('/invention/:id')
    .post(rateInvention)
    .delete(deleteInvention)

router
    .route('/user/:username')
    .get(getInventionsFromUser)
    .delete(deleteUser)
    .put(updateRating)

router
    .route('/register')
    .post(register)

router
    .route('/login')
    .post(login)


module.exports = router;