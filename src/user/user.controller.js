const service = require('./user.service');
const token = require('./../authentication/token');

exports.login = (req, res) => {
    console.log('User:: controller:: index', req.body);
    const query = req.query;
    console.log('username::::', req.body.userName);
    service.getAllUsers(req.body.userName, req.body.password)
        .then(
            users => {
                console.log('reached here', users);
                if (users != null && users.length != 0) {
                    res.json(token.generateToken(users[0]));
                    res.status(200);
                    res.end();
                } else {
                    res.status(403);
                    res.end("UnAuthorized.");
                }
            }
        ).catch(
            err => {
                res.status(500);
                res.end('Error occured from server side.');
            }
        );
}

exports.index = (req, res) => {
    console.log('User:: controller:: index');
    const query = req.query;
    console.log('username::::', query.userName);
    service.getAllUsers(query.userName, query.password)
        .then(
            users => {
                const result = { result: users, length: users.length };
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

exports.create = (req, res) => {
    console.log('User:: controller:: create');
    res.status(201);
    res.end();
    service.createUser(req.body).
        then(() => {
            res.status(201);
            res.end();
        }).
        catch(
            err => {
                res.status(500);
                res.end('Error occured from server side.');
            }
        );
}

exports.getUser = (req, res) => {
    const { params } = req;
    console.log(`User:: controller:: create ${params.id}`);

    service.getUser(params.id).
        then(user => {
            res.status(200).json(user);
            res.end();
        }).
        catch(
            err => {
                if (err) {
                    res.status(err.code);
                    res.end(err.message);
                } else {
                    res.status(500);
                    res.end('Error occured from server side.');
                }
            }
        );
}

exports.delete = (req, res) => {
    const { params } = req;
    console.log(`User:: controller:: delete ${params.id}`);
    service.deleteUser(params.id).
        then(err => {
            if (err) {
                res.status(err.code);
                res.end(err.message);
            } else {
                res.status(204);
                res.end();

            }
        }).
        catch(
            err => {
                res.status(err.code);
                res.end(err.message);
            }
        );;
}
