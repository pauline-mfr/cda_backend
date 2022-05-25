const Question = require('../models/question.model')

exports.getQuiz = (req, res) => {
    Question.getQuiz(req.params.country_id, req.params.category_id,(err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Quiz not found with country ${req.params.country_id} or category ${req.params.category_id}.`
                });
            } else {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while retrieving the quiz."
                });
            }
        } else res.status(200).send(data);
    })
}


exports.getById = (req, res) => {
    Question.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Question not found with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message:
                    err.message || "Error retrieving Question with id " + req.params.id
                });
            }
        } else res.status(200).send(data);
    });
}