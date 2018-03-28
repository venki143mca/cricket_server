const dao = require('./mailDetails.dao');

function create(mailDetails) {
    return dao.create(mailDetails);
}

function get() {
    return dao.get();
}

module.exports = {
    create,
    get
}