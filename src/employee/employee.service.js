const dao = require('./employee.dao');

function getAllEmployees() {
    console.log('service');
   return dao.getAllEmployees();
}

function createEmployee(employee) {
    console.log('service:: createEmployee', employee);
    return dao.createEmployee(employee) ;
}

function getEmployee(id) {
    console.log(`service:: getEmployee ${id}`);
    return dao.getEmployee(id);
}

function updateEmployee(id, employee) {
    console.log(`service:: update ${id}`);
    if(id && employee.lastName)  {
        return dao.updateEmployee(id, employee);
    }
    const error = {
        code: 403,
        message: 'Inputs are wrong.',
    }
    return Promise.reject(error);
}

function deleteEmployee(id) {
    return dao.deleteEmployee(id);
}


module.exports = {
    getAllEmployees,
    createEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee
} 