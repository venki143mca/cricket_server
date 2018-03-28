const service = require('./player.service');

exports.index = (req, res) => {
    console.log('players:: controller:: index');
    service.getAllPlayer()
        .then(
        players => {
            const result = { result: players, length: players.length };
            res.status(200).json(result);
            res.end();
        }
        ).catch(
        err => {
            res.status(500);
            res.end('Error occured from server side.');
        }
        );
}
