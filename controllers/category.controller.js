const Category = require('../models/category.model');

exports.getAll = (req, res) => {
    Category.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving categories."
            });
        else {
            res.status(200).send(data);
        }
    });
};

exports.getById = (req, res) => {
    Category.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Category with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Category with id " + req.params.id
                });
            }
        } else res.status(200).send(data);
    });
}
