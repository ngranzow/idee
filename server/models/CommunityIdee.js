const { Schema } = require('mongoose');

const communityIdeeSchema = new Schema(
  {
    communityIdeeText: {
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

module.exports = communityIdeeSchema;