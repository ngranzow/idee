const { Schema, model } = require('mongoose');
const reactions = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const ideeSchema = new Schema(
  {
    ideeText: {
      type: String,
      required: 'Leave your idee',
      minlength: 1,
      maxlength: 50
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
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

ideeSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const idee = model('idee', ideeSchema);
module.exports = Idee;