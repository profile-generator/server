const router = require('express').Router();
const Authorize = require('../middlewares/userAuthorization')
const UserControll = require('../controllers/users');

router.get('/', UserControll.read);
router.get('/:id', UserControll.readOne);
router.post('/likes/:id',UserControll.like);
router.post('/dislikes/:id',UserControll.dislike);






module.exports = router