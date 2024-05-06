const mongoose = require('mongoose');

const souscriptionSchema = new mongoose.Schema({
  refDossier: { type: String, required: true },
  siren: { type: String, required: true },
  adresse: { type: String, required: true },
  numOpportunite: { type: String, required: true },
  nomClient: { type: String, required: true },
  tarif: { type: String, required: true },
  affaire: { type: String, required: true },
  intermediaire: { type: String, required: true },
  description: { type: String, required: true },
  presenceCoassurance: { type: Boolean, required: true },
  descriptifDetaille: { type: String, required: true },
  image: { type: String, required: true },
  planImage: { type: String, required: true },
});

module.exports = mongoose.model('souscription', souscriptionSchema);
