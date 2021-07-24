const express = require('express');
const router = express.Router();

const jwtAuth = require('../helpers/auth/jwtAuth');
const basicAuth = require('../helpers/auth/basicAuth');

const UserQuery = require('../modules/users/query/domain');
const UserCommand = require('../modules/users/commands/domain');

router.use(basicAuth.init());

// Users
router.post('/api/v1/easy-lend/user/login', basicAuth.isAuthenticated, UserCommand.loginUser);
router.post('/api/v1/easy-lend/user/register', basicAuth.isAuthenticated, UserCommand.registerUser);
router.get('/api/v1/easy-lend/user/:userId', jwtAuth.authenticateJWT, UserQuery.getUserById);



module.exports = router;
