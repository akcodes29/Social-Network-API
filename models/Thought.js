const { Schema, model } = require('mongoose');
const  Reaction = require('./Reaction');
const dateFormat = require('../utils/dateFormat');
const reactionSchema = require('./Reaction');

// Schema for Thought model
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [Reaction], 
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Virtual to get total count of reactions
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// Export the Thought model
module.exports = Thought;