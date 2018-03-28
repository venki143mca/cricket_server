const employeeRouter = require('./employee');
const mailDetailsRouter = require('./mailDetails');
const userRouter = require('./user');

exports.routes = app => {
    app.use('/employee', employeeRouter);
    app.use('/mailDetails', mailDetailsRouter);
    app.use('/user', userRouter);
}
