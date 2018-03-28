
const fs = require('fs');
let data = [];

function create(mailDetails) {
    loadData();
    data[0] = mailDetails;
    writeToFile(data);
    return Promise.resolve();
}

function get() {
    loadData();
    return Promise.resolve(data);
}

function writeToFile(dataTemp) {
    fs.writeFile('src/data/mailDetails.js', JSON.stringify(dataTemp));
}

function loadData() {
    var content = fs.readFileSync("src/data/mailDetails.js", "utf-8");
    data = JSON.parse(content);
}

module.exports = {
    create,
    get
}