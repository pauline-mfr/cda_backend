const Progression = require('../models/progression.model');

exports.getCategoryScore = (req, res) => {
    Progression.getCategoryScore(req.params.user_id, req.params.category_id, req.params.country_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Score not found for ${req.params.category_id} and ${req.params.country_id} `
                });
            } else {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving quiz score."
                });
            }
        } else res.status(200).send(data);
    });
}