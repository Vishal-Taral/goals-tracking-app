const serverUrl = 'http://164.52.214.199:9696/api';
 
export const apiUrlObject = {
    getAllCategories : `${serverUrl}/categories`,
    updateCategory : `${serverUrl}/updateCategory`,
    addCategory : `${serverUrl}/addCategory`,
    deleteCategory : `${serverUrl}/deleteCategory`,
    getAllRoles : `${serverUrl}/roles`,
    addRole : `${serverUrl}/addRole`,
    deleteRole : `${serverUrl}/deleteRole`,
    updateRole : `${serverUrl}/updateRole`,
    getAllUsers : `${serverUrl}/users`,
    addUser : `${serverUrl}/addUser`,
    deleteUser : `${serverUrl}/deleteUser`,
    updateUser : `${serverUrl}/updateUser`,
    getLogin : `${serverUrl}/Login`,
    getUserAuthorization: `${serverUrl}/getUserAuthorize`,
    getRoleByID: `${serverUrl}/role`,
    getCategoryByID: `${serverUrl}/category`,
    getUserByID: `${serverUrl}/user`,
    postLogout: `${serverUrl}/Logout`
}
 