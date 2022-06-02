const { Schema, model } = require('mongoose');
const communityIdeeSchema = require('./CommunityIdee')
const dateFormat = require('../utils/dateFormat');

const communitySchema = new Schema(
    {
        communityName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 1,
            maxlength: 20
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true
        },
        communityIdees: [communityIdeeSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

communitySchema.virtual('communityIdeeCount').get(function () {
    return this.communityIdees.length;
})

const Community = model('Community', communitySchema);

module.exports = Community;