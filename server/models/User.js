const mongoose = require('mongoose'); const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: function() { return this.role === 'admin'; } },
  email: { type: String, unique: true, sparse: true, required: function() { return this.role === 'admin'; } },
  password: { type: String, required: function() { return this.role === 'admin'; } },
  username: { type: String, unique: true, sparse: true, required: function() { return this.role === 'student'; } },
  deviceId: { type: String, required: function() { return this.role === 'student'; } },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  isApproved: { type: Boolean, default: false },
  deviceData: {
    battery: { type: String, default: '0%' },
    status: { type: String, default: 'Offline' },
    lastSync: { type: Date }
  }
}, { timestamps: true });

userSchema.pre('save', async function () {
  if (this.isModified('password') && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);