const Question = require('../models/question.model')

exports.getRandomQuiz = (req, res) => {
    Question.getRandomQuiz(req.params.country, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message : `Randdom quiz not found for country ${req.params.country}.`
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

exports.getQuiz = (req, res) => {
    Question.getQuiz(req.params.country, req.params.category,(err, data) => {
        console.log('category', req.params.category)
        console.log('country', req.params.country)
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Quiz not found with country ${req.params.country} or category ${req.params.category}.`
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