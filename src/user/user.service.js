const dao = require('./user.dao');

function getAllUsers(userName, password) {
    console.log('service');
   return dao.getAllUsers(userName, password);
}

function createUser(user) {
    console.log('service:: createUser', user);
    return dao.createUser(user);
}

function getUser(id) {
    console.log(`service:: getUser ${id}`);
    return dao.getUser(id);
}

function deleteUser(id) {
    console.log(`service:: deleteUser ${id}`);
    return dao.deleteUser(id);
}

module.exports = {
    createUser,
    getUser,
    deleteUser,
    getAllUsers
} 