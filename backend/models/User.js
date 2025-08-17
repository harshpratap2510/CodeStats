// backend/models/userModel.js

import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    leetcodeHandle: {
      type: String,
      default: '',
    },
    codechefHandle: {
      type: String,
      default: '',
    },
    codeforcesHandle: {
      type: String,
      default: '',
    },
    gfgHandle: {
      type: String,
      default: '',
    },
    profilePicture: {
      type: String,
      default: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y', // any default avatar
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export { User };
