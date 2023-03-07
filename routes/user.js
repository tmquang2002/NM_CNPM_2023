const userController = require('../controllers/userController')
const router = require('express').Router();

// add user
router.post("/", userController.addUser);

module.exports = router;