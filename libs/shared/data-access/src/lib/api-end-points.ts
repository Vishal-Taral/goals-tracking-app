const serverUrl = 'http://164.52.214.199:9696/api';
const firstName = 'v';
const sortOrder = 'desc';
 
export const apiUrlObject = {
    getAllCategories : `${serverUrl}/categories?page=${1}&pageSize=${4}&categoryName=&sortOrder=${sortOrder}`,
    updateCategory : `${serverUrl}/updateCategory`,
    addCategory : `${serverUrl}/addCategory`,
    deleteCategory : `${serverUrl}/deleteCategory`,
 
    // Json Server Urls
 
    // getAllCategories : 'http://localhost:8000/data',
    // updateCategory : 'http://localhost:8000/data',
    // addCategory : 'http://localhost:8000/data',
    // deleteCategory : 'http://localhost:8000/data',
 
    // getAllRoles : 'http://localhost:8001/data',
    getAllRoles : `${serverUrl}/roles?page=${1}&pageSize=${4}&sortOrder=${sortOrder}`,
    addRole : `${serverUrl}/addRole`,
    deleteRole : `${serverUrl}/deleteRole`,
    updateRole : `${serverUrl}/updateRole`,
 
    getAllUsers : `${serverUrl}/users`,
    addUser : `${serverUrl}/addUser`,
    deleteUser : `${serverUrl}/deleteUser`,
    updateUser : `${serverUrl}/updateUser`,
 
    // getLogin: 'http://localhost:8003/loginData',
    getLogin : `${serverUrl}/Login`,
    getUserAuthorization: `${serverUrl}/getUserAuthorize`,
    getRoleByID: `${serverUrl}/role`,
    getCategoryByID: `${serverUrl}/category`,
    getUserByID: `${serverUrl}/user`
}
 