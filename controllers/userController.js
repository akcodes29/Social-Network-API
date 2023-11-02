const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    getUsers(req, res) {
        User.find()
          .then((users) => res.json(users))
            .catch((err) => res.status(400).json(err));
    },

    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          .populate('friends')
            .populate('thoughts')
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(user);
            })
            .catch((err) => res.status(400).json(err));
    },


    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    updateUser (req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((user) => 
            !user ? res.status(404).json({message: 'No user found with this id!'}) : res.json({
                updatedUser: user,
                message: 'User updated successfully!'
            })
        )
        .catch((err) => {
            console.log(err);
            return res.status(400).json(err);
        });
    },
//delete user by ID and remove associated thoughts
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            Thought.deleteMany({ _id: { $in: user.thoughts } })
                return res.json ({
                    deletedUser: user,
                    message: 'User and thoughts deleted successfully!'
                });
            })
        .catch((err) => {
            console.log(err);
            return res.status(400).json(err);
        });
    },
// /api/users/:userId/friends/:friendId
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user ? res.status(404).json({ message: 'No user found with this id!' }) : res.json({
                    updatedUser: user,
                    message: 'Friend added successfully!'
                })
            )
            .catch((err) => { return res.status(400).json(err)
            });
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(user);
            })
            .catch((err) => res.status(400).json(err));
    }
};