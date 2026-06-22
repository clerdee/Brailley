const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // --- ADMIN SPECIFIC FIELDS ---
  name: { 
    type: String, 
    required: function() { return this.role === 'admin'; } 
  },
  email: { 
    type: String, 
    unique: true, 
    sparse: true, 
    required: function() { return this.role === 'admin'; } 
  },
  password: { 
    type: String, 
    required: function() { return this.role === 'admin'; } 
  },

  // --- STUDENT SPECIFIC FIELDS ---
  username: { 
    type: String, 
    unique: true, 
    sparse: true, 
    required: function() { return this.role === 'student'; } 
  },
  deviceId: { 
    type: String, 
    required: function() { return this.role === 'student'; } 
  },

  // --- SHARED FIELDS ---
  role: { 
    type: String, 
    enum: ['student', 'admin'], 
    default: 'student' 
  },
  isApproved: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.password || !this.isModified('password')) {
    return; 
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false; 
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);