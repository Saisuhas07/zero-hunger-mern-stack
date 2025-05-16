const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: [true, 'Please add a food name'],
    trim: true,
    maxlength: [100, 'Food name cannot be more than 100 characters']
  },
  quantity: {
    type: String,
    required: [true, 'Please specify the quantity'],
    trim: true
  },
  expiryDate: {
    type: Date,
    required: [true, 'Please add an expiry date'],
    validate: {
      validator: function(v) {
        return v > new Date();
      },
      message: 'Expiry date must be in the future'
    }
  },
  foodType: {
    type: String,
    required: [true, 'Please specify the food type'],
    enum: {
      values: [
        'Fruits & Vegetables',
        'Grains & Cereals',
        'Dairy Products',
        'Meat & Poultry',
        'Packaged Foods',
        'Beverages',
        'Other'
      ],
      message: '{VALUE} is not a valid food type'
    }
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  location: {
    type: String,
    required: [true, 'Please add a pickup location'],
    trim: true
  },
  contactInfo: {
    type: String,
    required: [true, 'Please add contact information'],
    trim: true
  },
  status: {
    type: String,
    enum: {
      values: ['available', 'requested', 'completed'],
      message: '{VALUE} is not a valid status'
    },
    default: 'available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add index for better query performance
donationSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Donation', donationSchema); 