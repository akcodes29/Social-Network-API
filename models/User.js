const { Schema, model } = require('mongoose');

// Schema for User model

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought' //will need to populate this!
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'  //will need to populate this!
            }
        ]
    },
     {
        toJSON: {
            virtuals: true
        },
        id: false,
     }
);

// Virtual to get total count of friends
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Create the User model using the UserSchema
const User = model('User', userSchema);

// Export the User model
module.exports = User;