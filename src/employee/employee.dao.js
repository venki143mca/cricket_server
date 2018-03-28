const fs = require('fs');
let data = [];

function loadData() {
    var content = fs.readFileSync("src/data/employee.js", "utf-8");
    data = JSON.parse(content);
}

function sortData(data) {
    data.sort((emp1, emp2) => {
        return (emp1 && emp2) ? emp1.id - emp2.id : 1;
    });
}

function getEmployeeById(id) {
    return data.find(emp => emp ? id === emp.id.toString() : null);
}

function getEmployeeIndexById(id) {
    return data.findIndex(emp => emp ? id === emp.id.toString() : null);
}

function writeToFile(dataTemp) {
    fs.writeFile('src/data/employee.js', JSON.stringify(dataTemp));
}

function updateEmployeeWithInput(existing, input) {
    existing.id = existing.id;
    existing.DOB = input.DOB ? input.DOB : employee.DOB;
    existing.clientEmail = input.clientEmail ? input.clientEmail : employee.clientEmail;
    existing.email = input.email ? input.email : employee.email;
    existing.firstName = input.firstName ? input.firstName : employee.firstName;
    existing.lastName = input.lastName ? input.lastName : employee.lastName;
    existing.team = input.team ? input.team : employee.team;
}

function getAllEmployees() {
    console.log('DAO:: getAllEmployees');
    loadData();
    return Promise.resolve(data);
}
function createEmployee(employee) {
    console.log('DAO:: createEmployee');
    loadData();
    sortData(data);

    const lastEmployee = data[data.length - 1];
    employee.id = lastEmployee.id + 1;
    data.push(employee);
    writeToFile(data);
    return Promise.resolve();
}

function getEmployee(id) {
    loadData();
    console.log(`DAO:: getEmployee ${id}`);
    const emp = getEmployeeById(id);
    if (emp) {
        return Promise.resolve(emp);
    }
    else {
        return Promise.reject({
            code: 404,
            message: 'Resource Not Found to GET.'
        });
    }
}

function updateEmployee(id, employee) {
    console.log(`DAO:: updateEmployee ${id}`);
    loadData();
    const emp = getEmployeeById(id);
    if (emp) {
        const index = getEmployeeIndexById(id);
        updateEmployeeWithInput(emp, employee);
        data[index] = emp;
        writeToFile(data);
        return Promise.resolve();
    } else {
        return Promise.reject({
            code: 404,
            message: 'Resource Not Found to Update.'
        });
    }
}

function deleteEmployee(id) {
    loadData();
    const index = getEmployeeIndexById(id);
    if (index >= 0) {
        delete data[index];
        let dataTemp = [];
        data.forEach(emp => {
            if (emp) {
                dataTemp.push(emp);
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
    getAllEmployees,
    createEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee
} 