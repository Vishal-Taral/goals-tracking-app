import React, { useState , useEffect } from 'react';
import styles from './update-category.module.scss';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { usePutUpdateCategory } from '@goal-tracker/data-access';

export interface UpdateCategoryProps {
  open: boolean;
  handleClose: () => void;
  selctedId: string;
  categoriesList: any;
}

export function UpdateCategory({ open, handleClose, selctedId , categoriesList,}: UpdateCategoryProps) {

  const [categoryName, setCategoryName] = useState('');

  const payLoad = {
    categoryId: selctedId,
    categoryName: categoryName,
  };

  const updateCategory = usePutUpdateCategory({...payLoad, success: handleClose});

  useEffect(() => {
    const selectedCategory = categoriesList?.data?.find((category : any) => category.categoryId === selctedId);
    
    if (selectedCategory) {
      setCategoryName(selectedCategory.name);
    }
  }, [categoriesList, selctedId]);

  const ID = 1;

    const handleUpdate = (event : any) => {
      event.preventDefault();
      const isDuplicate = categoriesList?.data?.some((category : any) => category.name === categoryName && category.categoryId !== selctedId);

      if (isDuplicate) {
        alert('Category name already exists!');
        return;
      }
      try {
        updateCategory.mutate();
        console.log('Category updated successfully');
      } catch (error) {
        console.error('Error updating category:', error);
      }
    };

  

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.update_category_modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className={styles.heading}>Update Category</div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleUpdate}>
              <div>
                <div className={styles.label_and_inputs}>
                  <div className={styles.field_name}>
                    <label htmlFor="name">Category Name</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Enter The Name"
                      className={styles.input_fields}
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.update_btn}>
                  <Button
                    variant="contained"
                    onClick={handleClose}
                    className={styles.cancel_button}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained"  type="submit">
                    Update
                  </Button>
                </div>
              </div>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default UpdateCategory;
