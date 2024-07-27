// create Email Verification Pin Model

const mongoose = require('mongoose');

const emailVerificationPinSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  expiration_time: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

const EmailVerificationPin = mongoose.model('EmailVerificationPin', emailVerificationPinSchema);
module.exports = EmailVerificationPin;
