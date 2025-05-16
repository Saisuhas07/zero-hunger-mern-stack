const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

// Get all donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find({ status: 'available' }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new donation
router.post('/', async (req, res) => {
  const donation = new Donation({
    foodName: req.body.foodName,
    quantity: req.body.quantity,
    expiryDate: req.body.expiryDate,
    foodType: req.body.foodType,
    description: req.body.description,
    location: req.body.location,
    contactInfo: req.body.contactInfo
  });

  try {
    const newDonation = await donation.save();
    res.status(201).json(newDonation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Request a donation
router.post('/:id/request', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    if (donation.status !== 'available') {
      return res.status(400).json({ message: 'Donation is no longer available' });
    }

    donation.status = 'requested';
    const updatedDonation = await donation.save();
    res.json(updatedDonation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 