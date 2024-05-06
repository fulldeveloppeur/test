const Souscription = require('../models/souscription');

exports.createSouscription = (req, res, next) => {
  const souscription = new Souscription({
    ...req.body,
  });
  console.log(souscription);
  souscription
    .save()
    .then(() => res.status(201).json({ message: 'Création du Devis' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.updateSouscription = (req, res, next) => {
  Souscription.updateOne(
    { _id: req.params.id },
    { ...req.body, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: 'Devis modifier' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSouscription = (req, res, next) => {
  Souscription.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Devis supprimé' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllSouscription = (req, res, next) => {
  Souscription.find()
    .then((souscriptions) => res.status(200).json(souscriptions))
    .catch((error) => res.status(400).json({ error }));
};
