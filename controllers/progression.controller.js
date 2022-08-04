const Progression = require('../models/progression.model');

exports.getCategoryScore = (req, res) => {
    Progression.getCategoryScore(req.params.user, req.params.category, req.params.country, (err, data) => {
        // console.log('user ',req.params.user)
        // console.log('category ',req.params.category)
        // console.log('country ',req.params.country)
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Score not found for ${req.params.category} and ${req.params.country}`
                });
            } else {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving category score."
                });
            }
        } else res.status(200).send(data);
    });
}

exports.getCountryScore = (req, res) => {
    Progression.getCountryScore(req.params.user, req.params.country, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Score not found for ${req.params.country}`
                });
            } else {
                req.status(500).send({
                    message:
                    err.message || "Some error occurred while retrieving country score"
                });
            }
        } else res.status(200).send(data);
    });
}

exports.getLevelScore = (req, res) => {
    Progression.getLevelScore(req.params.user, req.params.level, (err, data) => {
        if (err) {
            res.send(
                err.message || "Some error occurred while retrieving level score"
            )
        } else res.status(200).send(data);
    });
}

exports.getTotalQuestions = (req, res) => {
    Progression.getTotalQuestions(req.params.user, (err, data) => {
        if (err) {
            res.send(
                err.message || "Some error occurred while retrieving total questions"
            )
        } else res.status(200).send(data);
    });
}

exports.getTotalCorrectAnswers = (req, res) => {
    Progression.getTotalCorrectAnswers(req.params.user, (err, data) => {
        if (err) {
            res.send(
                err.message || "Some error occurred while retrieving correct answers"
            )
        } else res.status(200).send(data);
    });
}

exports.getAverageScore = (req, res) => {
    Progression.getAverageScore(req.params.user, (err, data) => {
        if (err) {
            res.send(
                err.message || "Some error occurred while retrieving average score"
            )
        } else res.status(200).send(data);
    });
}

exports.getBestCategory = (req, res) => {
    Progression.getBestCategory(req.params.user, (err, data) => {
        if (err) {
            res.send(
                err.message || "Some error occurred while retrieving best category"
            )
        } else res.status(200).send(data);
    });
}

exports.create = (req, res) => {
    Progression.create(req.body, (err, data) => {
        console.log('progr', req.body)
        if (err) {
            res.send(
                err.message || "Some error occurred while creating score"
            );
        } else res.status(200).send(data);
    });
}

exports.update = (req, res) => {
    Progression.update(req.params.id, req.params.score, (err, data) => {
        console.log('params',req.params)
        if (err) {
            res.send(
                    err.message || "Some error occurred while retrieving score"
                );
            } else res.status(200).send(data);
    });
}