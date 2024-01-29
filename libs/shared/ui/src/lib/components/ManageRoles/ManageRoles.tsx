/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './ManageRoles.module.scss';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import AddRole from '../AddRole/AddRole';
import { useGetRoleByID, useGetRoles } from '@goal-tracker/data-access';
import UpdateRole from '../UpdateRole/UpdateRole';
import DeleteRole from '../DeleteRole/DeleteRole';
import PageNumberContainer from '../PageNumberContainer/PageNumberContainer';
import AppContext from '../../contexts/AppContext';

/* eslint-disable-next-line */

export interface ManageRoles {
  tableData: any;
}

export function ManageRoles({ tableData }: ManageRoles) {
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const context = useContext(AppContext);

  const payLoadObj = {
     page : context.pageNumber,
     pageSize: entriesPerPage,
     roleName: context.roleNameSearch || null,
     roleDescription: context.descriptionSearch || null,
     sortBy: context.sortByRole,
     sortOrder: context.sortOrder,
  }
  const { data: rolesList, refetch } = useGetRoles(payLoadObj);
  const entriesPerPageChangeHandler = (e) => {
    setEntriesPerPage(e.target.value);
  };
  const entriesPerPageClickHandler = () => {
    refetch();
  };
  useEffect(() => {
    refetch();
    // console.log('manage role component','context.sortBy',context.sortBy)

  }, [context.pageNumber, context.sortBy, context.sortOrder, context.sortByRole , context.roleNameSearch, context.descriptionSearch ]);

  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [updateRoleId, setUpdateRoleId] = useState(null);
  const [prefilledInputData, setPrefilledInputData] = useState();
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [deleteRoleId, setDeleteRoleId] = useState<any>(null);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const handleOpenCreatePopup = () => setOpenCreatePopup(true);
  const [searchID, setSearchID] = useState('');
  const [searchResultDisplay, setSearchResultDisplay] = useState(false);

  const updatePopupOpenHandler = (index: number, data: any) => {
    setOpenUpdatePopup(true);
    setUpdateRoleId(data.roleId);
    setPrefilledInputData(data);
  };
  const handleCloseUpdatePopup = () => {
    setOpenUpdatePopup(false);
    refetch();
  };

  const deletePopupOpenHandler = (index: number, data: any) => {
    setOpenDeletePopup(true);
    setDeleteRoleId(data.roleId);
  };

  const handleCloseDeletePopup = () => {
    setOpenDeletePopup(false);
    refetch();
  };

  const handleCloseCreatePopup = () => {
    setOpenCreatePopup(false);
    refetch();
  };

  const { data: searchResponse, refetch: refetchSearch } =
    useGetRoleByID(searchID);

  const searchInputChangeHandler = (e: any) => {
    setSearchID(e.target.value);
  };

  const searchHandler = () => {
    console.log('searchID', searchID);
    refetchSearch();
    console.log('searchResponse', searchResponse);
    setSearchResultDisplay(true);
  };

  const cancelUpdateOperation = () => {
    setOpenUpdatePopup(false);
  };

  const cancelCreateOperation = () => {
    setOpenCreatePopup(false);
  };

  const cancelDeleteOperation = () => {
    setOpenDeletePopup(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.categories}>
        <Button variant="outlined" onClick={handleOpenCreatePopup}>
          Add Role
        </Button>
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
      <div className={styles.entriesPerPageBlock}>
        <div className={styles.entriesPerPage}>Entries per page-</div>
        <input
          className={styles.entriesPerPageInput}
          onChange={entriesPerPageChangeHandler}
          value={entriesPerPage}
          type="number"
          min={1}
          max={10}
        />
        <button
          onClick={entriesPerPageClickHandler}
          className={styles.entriesButton}
        >
          Click
        </button>
      </div>
      {searchResultDisplay ? (
        <div className={styles.searchResultBlock}>
          <b>Search Result</b>
          <div>ID- {searchResponse?.data?.roleId}</div>
          <div>Name- {searchResponse?.data?.name}</div>
          <div>Description- {searchResponse?.data?.description}</div>
          <button
            className={styles.searchResultCloseButton}
            onClick={() => setSearchResultDisplay(false)}
          >
            Close
          </button>
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
            {rolesList?.data?.map((data: any, index: number) => (
              <tr className={styles.table_row} key={index}>
                <td className={styles.table_data}>{data.roleId}</td>
                <td className={styles.table_data}>{data.name}</td>
                <td className={styles.table_data}>{data.description}</td>
                <td className={styles.table_data_icon}>
                  <span
                    className={styles.icons}
                    onClick={() => updatePopupOpenHandler(index, data)}
                  >
                    <EditIcon />
                  </span>
                </td>
                <td className={styles.table_data_icon}>
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
        <PageNumberContainer totalPages={rolesList?.totalPages} />
      </div>

      {openUpdatePopup && (
        <UpdateRole
          open={true}
          handleClose={handleCloseUpdatePopup}
          updateRoleId={updateRoleId}
          prefilledInputData={prefilledInputData}
          rolesList={rolesList}
          cancelUpdateOperation={cancelUpdateOperation}
        />
      )}

      {openCreatePopup && (
        <AddRole
          open={true}
          handleClose={handleCloseCreatePopup}
          rolesList={rolesList}
          cancelCreateOperation={cancelCreateOperation}
        />
      )}

      {openDeletePopup && (
        <DeleteRole
          open={true}
          handleClose={handleCloseDeletePopup}
          deleteRoleId={deleteRoleId}
          rolesList={rolesList}
          cancelDeleteOperation={cancelDeleteOperation}
        />
      )}
    </div>
  );
}

export default ManageRoles;
