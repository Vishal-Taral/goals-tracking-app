import styles from './ManageRoles.module.scss';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Update from '../update/update';
import DeleteComponent from '../delete/delete';
import { useDeleteRoles } from '@goal-tracker/data-access';

/* eslint-disable-next-line */

const options = ['story', 'upskill', 'task completing ', 'achievable'];

export interface ManageRoles {
  tableData: any;
}

export function ManageRoles({ tableData }: ManageRoles) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpen = () => setOpenUpdate(true);
  const handleClose = () => {
    setOpenUpdate(false);
  };

  const [deleteChecked, setDeleteChecked] = useState('')
  const handleCloseDelete = (data) => {
    setOpenDelete(false);
    console.log('data', data)
    if(data == 'cancel'){
      setDeleteChecked(false)
    }else if(data == 'delete'){
      setDeleteChecked(true)
    }else {
      setDeleteChecked(false)
    }
  };
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const handleOpenUpdate = (index: number) => {
    setSelectedRowIndex(index);
    setOpenUpdate(true);
  };

  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteRoleId, setDeleteRoleId] = useState(null)
  const deletePopupOpenHandler = (index: number, data: any) => {
    setSelectedRowIndex(index);
    setOpenDelete(true);
    setDeleteIndex(index)
    setDeleteRoleId(data.id)
  };

  console.log('deleteRoleId', deleteRoleId)

  const xx = useDeleteRoles(deleteRoleId)

  useEffect(()=>{
    if(deleteChecked == true && deleteIndex>=0){
      console.log('xxx')
      const api = xx.mutateAsync()
      console.log(api)
    }
  },[deleteChecked, deleteIndex])

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
                backgroundColor: 'white',
                width: 150,
              }}
              InputLabelProps={{
                shrink: true,
                backgroundColor: 'white',
              }}
            />
          )}
        />

        <Button variant="outlined">Add Role</Button>
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
            {tableData?.rows?.map((data: any, index: number) => (
              <tr key={index} className={styles.table_row}>
                {Object.entries(data).map((val, index) => (
                  <td className={styles.table_data} key={index}>
                    {val[1]}
                  </td>
                ))}
                <td className={styles.table_data}>
                  <span
                    className={styles.icons}
                    onClick={() => handleOpenUpdate(index)}
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
        <Update open={handleOpen} handleClose={handleClose} />
      )}

      <DeleteComponent open={openDelete} handleClose={handleCloseDelete} />
    </div>
  );
}

export default ManageRoles;
