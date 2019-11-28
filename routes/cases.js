const express = require('express');
const router = express.Router();
const Case = require('../models/portfolio_cases');

//Get all cases
router.get('/', async (req, res) => {
    try {
        const cases = await Case.find();
        res.json(cases);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

//Get one case
router.get('/:id', (req, res) => {
    res.send(req.params.id);
});

//Create new case
router.post('/', async (req, res) => {
    const newCase = new Case({
        projectName: req.body.projectName,
        clientName: req.body.clientName,
        summary: req.body.summary,
        description: req.body.description
    });

    try {
        const createdCase = await newCase.save();
        res.status(201).json(createdCase);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

//Update existing case
router.patch('/', (req, res) => {

});

//Delete case
router.delete('/:id', (req, res) => {

});

module.exports = router;