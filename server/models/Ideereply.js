const { Schema, model } = require('mongoose');

const replySchema = new Schema(
  {
    replyBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Reply = model('User', replySchema);

module.exports = Reply;
