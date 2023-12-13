import styles from './user-detail-section.module.scss';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Update from '../update/update';
import DeleteComponent from '../delete/delete';

/* eslint-disable-next-line */

const options = ['story', 'upskill', 'task completing ', 'achievable'];

export interface UserDetailSectionProps {}

export function UserDetailSection({ tableData }) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpen = () => setOpenUpdate(true);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleClose = () => setOpenUpdate(false);
  const handleCloseDelete = () => setOpenDelete(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const handleOpenUpdate = (index: number) => {
    setSelectedRowIndex(index);
    setOpenUpdate(true);
  };

  const handleOpenDelate = (index: number) => {
    setSelectedRowIndex(index);
    setOpenDelete(true);
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

        <Button variant="outlined">Add User</Button>
      </div>

      <div className={styles.user_detail_container}>
        <table className={styles.table}>
          <thead className={styles.table_headings_section}>
            <tr>
              {tableData?.headings.map((data: any, index: number) => (
                <th className={styles.headings} key={index}>
                  {data}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((data: any, index: number) => (
              <tr key={index} className={styles.table_row}>
                {Object.entries(data).map((val, index) => (
                  <td className={styles.table_data}>{val[1]}</td>
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
                    onClick={() => handleOpenDelate(index)}
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
          // data={tableData.rows[selectedRowIndex]}
          open={handleOpen}
          handleClose={handleClose}
        />
      )}

      {openDelete && selectedRowIndex !== null && (
        <DeleteComponent
          // data={tableData.rows[selectedRowIndex]}
          open={handleOpenDelete}
          handleClose={handleCloseDelete}
        />
      )}
    </div>
  );
}

export default UserDetailSection;
