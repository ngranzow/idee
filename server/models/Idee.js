const { Schema, model } = require('mongoose');
const replySchema = require('./Ideereply');
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
    replys: [replySchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

ideeSchema.virtual('IdeereplyCount').get(function() {
  return this.replys.length;
});

const Idee = model('idee', ideeSchema);

module.exports = Idee;