const Case = require('../models/portfolio_cases');

// Check empty fields
function caseCheck(req) {

    let errors = {};

    if (!req.body.projectName) errors.projectName = 'Project name is required'
    if (!req.body.clientName) errors.clientName = 'Client name is required'
    if (!req.body.summary) errors.summary = 'Summary is a required field'
    if (!req.body.description) errors.description = 'Description is a required field'
    return Object.keys(errors).length
}

module.exports = {

    update: (req, res) => {

        if (caseCheck(req)) res.status(400).send(caseCheck.errors);
        Case.findByIdAndUpdate(req.params.id, req.body).then(cases => {
            res.status(200).json(cases)
        }).catch(err => {
            return res.status(500).json({
                message: "Failed to update case."
            });
        });
    },

}