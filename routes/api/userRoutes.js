const router = require('express').Router();

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend  
} = require('../../controllers/userController');

// /api/users
router
    .route('/')
    .get(getUsers)
    .post(createUser);

// /api/users/:id  (don't use the : in insomnia)
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;
