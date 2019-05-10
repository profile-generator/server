const router = require('express').Router();
const Authentic = require('../middlewares/authentication')
const AuthControll = require('../controllers/users');
const users = require('./users')
const {
    sendUploadToGCS,
    multer
} = require('../middlewares/multer');

router.post('/register',
    multer.single('image'),
    sendUploadToGCS,
    AuthControll.signUp);
router.post('/signin', AuthControll.signIn);


router.use(Authentic);
router.use('/users', users);




module.exports = router