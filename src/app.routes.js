const express = require('express');
const router = express.Router();
const upload = require('./libs/upload');

const {auth, home, post, user, comment, favorite} = require('./controllers');

/**
 * Register routes.
 */
router.all('/', (req, res) => res.send('Hello!'));
router.all('/ping', (req, res) => res.send('pong'));

/**
 * Auth
 */
router.post('/login', auth.login);
router.post('/register', auth.register);

/**
 * Accounts
 */
const account = require('./controllers/account');
router.post('/accounts/forget-password', account.forgetPassword);
router.post('/accounts/reset-password', account.resetPassword);

/**
 * Home
 */
router.get('/home', auth.maybeAuthorized, home.hot);
router.get('/home/hot', auth.maybeAuthorized, home.hot);
router.get('/home/trending', auth.maybeAuthorized, home.trending);
router.get('/home/fresh', auth.maybeAuthorized, home.fresh);

/**
 * Posts
 */
router.get('/posts/pending', post.listPendingPosts);
router.post('/posts/upload', upload.single('image'), post.upload);
router.post('/posts', auth.isAuthorized, post.create);
router.put('/posts/:id', auth.isAuthorized, post.update);
router.delete('/posts/:id', auth.isAuthorized, post.delete);
router.get('/posts/:id', auth.maybeAuthorized, post.detail);

router.get('/posts/:id/comments', comment.listFreshComments);
router.get('/posts/:id/comments/hot', comment.listHotComments);
router.post('/posts/:id/comments', auth.isAuthorized, comment.addComment);
router.put('/posts/:id/comments/:commentId', auth.isAuthorized, comment.updateComment);
router.delete('/posts/:id/comments/:commentId', auth.isAuthorized, comment.deleteComment);
router.post('/posts/:id/comments/:commentId/vote', auth.isAuthorized, comment.voteComment);
router.post('/posts/:id/comments/:commentId/un-vote', auth.isAuthorized, comment.unVoteComment);

router.post('/posts/:id/vote', auth.isAuthorized, post.vote);
router.post('/posts/:id/un-vote', auth.isAuthorized, post.unVote);

router.post('/posts/:id/favorites', auth.isAuthorized, favorite.addFavorite);
router.delete('/posts/:id/favorites', auth.isAuthorized, favorite.removeFavorite);

/**
 * Users
 */
router.get('/users/profile', auth.isAuthorized, user.profile);
router.get('/users/my-comments', auth.isAuthorized, user.myComments);
router.get('/users/my-posts', auth.isAuthorized, user.myPosts);
router.get('/users/my-votes', auth.isAuthorized, user.myVotes);
router.get('/users/my-favorites', auth.isAuthorized, user.myFavorites);

/**
 * Public users.
 */
const publicUser = require('./controllers/publicUser');
router.get('/public/:userId/avatar', publicUser.getAvatar);

/**
 * Exports.
 */
module.exports = router;