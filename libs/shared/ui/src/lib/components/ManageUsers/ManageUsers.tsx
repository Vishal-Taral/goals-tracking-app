/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './ManageUsers.module.scss';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useState } from 'react';
import CreateUsers from '../CreateUsers/CreateUsers';
import DeleteUser from '../DeleteUser/DeleteUser';
import { useGetUserByID, useGetUsers , useGetRoles } from '@goal-tracker/data-access';
import UpdateUser from '../UpdateUser/UpdateUser';
import PageNumberContainer from '../PageNumberContainer/PageNumberContainer';

/* eslint-disable-next-line */
export interface ManageCategories {
  tableData : any;
}

export function ManageUsers({ tableData } : ManageCategories) {
  const [updateUserId, setUpdateUserId] = useState(null);
  const [prefilledInputData, setPrefilledInputData] = useState();
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [searchID, setSearchID] = useState('');
  const [searchResultDisplay, setSearchResultDisplay] = useState(false);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);

  const { data: roles } = useGetRoles();
  const { data: usersList , refetch } = useGetUsers();
  const { data: searchResponse, refetch: refetchSearch } = useGetUserByID(searchID);

  // console.log("usersList" , usersList);
  
  
  const handleCloseCreatePopup = () => {
    setOpenCreatePopup(false);
    refetch();
  }

  const handleCreateUser = () => {
    // setSelectedRowIndex(index);
    setOpenCreatePopup(true);
  };
  const handleCloseDeletePopup = () => {
    setOpenDeletePopup(false);
    refetch();
  };
 
  const deletePopupOpenHandler = (index: number, data: any) => {
    console.log('data delete', data)
    setOpenDeletePopup(true);
    setDeleteUserId(data?.userId);
    console.log('data.id',data)
  };

  const handleCloseUpdatePopup = () => {
    setOpenUpdatePopup(false);
    refetch();
  }
  const updatePopupOpenHandler = (index: number, data: any) => {
    setOpenUpdatePopup(true);
    setUpdateUserId(data?.userId);
    console.log("data?.userId",data?.userId)
    setPrefilledInputData(data);
  };

  const searchInputChangeHandler = (e: any) => {
    setSearchID(e.target.value);
  };

  const searchHandler = () => {
    console.log('searchID', searchID);
    refetchSearch();
    console.log('searchResponse', searchResponse);
    setSearchResultDisplay(true)

  };
  return (
    <div className={styles.container}>
      <div className={styles.users}>
        <Button variant="outlined" onClick={() => handleCreateUser()}>Add User</Button>
      </div>

      <div className={styles.searchBlock}>
        <input
          onChange={searchInputChangeHandler}
          className={styles.searchInput}
          placeholder="Search By ID"
        />
        <button className={styles.searchButton} onClick={searchHandler}>
          Search
        </button>
      </div>
      {searchResultDisplay ? (
        <div className={styles.searchResultBlock}>
          <b>Search Result</b>
          <div>ID- {searchResponse?.data?.userId}</div>
          <div>First Name- {searchResponse?.data?.firstName}</div>
          <div>Last Name- {searchResponse?.data?.lastName}</div>
          <div>Gender- {searchResponse?.data?.gender}</div>
          <div>Email- {searchResponse?.data?.email}</div>
          <div>Role ID- {searchResponse?.data?.role.roleId}</div>
          <div>Role Name- {searchResponse?.data?.role.name}</div>
          <div>Role Description- {searchResponse?.data?.role.description}</div>

          <button className={styles.searchResultCloseButton} onClick={()=>setSearchResultDisplay(false)}>Close</button>
        </div>
      ) : (
        ''
      )}
      <div className={styles.user_detail_container}>
        <table className={styles.table}>
          <thead className={styles.table_headings_section}>
            <tr>
              {tableData?.headings?.map((data: any, index: number) => (
                <th className={styles.headings} key={index}>
                  {data}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {usersList?.data?.map((data: any, index: number) => (
              <tr key={index} className={styles.table_row}>
                <td className={styles.table_data}>{data.userId}</td>
                <td className={styles.table_data}>{data?.firstName}</td>
                <td className={styles.table_data}>{data?.lastName}</td>
                <td className={styles.table_data}>{data?.gender}</td>
                <td className={styles.table_data}>{data?.email}</td>
                <td className={styles.table_data}>{data?.mobile_number}</td>
                <td className={styles.table_data}>{data?.role?.name}</td>
                <td className={styles.table_data}>
                  <span
                    className={styles.icons}
                    onClick={() => updatePopupOpenHandler(index, data)}
                  >
                    <EditIcon />
                  </span>
                </td>
                <td className={styles.table_data}>
                  <span
                    className={styles.icons}
                    onClick={() => deletePopupOpenHandler(index, data)}
                  >
                    <DeleteIcon />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PageNumberContainer />
      </div>
      {openUpdatePopup && (
        <UpdateUser
        open={true}
        handleClose={handleCloseUpdatePopup}
        prefilledInputData={prefilledInputData}
        userId={updateUserId}
        roles={roles}
        />
      )}
      {openDeletePopup && (
        <DeleteUser
        open={true}
        handleClose={handleCloseDeletePopup}
        deleteUserId={deleteUserId}
      />
      )}

      {openCreatePopup && (
        <CreateUsers 
          open={true}
          handleClose={handleCloseCreatePopup}
          roles={roles}
        />
      )}
    </div>
  );
}

export default ManageUsers;
