const express = require('express');
const router = express.Router();
const Case = require('../models/portfolio_cases');
const pagination = require('../pagination'); 
const controller = require('../controller/caseController')

//Give back OPTIONS
router.options("/", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Allow', 'GET, POST, OPTIONS');
    res.send(200);
});

//Give back OPTIONS for details-page
router.options("/:id", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS');
    res.header('Allow', 'GET,PUT,DELETE,OPTIONS');
    res.send(200);

});

//Get all cases
router.get('/', async (req, res) => {
    
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    try {
        const cases = await Case.find().lean().exec();
        for (const c of cases) {
            c._links = {
                self: {
                    href: `http://145.24.222.215:8000/cases/${c._id}`
                },
                collection: {
                    href: `http://145.24.222.215:8000/cases/`
                }
                
            }
        }
        const items = {
            items: cases,
            _links: {
                self: {
                    href: "http://145.24.222.215:8000/cases"
                }
            },
            pagination: pagination.createPagination(cases.length, req.query.start, req.query.limit)
        }        
        res.json(items);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

//Get one case
router.get('/:id', getCaseId, (req, res) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, DELETE, OPTIONS');
    
    let item = res.cases
    res.status(200).json(item);

});

//Create new case
router.post('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

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
router.put('/:id', controller.update)

//Delete case
router.delete('/:id', getCaseId, async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        await res.cases.remove();
        res.status(204).json('Case deleted.')
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