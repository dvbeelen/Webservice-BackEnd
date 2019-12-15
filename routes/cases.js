const express = require('express');
const router = express.Router();
const Case = require('../models/portfolio_cases');
const pagination = require('../pagination'); 

//Give back OPTIONS
router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Allow', 'GET, POST, OPTIONS');


    //Check if method = OPTIONS
    if ('OPTIONS' === req.method) {
      //respond with 200
      res.sendStatus(200);
    } 
    else if (req.headers.accept != 'application/json') {
          res.sendStatus(400);
        }
    else {
        next()
    }
});

//Get all cases
router.get('/', async (req, res) => {

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

    const item = {}
    item.item = res.cases
    item._links = {
        self: {
            href: `http://145.24.222.215:8000/cases/${res.cases._id}`
        },
        collection: {
            href: `http://145.24.222.215:8000/cases/`
        }
    }
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Allow', 'GET, OPTIONS');
    res.json(item);
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
router.put('/:id', getCaseId, async (req, res) => {
    if(req.body.projectName != null){
        res.cases.projectName = req.body.projectName;
    } else {
        req.body.projectName = res.cases.projectName
    }
    if(req.body.clientName != null){
        res.cases.clientName = req.body.clientName;
    } else {
        req.body.clientName = res.cases.clientName;
    }
    if(req.body.summary != null){
        res.cases.summary = req.body.summary;
    } else {
        req.body.summary = res.cases.summary;
    }
    if(req.body.description != null){
        res.cases.description = req.body.description;
    } else {
        req.body.description = res.cases.description
    }
    try {
        const updatedCase = await res.cases.save();
        res.status(200).json(updatedCase);
    } catch(err) {
        res.status(400).json({ message: err.message});
    }
});

//Delete case
router.delete('/:id', getCaseId, async (req, res) => {
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