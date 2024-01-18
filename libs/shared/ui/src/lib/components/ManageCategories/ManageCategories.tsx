import styles from './ManageCategories.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useState } from 'react';
import {
  UpdateCategory,
  DeleteCategory,
  CreateCategory,
  PageNumberContainer,
} from '@goal-tracker/ui';
import {
  useGetCategories,
  useGetCategoryByID,
} from '@goal-tracker/data-access';

/* eslint-disable-next-line */

export interface ManageCategories {
  tableData: any;
}

export function ManageCategories({ tableData }: ManageCategories) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<string | null>(null);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [searchID, setSearchID] = useState('');
  const [searchResultDisplay, setSearchResultDisplay] = useState(false)

  const { data: categoriesList, refetch } = useGetCategories();
  const { data: searchResponse, refetch: refetchSearch } = useGetCategoryByID(searchID);

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
  }

  const cancelUpdateOperation = () => {
    setOpenUpdate(false);
  }

  const cancelDeleteOperation = () => {
    setOpenDelete(false);
  }
  
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
    setSearchResultDisplay(true)

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
      {searchResultDisplay ? (
        <div className={styles.searchResultBlock}>
          <b>Search Result</b>
          <div>ID- {searchResponse?.data?.categoryId}</div>
          <div>Name- {searchResponse?.data?.name}</div>
          <button className={styles.searchResultCloseButton} onClick={() => setSearchResultDisplay(false)}>Close</button>
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
        <PageNumberContainer />
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
        <CreateCategory open={true} handleClose={handleCloseCreatePopup} categoriesList={categoriesList} cancelCrateOperation={cancelCrateOperation}/>
      )}
    </div>
  );
}

export default ManageCategories;
