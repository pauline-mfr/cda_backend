const Level = require('../models/level.model')

exports.getAll = (req, res) => {
    Level.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving levels."
            })
        else res.status(200).send(data);
    })
}

exports.getById = (req, res) => {
    Level.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Level not found with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Level with id " + req.params.id
                });
            }
        } else res.status(200).send(data);
    });
}