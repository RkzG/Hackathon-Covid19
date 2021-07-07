const express = require('express');
const router = express.Router();

const jwtAuth = require('../helpers/auth/jwtAuth');
const basicAuth = require('../helpers/auth/basicAuth');

const UserQuery = require('../modules/users/query/domain');
const UserCommand = require('../modules/users/commands/domain');
const MentorQuery = require('../modules/mentor/query/domain');
const MentorCommand = require('../modules/mentor/commands/domain');
const LoanQuery = require('../modules/loan/query/domain');
const LoanCommand = require('../modules/loan/commands/domain');

router.use(basicAuth.init());

// Users
router.post('/api/v1/easy-lend/user/login', basicAuth.isAuthenticated, UserCommand.loginUser);
router.post('/api/v1/easy-lend/user/register', basicAuth.isAuthenticated, UserCommand.registerUser);
router.get('/api/v1/easy-lend/user/:userId', jwtAuth.authenticateJWT, UserQuery.getUserById);

// Mentors
router.get('/api/v1/easy-lend/mentor', jwtAuth.authenticateJWT, MentorQuery.getMentor);
router.get('/api/v1/easy-lend/mentor/:mentorId', jwtAuth.authenticateJWT, MentorQuery.getMentorById);
router.post('/api/v1/easy-lend/mentor', basicAuth.isAuthenticated, MentorCommand.registerMentor);

// Investor
// router.post('/api/v1/easy-lend/investor', jwtAuth.authenticateJWT, MentorCommand.registerMentor);

// E-Money
// router.post('/api/v1/easy-lend/easy-pay/', jwtAuth.authenticateJWT, PayCommand.registerMentor);
// router.get('/api/v1/easy-lend/easy-pay/:moneyId', jwtAuth.authenticateJWT, PayCommand.registerMentor);

// Loan
router.get('/api/v1/easy-lend/loan-status/:loanId', jwtAuth.authenticateJWT, LoanQuery.getDetailLoan);
router.post('/api/v1/easy-lend/loan', jwtAuth.authenticateJWT, LoanCommand.requestLoan);

module.exports = router;
