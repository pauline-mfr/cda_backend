const Country = require('../models/country.model')

exports.getAll = (req, res) => {
    Country.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving countries."
            })
        else res.status(200).send(data);
    })
}

exports.getById = (req, res) => {
    Country.getById(req.params.id, (err, data) => {

        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Country with id ${req.params.id}.`
                })
            } else {
                res.status(500).send({
                    message: "Error retrieving Country with id " + req.params.id
                })
            }
        } else res.status(200).send(data);
    })
}

exports.getByLevel = (req, res) => {
    Country.getByLevel(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Countries for this level ${req.params.id}.`
                })
            } else {
                res.status(500).send({
                    message: "Error retrieving Country for this level " + req.params.id
                })
            }
        } else res.status(200).send(data);
    })
}

exports.getLevels = (req, res) => {
    Country.getLevels((err, data) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving levels"
            })
            else res.status(200).send(data);
    })
}

exports.getUnlockedLevels = (req, res) => {
    Country.getUnlockedLevels((err, data) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving unlocked levels"
            })
            else res.status(200).send(data);
    })
}

exports.getIdentifier = (req, res) => {
    Country.getIdentifier(req.params.name,(err, data) => {
        if (err)
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Country with id ${req.params.id}.`
                })
            } else {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving this id"
                })
            }
        else res.status(200).send(data);
    })
}
