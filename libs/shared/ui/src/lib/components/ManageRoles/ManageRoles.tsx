import styles from './ManageRoles.module.scss';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useState } from 'react';
import AddRole from '../AddRole/AddRole';
import { useGetRoles } from '@goal-tracker/data-access';
import UpdateRole from '../UpdateRole/UpdateRole';
import DeleteRole from '../DeleteRole/DeleteRole';

/* eslint-disable-next-line */

const options = ['story', 'upskill', 'task completing ', 'achievable'];

export interface ManageRoles {
  tableData: any;
}

export function ManageRoles({ tableData }: ManageRoles) {
  const { data: rolesList } = useGetRoles();

  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [updateRoleId, setUpdateRoleId] = useState(null);
  const [prefilledInputData , setPrefilledInputData] = useState();
  const updatePopupOpenHandler = (index: number, data: any) => {
    setOpenUpdatePopup(true);
    setUpdateRoleId(data.id);
    setPrefilledInputData(data);
  };
  const handleCloseUpdatePopup = () => setOpenUpdatePopup(false);

  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [deleteRoleId, setDeleteRoleId] = useState(null);
  const deletePopupOpenHandler = (index: number, data: any) => {
    setOpenDeletePopup(true);
    setDeleteRoleId(data.id);
  };
  const handleCloseDeletePopup = () => setOpenDeletePopup(false);

  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const handleOpenCreatePopup = () => setOpenCreatePopup(true);
  const handleCloseCreatePopup = () => setOpenCreatePopup(false);

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

        <Button variant="outlined" onClick={handleOpenCreatePopup}>
          Add Role
        </Button>
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
            {rolesList?.map((data: any, index: number) => (
              <tr className={styles.table_row} key={index}>
                <td className={styles.table_data}>
                  {data.id}
                </td>
                <td className={styles.table_data}>
                  {data.name}
                </td>
                <td className={styles.table_data}>
                  {data.description}
                </td>
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
        <UpdateRole
          open={true}
          handleClose={handleCloseUpdatePopup}
          updateRoleId={updateRoleId}
          prefilledInputData={prefilledInputData}
        />
      )}

      {openCreatePopup && (
        <AddRole open={true} handleClose={handleCloseCreatePopup} />
      )}

      {openDeletePopup && (
        <DeleteRole
          open={true}
          handleClose={handleCloseDeletePopup}
          deleteRoleId={deleteRoleId}
        />
      )}
    </div>
  );
}

export default ManageRoles;
