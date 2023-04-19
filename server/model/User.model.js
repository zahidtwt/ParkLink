const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      unique: [true, 'Username already taken, please choose a different one.'],
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long.'],
      maxlength: [20, 'Username cannot exceed 20 characters.'],
      match: [
        /^[a-zA-Z0-9_-]{3,20}$/,
        'Username can only contain letters, numbers, underscores, and hyphens.',
      ],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must be at least 8 characters long.'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: [true, 'Email address already in use.'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address.'],
    },
    firstName: {
      type: String,
      trim: true,
      maxlength: [20, 'First name cannot exceed 20 characters.'],
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: [20, 'Last name can not exceed 20 characters.'],
    },
    mobile: {
      type: String,
      trim: true,
      match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit mobile number.'],
    },
    address: {
      type: String,
      trim: true,
      maxlength: [100, 'Address cannot exceed 100 characters.'],
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      lowercase: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    due: {
      type: Number,
      default: 0,
    },
    profileImage: {
      type: String,
      default:
        'https://res.cloudinary.com/di31yslny/image/upload/c_scale,q_61,w_237/v1681855844/3d-illustration-person-with-sunglasses_23-2149436188_vtqr1a.avif',
    },
    bookmarkedParkings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Parking',
      },
    ],
  },
  { timestamps: true }

  // automatically adds two fields to the schema: createdAt and updatedAt. These fields
  // track when a document was created and when it was last updated.
);

const User = mongoose.model('User', userSchema);

module.exports = User;
