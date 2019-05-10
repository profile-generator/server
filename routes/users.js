const router = require('express').Router();
const Articles = require('./articles');
const Authorize = require('../middlewares/userAuthorization')
const AuthControll = require('../controllers/users');

router.post('/signup',
    multer.single('image'),
    sendUploadToGCS,
    AuthControll.signUp);
router.post('/signin', AuthControll.signIn);


router.use(Authentic);




module.exports = router