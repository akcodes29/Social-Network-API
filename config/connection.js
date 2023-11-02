// const { connect , connection } = require('mongoose');

// // Connect to MongoDB

// connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetworkAPI', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// });

// module.exports = connection;


require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)

module.exports = mongoose.connection;