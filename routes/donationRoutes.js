const express = require('express');
const router = express.Router();
const {
  getAllDonations,
  getDonation,
  createDonation,
  requestDonation,
  updateDonationStatus
} = require('../controllers/donationController');

// Get all donations and create new donation
router.route('/')
  .get(getAllDonations)
  .post(createDonation);

// Get single donation and update status
router.route('/:id')
  .get(getDonation)
  .put(updateDonationStatus);

// Request a donation
router.route('/:id/request')
  .post(requestDonation);

module.exports = router; 