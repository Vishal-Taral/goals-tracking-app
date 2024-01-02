const serverUrl = 'http://192.168.1.105:3333/api';

export const apiUrlObject = {
    // getAllRoles : `${serverUrl}/roles`,
    // getAllCategories : `${serverUrl}/categories`,
    // updateCategory : `${serverUrl}/updateCategory`,
    // addCategory : `${serverUrl}/api/addCategory`,
    // deleteCategory : `${serverUrl}/api/deleteCategory`,

    // Json Server Urls

    getAllCategories : 'http://localhost:8000/data',
    updateCategory : 'http://localhost:8000/data',
    addCategory : 'http://localhost:8000/data',
    deleteCategory : 'http://localhost:8000/data',

    getAllRoles : 'http://localhost:8001/data',
    addRole : 'http://localhost:8001/data',
    deleteRole : 'http://localhost:8001/data',
    updateRole : 'http://localhost:8001/data',

    getAllUsers : 'http://localhost:8002/data',
    addUser : 'http://localhost:8002/data',
    deleteUser : 'http://localhost:8002/data',
    updateUser : 'http://localhost:8002/data',

    // getLogin: 'http://localhost:8003/loginData',
    getLogin : `${serverUrl}/Login`,
}

