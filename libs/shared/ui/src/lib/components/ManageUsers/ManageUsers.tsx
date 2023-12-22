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
import CreateCategory from '../createCategory/create-category';
import DeleteCategory from '../deleteCategory/delete-category';
import { useGetUsers } from '@goal-tracker/data-access';

/* eslint-disable-next-line */

const options = ['story', 'upskill', 'task completing ', 'achievable'];

export interface ManageCategories {
  tableData : any;
}

export function ManageUsers({ tableData } : ManageCategories) {

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

  const handleOpenDelate = (index: number) => {
    setSelectedRowIndex(index);
    setOpenDelete(true);
  };

  const handleCreateCategory = () => {
    // setSelectedRowIndex(index);
    setOpenCreatePopup(true);
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

        <Button variant="outlined" onClick={() => handleCreateCategory()}>Add Category</Button>
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
            {tableData.rows?.map((data: any, index: number) => (
              <tr key={index} className={styles.table_row}>
                <td className={styles.table_data}>{data.userId}</td>
                <td className={styles.table_data}>{data?.firstName}</td>
                <td className={styles.table_data}>{data?.lastName}</td>
                <td className={styles.table_data}>{data?.gender}</td>
                <td className={styles.table_data}>{data?.email}</td>
                <td className={styles.table_data}>{data?.mobile_number}</td>
                <td className={styles.table_data}>
                  <span
                    className={styles.icons}
                    onClick={() => handleOpenUpdate(data.userId)}
                  >
                    <EditIcon />
                  </span>
                </td>
                <td className={styles.table_data}>
                  <span
                    className={styles.icons}
                    onClick={() => handleOpenDelate(data.userId)}
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
        <UpdateCategory
          open={true}
          handleClose={handleClose} 
          selctedId={selectedRowIndex}
          categoriesList={tableData.rows}
        />
      )}

      {openDelete && selectedRowIndex !== null && (
        <DeleteCategory
          open={true}
          handleClose={handleCloseDelete}
          categoryId={selectedRowIndex}
          categories={tableData.rows}
        />
      )}

      {openCreatePopup && (
        <CreateCategory 
          open={true}
          handleClose={handleCloseCreatePopup}
        />
      )}
    </div>
  );
}

export default ManageUsers;
