import styles from './ManageCategories.module.scss';
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
import { useGetCategories } from '@goal-tracker/data-access';

/* eslint-disable-next-line */

const options = ['story', 'upskill', 'task completing ', 'achievable'];

export interface ManageCategories {
  tableData : any;
}

export function ManageCategories({ tableData } : ManageCategories) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpen = () => setOpenUpdate(true);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleClose = () => setOpenUpdate(false);
  const handleCloseDelete = () => setOpenDelete(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<string | null>(null);

  
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const handleCloseCreatePopup = () => setOpenCreatePopup(false)
  const handleOpenCreatePopup = () => setOpenCreatePopup(true);

  console.log("id" , selectedRowIndex);

  const handleOpenUpdate = (index: string) => {
    setSelectedRowIndex(index);
    setOpenUpdate(true);
  };

  const handleOpenDelate = (index: string) => {
    setSelectedRowIndex(index);
    setOpenDelete(true);
  };

  const handleCreateCategory = () => {
    // setSelectedRowIndex(index);
    setOpenCreatePopup(true);
  };

  const { data: categoriesList, isError } = useGetCategories();

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
            {categoriesList?.data?.map((data: any, index: number) => (
              <tr key={index} className={styles.table_row}>
                {/* {Object.entries(data).map((val, index) => (
                  <td className={styles.table_data} key={index}>{val[1]}</td>
                ))} */}
                <td className={styles.table_data}>{data.categoryId}</td>

                <td className={styles.table_data}>{data?.name}</td>
                
                <td className={styles.table_data}>
                  <span
                    className={styles.icons}
                    onClick={() => handleOpenUpdate(data.categoryId)}
                  >
                    <EditIcon />
                  </span>
                </td>
                <td className={styles.table_data}>
                  <span
                    className={styles.icons}
                    onClick={() => handleOpenDelate(data.categoryId)}
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
          categoriesList={categoriesList}
        />
      )}

      {openDelete && selectedRowIndex !== null && (
        <DeleteCategory
          open={true}
          handleClose={handleCloseDelete}
          categoryId={selectedRowIndex}
          categories={categoriesList}
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

export default ManageCategories;
