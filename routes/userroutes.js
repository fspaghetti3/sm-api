const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:userId', userController.getUserById);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

router.post('/:userId/friends/:friendId', userController.addFriend);
router.delete('/:userId/friends/:friendId', userController.removeFriend);


module.exports = router;