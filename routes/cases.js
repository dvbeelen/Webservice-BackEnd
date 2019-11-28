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
router.get('/:id', getCaseId, (req, res) => {
    res.json(res.cases);
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
router.patch('/:id', getCaseId, async (req, res) => {
    if(req.body.projectName != null){
        res.cases.projectName = req.body.projectName;
    }
    if(req.body.clientName != null){
        res.cases.clientName = req.body.clientName;
    }
    if(req.body.summary != null){
        res.cases.summary = req.body.summary;
    }
    if(req.body.description != null){
        res.cases.description = req.body.description;
    }
    try {
        const updatedCase = await res.cases.save();
        res.json(updatedCase);
    } catch(err) {
        res.status(400).json({ message: err.message});
    }
});

//Delete case
router.delete('/:id', getCaseId, async (req, res) => {
    try {
        await res.cases.remove();
        res.json('Case deleted.')
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

//Middleware - Get id.

async function getCaseId(req, res, next){
    let cases
    try {
        cases = await Case.findById(req.params.id);
        if (cases == null){
            return res.status(404).json({ message: 'No case found that matches the given id.'});
        }
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    res.cases = cases;
    next();
}

//Return result
module.exports = router;