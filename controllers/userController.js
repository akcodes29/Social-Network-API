const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    getUsers(req, res) {
        User.find()
          .then((users) => res.json(users))
            .catch((err) => res.status(400).json(err));
    },

    getUserById(req, res) {
        User.findOne({ _id: req.params.id })
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

    createUser(req, res) {
        User.create({
            username: req.body.username,
            email: req.body.email
        })
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            {
                username: req.body.username,
                email: req.body.email
            },
            {
                new: true,
                runValidators: true
            },
            (err, result) => {
                if (result) {
                    res.json(result);
                    console.log(`Updated: ${result}`);
                } else {
                    console.log(err);
                    res.status(500).json(err);
                }
            }
        )
    },

    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.id })
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            Thought.deleteMany({ username: user.username })
                .then(() => {
                    res.json({ message: 'User and associated thoughts deleted!' });
                })
                .catch((err) => res.status(400).json(err));
        })
        .catch((err) => res.status(400).json(err));
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { friends: req.params.friendId } },
            { new: true }
        )
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(user);
            })
            .catch((err) => res.status(400).json(err));
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendId } },
            { new: true }
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