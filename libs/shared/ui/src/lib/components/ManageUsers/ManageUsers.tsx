import styles from './ManageUsers.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import CreateUsers from '../CreateUsers/CreateUsers';
import DeleteUser from '../DeleteUser/DeleteUser';
import { useGetRoles, useGetUserByID, useGetUsers } from '@goal-tracker/data-access';
import UpdateUser from '../UpdateUser/UpdateUser';
import PageNumberContainer from '../PageNumberContainer/PageNumberContainer';
import AppContext from '../../contexts/AppContext';
import NorthIcon from '@mui/icons-material/North';

/* eslint-disable-next-line */
export interface ManageCategories {
  tableData: any;
}

export function ManageUsers({ tableData }: ManageCategories) {
  const [updateUserId, setUpdateUserId] = useState(null);
  const [prefilledInputData, setPrefilledInputData] = useState();
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [searchID, setSearchID] = useState('');
  const [searchResultDisplay, setSearchResultDisplay] = useState(false);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [firstNameSortOrderArrow, setFirstNameSortOrderArrow] = useState(false);
  const [lastNameSortOrderArrow, setLastNameSortOrderArrow] = useState(false);

  const toggleSortOrder = (sortByColumn: string) => {
    let sortOrder;
    switch (sortByColumn) {
      case 'firstName':
        sortOrder = !firstNameSortOrderArrow;
        setFirstNameSortOrderArrow(sortOrder);
        break;
      case 'lastName':
        sortOrder = !lastNameSortOrderArrow;
        setLastNameSortOrderArrow(sortOrder);
        break;
      default:
        sortOrder = false;
    }

    context?.setSortBy(sortByColumn);
    context?.setSortOrder(sortOrder ? 'asc' : 'desc');
  };

  const context = useContext(AppContext);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  const queryParamObject = {
    page: context?.pageNumber,
    pageSize: entriesPerPage,
    lastName: context?.lastNameSearch || null,
    firstName: context?.firstNameSearch || null,
    email: context?.emailSearch || null,
    sortBy: context?.sortBy,
    sortOrder: context?.sortOrder
  }

  const { data: usersList, refetch } = useGetUsers(queryParamObject);

  const payLoadObj = {
    page: context?.pageNumber,
    pageSize: entriesPerPage,
    roleName: context?.roleNameSearch || null,
    roleDescription: context?.descriptionSearch || null,
    sortBy: context?.sortByRole,
    sortOrder: context?.sortOrder,
  }

  const { data: roles } = useGetRoles(payLoadObj);
  const { data: searchResponse, refetch: refetchSearch } =
    useGetUserByID(searchID);

  useEffect(() => {
    refetch()
    console.log('manage user component', 'context?.sortBy', context?.sortBy)

  }, [context?.pageNumber, context?.sortBy, context?.sortOrder, context?.lastNameSearch, context?.firstNameSearch, context?.emailSearch])

  const handleCloseCreatePopup = () => {
    setOpenCreatePopup(false);
    refetch();
  };

  const handleCreateUser = () => {
    setOpenCreatePopup(true);
  };
  const handleCloseDeletePopup = () => {
    setOpenDeletePopup(false);
    refetch();
  };

  const deletePopupOpenHandler = (index: number, data: any) => {
    setOpenDeletePopup(true);
    setDeleteUserId(data?.userId);
  };

  const handleCloseUpdatePopup = () => {
    setOpenUpdatePopup(false);
    refetch();
  };
  const updatePopupOpenHandler = (index: number, data: any) => {
    setOpenUpdatePopup(true);
    setUpdateUserId(data?.userId);
    setPrefilledInputData(data);
  };

  const searchInputChangeHandler = (e: any) => {
    setSearchID(e.target.value);
  };

  const searchHandler = () => {
    refetchSearch();
    setSearchResultDisplay(true);
  };

  const entriesPerPageChangeHandler = (e: any) => {
    setEntriesPerPage(e.target.value);
  };
  const entriesPerPageClickHandler = () => {
    refetch();
  };

  const cancelUpdateOperation = () => {
    setOpenUpdatePopup(false);
  }

  const cancelCreateOperation = () => {
    setOpenCreatePopup(false);
  }

  const cancelDeleteOperation = () => {
    setOpenDeletePopup(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.users}>
        <Button variant="outlined" onClick={() => handleCreateUser()}>
          Add User
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
          <div>ID- {searchResponse?.data?.userId}</div>
          <div>First Name- {searchResponse?.data?.firstName}</div>
          <div>Last Name- {searchResponse?.data?.lastName}</div>
          <div>Gender- {searchResponse?.data?.gender}</div>
          <div>Email- {searchResponse?.data?.email}</div>
          <div>Role ID- {searchResponse?.data?.role.roleId}</div>
          <div>Role Name- {searchResponse?.data?.role.name}</div>
          <div>Role Description- {searchResponse?.data?.role.description}</div>

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
                  <div className={styles.heading_contains}>
                    <label>{data}</label>
                    {(index === 1 || index === 2) && (
                      <NorthIcon
                        className={`${styles.northIcon} ${index === 1 ? (firstNameSortOrderArrow ? styles.toggle_down  : styles.toggle_up)
                            : (lastNameSortOrderArrow ? styles.toggle_down : styles.toggle_up)
                          }`}
                        onClick={() => toggleSortOrder(index === 1 ? 'firstName' : 'lastName')}
                      />
                    )}
                  </div>
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
        <PageNumberContainer totalPages={usersList?.totalPages} />
      </div>
      {openUpdatePopup && (
        <UpdateUser
          open={true}
          handleClose={handleCloseUpdatePopup}
          prefilledInputData={prefilledInputData}
          userId={updateUserId}
          roles={roles}
          cancelUpdateOperation={cancelUpdateOperation}
          usersList={usersList}
        />
      )}
      {openDeletePopup && (
        <DeleteUser
          open={true}
          handleClose={handleCloseDeletePopup}
          deleteUserId={deleteUserId}
          cancelDeleteOperation={cancelDeleteOperation}
        />
      )}

      {openCreatePopup && (
        <CreateUsers
          open={true}
          handleClose={handleCloseCreatePopup}
          roles={roles}
          cancelCreateOperation={cancelCreateOperation}
          usersList={usersList}
        />
      )}
    </div>
  );
}

export default ManageUsers;
