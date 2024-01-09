import React from 'react';
import styles from './delete-category.module.scss';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import Button from '@mui/material/Button';
import { useDeleteCategory } from '@goal-tracker/data-access';

export interface DeleteProps {
  open: boolean;
  handleClose: (action: any) => void;
  categoryId: string;
  categories: any;
}

export function DeleteCategory({ open, handleClose, categoryId, categories }: DeleteProps) {
  const deleteCategory = useDeleteCategory({success : handleClose});

  const category = categories?.data?.find((category : any) => category.id === categoryId);
  const categoryName = category ? category.name : '';

  const handleDelete = () => {
    deleteCategory.mutate(categoryId);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleClose('cancel')}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.delete_category_modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className={styles.delete_icon}>
              <span className={styles.icon}>
                <DeleteIcon />
              </span>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className={styles.delete_confirmation_container}>
              <div className={styles.heading}>
                <h1>Delete Category ?</h1>
              </div>
              <div className={styles.warning}>
                <span className={styles.warning_icon}>
                  <WarningIcon />
                </span>
                <span>{`You'll permanently lose this " ${categoryName} " named category`}</span>
              </div>
            </div>

            <div className={styles.delete_btn}>
              <Button
                variant="contained"
                onClick={() => handleClose('cancel')}
                className={styles.cancel_button}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleDelete}
                className={styles.delete}
              >
                Delete
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteCategory;
