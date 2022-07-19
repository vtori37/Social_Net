const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
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
      trim: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,3})$/]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;