const fs = require('fs');
let data = [];

function loadData() {
    var content = fs.readFileSync("src/data/users.js", "utf-8");
    data = JSON.parse(content);
}

function sortData(data) {
    data.sort((user1, user2) => {
        return (user1 && user2) ? user1.id - user2.id : 1;
    });
}

function getUserById(id) {
    return data.find(user => user ? id === user.id.toString() : null);
}

function getUserByUserNamePwd(userName, password) {
    return data.find(user => user ? (userName === user.userName && password === user.password) : null);
}

function getUserIndexById(id) {
    return data.findIndex(user => user ? id === user.id.toString() : null);
}

function writeToFile(dataTemp) {
    fs.writeFile('src/data/users.js', JSON.stringify(dataTemp));
}

function getAllUsers(userName, password) {
    console.log('DAO:: getAllUsers');
    loadData();
    if (userName || password) {
        //filter through data
        console.log(userName);
        console.log(password);
        const user = getUserByUserNamePwd(userName, password);
        if (user) {
            return Promise.resolve([user]);
        } else {
             return Promise.resolve([]);
        }
    }
    return Promise.resolve(data);
}

function createUser(user) {
    console.log('DAO:: createUer');
    loadData();
    sortData(data);

    const lastUser = data[data.length - 1];
    user.id = lastUser.id + 1;
    data.push(user);
    writeToFile(data);
    return Promise.resolve();
}


function getUser(id) {
    loadData();
    console.log(`DAO:: getUser ${id}`);
    const user = getUserById(id);
    if (user) {
        return Promise.resolve(user);
    }
    else {
        return Promise.reject({
            code: 404,
            message: 'Resource Not Found to GET.'
        });
    }
}

function deleteUser(id) {
    console.log(`DAO:: deleteUser ${id}`);
    loadData();
    const index = getUserIndexById(id);
    if (index >= 0) {
        delete data[index];
        let dataTemp = [];
        data.forEach(user => {
            if (user) {
                dataTemp.push(user);
            }
        });
        writeToFile(dataTemp);
    } else {
        return Promise.reject({
            code: 404,
            message: 'Resource Not Found to Delete.'
        });
    }
    return Promise.resolve();
}

module.exports = {
    createUser,
    getUser,
    deleteUser,
    getAllUsers
} 