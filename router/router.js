const express = require('express');
const router = express.Router();
const { listPosts, postUpdate, addPost, postDelete } = require('../controller/Posts');
const { validationResult } = require('express-validator');
const { body, check, query, header, param } = require('express-validator');
const _ = require('lodash');
const { UserRegistration, UserLogin } = require('../controller/UserController');
const { isAuthorized, isAdminAuthorized } = require('../middleware/Authentication')
router.post('/login', UserLogin);

router.post('/postsAdd', isAdminAuthorized, addPost);
router.post('/postsList', isAdminAuthorized, listPosts);
router.put('/postsUpdate', isAdminAuthorized, postUpdate);
router.delete('/postsDelete', isAdminAuthorized, postDelete);

//post for students to view
router.post('/post-list', isAuthorized, listPosts);

module.exports = router;