const service = require('./mailDetails.service');

exports.index = (req,res) => {
    service.get(req.body).then(
        result => {
            res.status(200).json(result);
            res.end();
        }
    );
}

exports.create = (req, res) => {
    service.create(req.body).then(
        err => {
            res.status(201);
            res.end();
        }
    );
}