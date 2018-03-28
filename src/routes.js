const playerRouter = require('./player');

exports.routes = app => {
    app.use('/cricketapi/player', playerRouter);
}
