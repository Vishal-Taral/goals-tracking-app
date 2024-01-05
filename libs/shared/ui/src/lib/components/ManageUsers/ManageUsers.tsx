import styles from './ManageUsers.module.scss';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useState } from 'react';
// import Update from '../update/update';
import UpdateCategory from '../updateCategory/update-category';
import DeleteComponent from '../delete/delete';
import CreateUsers from '../CreateUsers/CreateUsers';
import DeleteCategory from '../deleteCategory/delete-category';
import DeleteUser from '../DeleteUser/DeleteUser';
import { useGetAllUsers } from '@goal-tracker/data-access';
import UpdateUser from '../UpdateUser/UpdateUser';

/* eslint-disable-next-line */

const options = ['story', 'upskill', 'task completing ', 'achievable'];

export interface ManageCategories {
  tableData : any;
}

export function ManageUsers({ tableData } : ManageCategories) {
  const { data: rolesList } = useGetAllUsers();
  console.log("tableData" , tableData.rows);
  
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpen = () => setOpenUpdate(true);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleClose = () => setOpenUpdate(false);
  const handleCloseDelete = () => setOpenDelete(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const handleCloseCreatePopup = () => setOpenCreatePopup(false)
  const handleOpenCreatePopup = () => setOpenCreatePopup(true);

  console.log("id" , selectedRowIndex);

  const handleOpenUpdate = (index: number) => {
    setSelectedRowIndex(index);
    setOpenUpdate(true);
  };

  // const handleOpenDelate = (index: number) => {
  //   setSelectedRowIndex(index);
  //   setOpenDelete(true);
  // };

  const handleCreateCategory = () => {
    // setSelectedRowIndex(index);
    setOpenCreatePopup(true);
  };
  const handleCloseDeletePopup = () => setOpenDeletePopup(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  const [deleteUserId, setDeleteUserId] = useState(null);
  const deletePopupOpenHandler = (index: number, data: any) => {
    console.log('data delete', data)
    setOpenDeletePopup(true);
    setDeleteUserId(data.userId);
  };
  const [updateRoleId, setUpdateRoleId] = useState(null);
  const [prefilledInputData, setPrefilledInputData] = useState();
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);

  const handleCloseUpdatePopup = () => setOpenUpdatePopup(false);
  const updatePopupOpenHandler = (index: number, data: any) => {
    setOpenUpdatePopup(true);
    setUpdateRoleId(data.id);
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
        updateRoleId={updateRoleId}
        prefilledInputData={prefilledInputData}
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
