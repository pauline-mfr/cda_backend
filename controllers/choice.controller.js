const Choice = require('../models/choice.model');

exports.getChoices = (req, res) => {
    Choice.getChoices(req.params.question, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `Choices not found with question_id ${req.params.question}.`
                });
            } else {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while retrieving choices."
                });
            }
        } else res.status(200).send(data);
    });
}