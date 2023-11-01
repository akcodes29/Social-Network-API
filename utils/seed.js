require('dotenv').config({ path: '../.env'});
const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');

const users = [
    {
        username: 'Ashley',
        email: 'ashley@gmail.com',
    },
    {
        username: 'Ben',
        email: 'ben@gmail.com'
    },
    {
        username: 'Chris',
        email: 'chris@gmail.com'
    },
    {
        username: 'Debra',
        email: 'debra@gmail.com'
    },
    {
        username: 'Erin',
        email: 'erin@gmail.com'
    },
    {
        username: 'Fred',
        email: 'fred@gmail.com'
    },
    {
        username: 'Heather',
        email: 'heather@gmail.com'
    },
    {
        username: 'Issac',
        email: 'issac@gmail.com'
    },
    {
        username: 'Josh',
        email: 'josh@gmail.com'
    },
    {
        username: 'Kenny',
        email: 'kenny@gmail.com'
    },
    {
        username: 'Lori',
        email: 'lori@gmail.com'
    },
    {
        username: 'Mike',
        email: 'mike@gmail.com'
    },
  ]

  connection.on('error', (err) => err);

  connection.once('open', async () => {
    console.log('connected to database');
    await User.deleteMany({});
    await Thought.deleteMany({});

    const createdUsers = await User.insertMany(users);


  });

