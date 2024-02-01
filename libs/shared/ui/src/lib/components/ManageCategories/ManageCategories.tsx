import styles from './ManageCategories.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useState, useContext, useEffect } from 'react';
import { UpdateCategory, DeleteCategory, CreateCategory, PageNumberContainer } from '@goal-tracker/ui';
import { useGetCategories, useGetCategoryByID } from '@goal-tracker/data-access';
import AppContext from '../../contexts/AppContext';
import NorthIcon from '@mui/icons-material/North';

/* eslint-disable-next-line */

export interface ManageCategoriesProps {
  tableData: any;
}

export function ManageCategories({ tableData }: ManageCategoriesProps) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<string | null>(null);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [searchID, setSearchID] = useState('');
  const [searchResultDisplay, setSearchResultDisplay] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const context = useContext(AppContext);

  const queryParamObj = {
    pageSize: entriesPerPage,
    page: context?.pageNumber,
    categoryName: context?.categorySearch || null,
    sortOrder: context?.sortOrder,
    sortBy: 'name',
  };

  const { data: categoriesList, refetch } = useGetCategories(queryParamObj);
  const { data: searchResponse, refetch: refetchSearch } =
    useGetCategoryByID(searchID);

  useEffect(() => {
    refetch();
  }, [context?.sortOrder, context?.pageNumber, context?.categorySearch]);

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    refetch();
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
    refetch();
  };

  const cancelCrateOperation = () => {
    setOpenCreatePopup(false);
  };

  const cancelUpdateOperation = () => {
    setOpenUpdate(false);
  };

  const cancelDeleteOperation = () => {
    setOpenDelete(false);
  };

  const handleCloseCreatePopup = () => {
    setOpenCreatePopup(false);
    refetch();
  };

  const handleOpenUpdate = (index: string) => {
    setSelectedRowIndex(index);
    setOpenUpdate(true);
  };

  const handleOpenDelate = (index: string) => {
    setSelectedRowIndex(index);
    setOpenDelete(true);
  };

  const handleCreateCategory = () => {
    setOpenCreatePopup(true);
  };

  const searchInputChangeHandler = (e: any) => {
    setSearchID(e.target.value);
  };

  const searchHandler = () => {
    console.log('searchID', searchID);
    refetchSearch();
    console.log('searchResponse', searchResponse);
    setSearchResultDisplay(true);
  };

  const entriesPerPageClickHandler = () => {
    refetch();
  };

  const entriesPerPageChangeHandler = (e) => {
    setEntriesPerPage(e.target.value);
  };

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    context?.setSortOrder(newSortOrder);
    setSortOrder(newSortOrder);
    refetch({
      ...queryParamObj,
      sortOrder: newSortOrder,
    });
  };


  return (
    <div className={styles.container}>
      <div className={styles.categories}>
        <Button variant="outlined" onClick={() => handleCreateCategory()}>
          Add Category
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
          <div>ID- {searchResponse?.data?.categoryId}</div>
          <div>Name- {searchResponse?.data?.name}</div>
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
                {(index === 1 ) && (
                  <NorthIcon
                    className={`${styles.northIcon} ${
                      index === 1
                        ? sortOrder === 'asc'
                          ? styles.toggle_up
                          : styles.toggle_down
                        : ''
                    }`}
                    onClick={toggleSortOrder}
                  />
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
          <tbody>
            {categoriesList?.data?.map((data: any, index: number) => (
              <tr key={index} className={styles.table_row}>
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
        <PageNumberContainer totalPages={categoriesList?.totalPages} />
      </div>
      {openUpdate && selectedRowIndex !== null && (
        <UpdateCategory
          open={true}
          handleClose={handleCloseUpdate}
          selctedId={selectedRowIndex}
          categoriesList={categoriesList}
          cancelUpdateOperation={cancelUpdateOperation}
        />
      )}

      {openDelete && selectedRowIndex !== null && (
        <DeleteCategory
          open={true}
          handleClose={handleCloseDelete}
          categoryId={selectedRowIndex}
          categories={categoriesList}
          cancelDeleteOperation={cancelDeleteOperation}
        />
      )}

      {openCreatePopup && (
        <CreateCategory
          open={true}
          handleClose={handleCloseCreatePopup}
          categoriesList={categoriesList}
          cancelCrateOperation={cancelCrateOperation}
        />
      )}
    </div>
  );
}

export default ManageCategories;
