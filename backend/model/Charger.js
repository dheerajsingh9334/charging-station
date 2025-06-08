const mongoose = require('mongoose');

const chargerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active'
  },
  powerOutput: { type: Number, required: true },
  connectorType: { type: String, required: true }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Charger', chargerSchema);
