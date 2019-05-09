const router = require('express').Router();
const Articles = require('./articles');
const Authentic = require('../middlewares/authentication')
const AuthControll = require('../controllers/users');

router.post('/signup', AuthControll.signUp);
router.post('/signin', AuthControll.signIn);


router.use(Authentic);




module.exports = router