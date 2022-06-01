const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const communitySchema = new Schema(
    {
        communityname: {
            type: String,
            required: 'Leave your community',
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
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

Community.virtual('communityCount').get(function () {
    return this.communityname.length;
})

const Community = model('Community', communitySchema);

module.exports = Community;