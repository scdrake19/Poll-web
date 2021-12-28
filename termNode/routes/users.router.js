let express = require('express');
let router = express.Router();
const userController = require('../controllers/user.controller');
const authorize = require("../_helpers/authorize");
/* GET users listing. */


router.post('/authenticate', userController.authenticate);
router.post('/register', userController.register);
router.get('/allusers', authorize(),userController.getAllUsers);
router.get('/name', userController.getName);
module.exports = router;
