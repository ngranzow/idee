const { Schema } = require('mongoose');

const replySchema = new Schema(
  {
    replyBody: {
      type: String,
      required: true,
      maxlength: 50
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

module.exports = replySchema;
