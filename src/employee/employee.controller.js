const service = require('./employee.service');

exports.index = (req, res) => {
    console.log('Employee:: controller:: index');
    service.getAllEmployees()
        .then(
        employees => {
            const result = { result: employees, length: employees.length };
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
    console.log('Employee:: controller:: create');
    service.createEmployee(req.body).
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

exports.getEmployee = (req, res) => {
    const { params } = req;
    console.log(`Employee:: controller:: create ${params.id}`);
    service.getEmployee(params.id).
        then(emp => {
            res.status(200).json(emp);
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

exports.update = (req, res) => {
    const { params, body } = req;
    console.log(`Employee:: controller:: create ${params.id}`);
    service.updateEmployee(params.id, body).
        then(emp => {
            res.status(204);
            res.end();
        }).
        catch(
        err => {
            res.status(err.code);
            res.end(err.message);
        }
        );;

}

exports.delete = (req, res) => {
    const { params } = req;
    console.log(`Employee:: controller:: delete ${params.id}`);
    service.deleteEmployee(params.id).
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
