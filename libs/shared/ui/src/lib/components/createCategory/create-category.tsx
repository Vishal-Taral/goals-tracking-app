import React from 'react';
import styles from './create-category.module.scss';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { usePostAddCategory } from '@goal-tracker/data-access';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
  categoryName: string;
}

export interface CreateCategoryProps {
  open: boolean;
  handleClose: () => void;
  categoriesList: any;
  cancelCrateOperation: () => void;
}

export function CreateCategory({ open, handleClose, categoriesList, cancelCrateOperation }: CreateCategoryProps) {
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>();
  const createCategory = usePostAddCategory({ success: handleClose });

  const handleCreateCategory: SubmitHandler<FormData> = async (data) => {
    createCategory.mutate(data.categoryName);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={cancelCrateOperation}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.create_category_modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className={styles.heading}>Create Category</div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit(handleCreateCategory)}>
              <div className={styles.label_and_inputs}>
                <div className={styles.field_name}>
                  <label htmlFor="categoryName">Category Name*</label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter The Name"
                    className={styles.input_fields}
                    {...register('categoryName', {
                      required: 'Category Name is required',
                      validate: value => {
                        const lowerCaseValue = value.toLowerCase();
                        return (
                          !categoriesList?.data?.some((category: any) => category.name.toLowerCase() === lowerCaseValue) ||
                          'Category already exists'
                        );
                      },
                    })}
                  />
                  {errors.categoryName && <p className={styles.error}>{errors.categoryName.message}</p>}
                </div>
              </div>

              <div className={styles.update_btn}>
                <Button
                  variant="contained"
                  onClick={cancelCrateOperation}
                  className={styles.cancel_button}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button variant="contained" className={styles.create_button} type="submit" disabled={isSubmitting}>
                  Create
                </Button>
              </div>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateCategory;
