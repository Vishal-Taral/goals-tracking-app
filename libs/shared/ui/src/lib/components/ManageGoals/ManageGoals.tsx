import styles from './ManageGoals.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useContext, useEffect, useState, useRef, lazy, Suspense } from 'react';
import AddRole from '../AddRole/AddRole';
import { useGetRoleByID, useGetRoles } from '@goal-tracker/data-access';
import UpdateRole from '../UpdateRole/UpdateRole';
import DeleteRole from '../DeleteRole/DeleteRole';
import PageNumberContainer from '../PageNumberContainer/PageNumberContainer';
import AppContext from '../../contexts/AppContext';
import NorthIcon from '@mui/icons-material/North';
import FilterListIcon from '@mui/icons-material/FilterList';
import Tooltip from '@mui/material/Tooltip';

/* eslint-disable-next-line */
export interface ManageGoalsProps {
  tableData: any
}

export function ManageGoals({tableData}:ManageGoalsProps) {
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const context = useContext(AppContext);

  const payLoadObj = {
     page : context?.pageNumber,
     pageSize: entriesPerPage,
     roleName: context?.roleNameSearch || null,
     roleDescription: context?.descriptionSearch || null,
     sortBy: context?.sortByRole,
     sortOrder: context?.sortOrder,
  }
  const { data: rolesList, refetch } = useGetRoles(payLoadObj);
  const entriesPerPageChangeHandler = (e:any) => {
    setEntriesPerPage(e.target.value);
  };
  const entriesPerPageClickHandler = () => {
    refetch();
  };
  useEffect(() => {
    refetch();
  }, [context?.pageNumber, context?.sortBy, context?.sortOrder, context?.sortByRole , context?.roleNameSearch, context?.descriptionSearch ]);

  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [updateRoleId, setUpdateRoleId] = useState(null);
  const [prefilledInputData, setPrefilledInputData] = useState();
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [deleteRoleId, setDeleteRoleId] = useState<any>(null);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const handleOpenCreatePopup = () => setOpenCreatePopup(true);
  const [searchID, setSearchID] = useState('');
  const [searchResultDisplay, setSearchResultDisplay] = useState(false);
  const [RoleNameSortOrderArrow, setRoleNameSortOrderArrow] = useState(false);
  const [descriptionSortOrderArrow, setDescriptionSortOrderArrow] = useState(false);
  const [searchRoleName, setSearchRoletName] = useState('');
  const [searchDescription, setSearchDescription] = useState('');
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleToggle = ( event : any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event : any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setAnchorEl(null);
    setOpen(false);
  };

  const inputDataForSearchField = [
    {
      value: 'role',
      label: 'Role Name',
      setSearch: setSearchRoletName,
    },
    {
      value: 'desc',
      label: 'Description',
      setSearch: setSearchDescription,
    },
  ];

  const handleSearch = () => {
    context?.setRoleNameSearch(searchRoleName);
    context?.setDescriptionSearch(searchDescription);
    handleClose('');
  };

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
    refetchSearch();
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

  const toggleSortOrder = (sortByColumn: string) => {
    let sortOrder;
    switch (sortByColumn) {
      case 'name':
        sortOrder = !RoleNameSortOrderArrow;
        setRoleNameSortOrderArrow(sortOrder);
        break;
      case 'description':
        sortOrder = !descriptionSortOrderArrow;
        setDescriptionSortOrderArrow(sortOrder);
        break;
      default:
        sortOrder = false;
    }

    context?.setSortByRole(sortByColumn);
    context?.setSortOrder(sortOrder ? 'asc' : 'desc');
    refetch();
  };

  const dateConvert = (dateString : any) => {
    const date = new Date(dateString);
    const convertedDate = date.toLocaleDateString();
    return convertedDate;
  }

  const Component = lazy(()=>import('@goal-tracker/ui').then((module)=> ({default: module.FilterContainer})))
  
  return (
    <div className={styles.container}>
      <div className={styles.categories}>
        <Button variant="outlined" onClick={handleOpenCreatePopup}>
          Add Goal
        </Button>
      </div>
      <div className={styles.searchBlock}>
        <input
          onChange={searchInputChangeHandler}
          className={styles.searchInput}
          placeholder="Search By ID"
        />
        <div className={styles.filter_icon} onClick={handleToggle}>
          <Tooltip title="Advance Search">
            <FilterListIcon className={styles.filterIcon} />
          </Tooltip>
        </div>
        <button className={styles.searchButton} onClick={searchHandler}>
          Search
        </button>
      </div>
      {open && (
        <div>
          <Suspense fallback={"Loading"}>
          <Component
            inputDataForSearchField={inputDataForSearchField}
            onSearch={handleSearch}
            open={open}
            handleClose={handleClose}
            anchorEl={anchorEl}
          />
          </Suspense>
        </div>
      )}
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
                  <div className={styles.heading_contains}>
                    <label>{data}</label>
                    {(index === 1 || index === 2) && (
                      <NorthIcon
                        className={`${styles.northIcon} ${index === 1 ? (RoleNameSortOrderArrow ? styles.toggle_up : styles.toggle_down)
                            : (descriptionSortOrderArrow ? styles.toggle_up : styles.toggle_down)
                          }`}
                        onClick={() => toggleSortOrder(index === 1 ? 'name' : 'description')}
                      />
                    )}
                  </div>
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
                <td className={styles.table_data}>In Progress</td>
                <td className={styles.table_data}>{dateConvert('02 02 2024')}</td>
                <td className={styles.table_data}>{dateConvert('05 03 2024')}</td>
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

export default ManageGoals;
