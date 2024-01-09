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
import { useGetUsers } from '@goal-tracker/data-access';
import UpdateUser from '../UpdateUser/UpdateUser';

/* eslint-disable-next-line */

const options = ['story', 'upskill', 'task completing ', 'achievable'];

export interface ManageCategories {
  tableData : any;
}

export function ManageUsers({ tableData } : ManageCategories) {
  const { data: usersList , refetch } = useGetUsers();
  console.log("usersList" , usersList);
  
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const handleCloseCreatePopup = () => {
    refetch();
    setOpenCreatePopup(false)
  }

  const handleCreateCategory = () => {
    // setSelectedRowIndex(index);
    setOpenCreatePopup(true);
  };
  const handleCloseDeletePopup = () => {
    setOpenDeletePopup(false);
    refetch();
  };
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  const [deleteUserId, setDeleteUserId] = useState(null);
  const deletePopupOpenHandler = (index: number, data: any) => {
    console.log('data delete', data)
    setOpenDeletePopup(true);
    setDeleteUserId(data?.userId);
    console.log('data.id',data)
  };
  const [updateRoleId, setUpdateRoleId] = useState(null);
  const [prefilledInputData, setPrefilledInputData] = useState();
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);

  const handleCloseUpdatePopup = () => {
    refetch();
    setOpenUpdatePopup(false);
  }
  const updatePopupOpenHandler = (index: number, data: any) => {
    setOpenUpdatePopup(true);
    setUpdateRoleId(data?.userId);
    console.log("data?.userId",data?.userId)
    setPrefilledInputData(data);
  };
  return (
    <div className={styles.container}>
      <div className={styles.categories}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={options}
          sx={{
            width: 150,
            '& .MuiOutlinedInput-root': {
              padding: 0,
            },
          }}
          renderInput={(params: any) => (
            <TextField
              {...params}
              id="filled-number"
              label="categories"
              sx={{
                backgroundcolor: 'white',
                width: 150,
              }}
              InputLabelProps={{
                shrink: true,
                backgroundcolor: 'white',
              }}
            />
          )}
        />

        <Button variant="outlined" onClick={() => handleCreateCategory()}>Add User</Button>
      </div>

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
            {tableData?.rows?.data?.map((data: any, index: number) => (
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
      </div>
      {openUpdatePopup && (
        <UpdateUser
        open={true}
        handleClose={handleCloseUpdatePopup}
        prefilledInputData={prefilledInputData}
        userId={updateRoleId}
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
        />
      )}
    </div>
  );
}

export default ManageUsers;
