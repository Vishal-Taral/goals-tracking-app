import styles from './ManageRoles.module.scss';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Update from '../update/update';
import DeleteComponent from '../delete/delete';
import AddRole from '../AddRole/AddRole';
import {
  useDeleteRoles,
  useGetRoles,
  useUpdateRoles,
} from '@goal-tracker/data-access';
import { table } from 'console';

/* eslint-disable-next-line */

const options = ['story', 'upskill', 'task completing ', 'achievable'];

export interface ManageRoles {
  tableData: any;
}

export function ManageRoles({ tableData }: ManageRoles) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [updateChecked, setUpdateCheked] = useState('');
  const handleOpen = () => setOpenUpdate(true);
  const handleClose = (data) => {
    setOpenUpdate(false);
    console.log('data', data);
    if (data == 'cancel') {
      setUpdateCheked(false);
    } else if (data == 'update') {
      setUpdateCheked(true);
    } else {
      setUpdateCheked(false);
    }
  };

  const [deleteChecked, setDeleteChecked] = useState('');
  const handleCloseDelete = (data) => {
    setOpenDelete(false);
    console.log('data', data);
    if (data == 'cancel') {
      setDeleteChecked(false);
    } else if (data == 'delete') {
      setDeleteChecked(true);
    } else {
      setDeleteChecked(false);
    }
  };
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const [updateIndex, setUpdateIndex] = useState(null);
  const [updateRoleId, setUpdateRoleId] = useState(null);
  const updatePopupOpenHandler = (index: number, data: any) => {
    setSelectedRowIndex(index);
    setOpenUpdate(true);
    setUpdateIndex(index);
    console.log('index data', data);
    setUpdateRoleId(data.id);
  };

  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteRoleId, setDeleteRoleId] = useState(null);
  const deletePopupOpenHandler = (index: number, data: any) => {
    setSelectedRowIndex(index);
    setOpenDelete(true);
    setDeleteIndex(index);
    setDeleteRoleId(data.id);
  };

  useEffect(() => {
    console.log('updateChecked', updateChecked, 'updateIndex', updateIndex);
    if (updateChecked == true && updateIndex >= 0) {
      // const api = xx.mutateAsync()
      const apixxx = xxx.mutateAsync();
    }
  }, [updateChecked, updateIndex]);

  const [updateDataObj, setUpdateDataObj] = useState();
  const updatePopupDataCallback = (data) => {
    console.log('dataxxx', data);
    setUpdateDataObj({ ...data, id: updateRoleId });
  };

  const xx = useDeleteRoles(deleteRoleId);
  const xxx = useUpdateRoles(updateDataObj);

  const { data: rolesList } = useGetRoles();

  useEffect(() => {
    if (deleteChecked == true && deleteIndex >= 0) {
      const api = xx.mutateAsync();
      // const apixxx = xxx.mutateAsync();
      console.log('tableData', tableData);
    }
  }, [deleteChecked, deleteIndex]);
  console.log('rolesList outside', rolesList);

  const [openAdd, setOpenAdd] = useState(false);
  
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

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
              <tr key={index} className={styles.table_row}>
                <td className={styles.table_data} key={index}>
                  {data.id}
                </td>
                <td className={styles.table_data} key={index}>
                  {data.name}
                </td>
                <td className={styles.table_data} key={index}>
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
      {openUpdate && selectedRowIndex !== null && (
        <Update
          open={handleOpen}
          handleClose={handleClose}
          updatePopupDataCallback={updatePopupDataCallback}
        />
      )}

      {openCreatePopup && (
        <AddRole
          open={true}
          handleClose={handleCloseCreatePopup}
        />
      )}

      <DeleteComponent open={openDelete} handleClose={handleCloseDelete} />

    </div>
  );
}

export default ManageRoles;
