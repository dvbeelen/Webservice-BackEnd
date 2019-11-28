const express = require('express');
const router = express.Router();

//Get all cases
router.get('/', (req, res) => {
    res.send("Hello World!")
});

//Get one case
router.get('/:id', (req, res) => {
    res.send(req.params.id);
});

//Create new case
router.post('/', (req, res) => {

});

//Update existing case
router.patch('/', (req, res) => {

});

//Delete case
router.delete('/:id', (req, res) => {

});

module.exports = router;