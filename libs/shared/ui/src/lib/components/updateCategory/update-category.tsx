import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
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
  cancelUpdateOperation: () => void;
}

interface FormInput {
  categoryName: string;
}

export function UpdateCategory({
  open,
  handleClose,
  selctedId,
  categoriesList,
  cancelUpdateOperation,
}: UpdateCategoryProps) {
  const [categoryName, setCategoryName] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormInput>();

  const updateCategory = usePutUpdateCategory({
    categoryId: selctedId,
    categoryName: categoryName,
    success: handleClose,
  });

  useEffect(() => {
    const selectedCategory = categoriesList?.data?.find(
      (category: any) => category.categoryId === selctedId
    );

    if (selectedCategory) {
      setCategoryName(selectedCategory.name);
      setValue('categoryName', selectedCategory.name);
    }
  }, [categoriesList, selctedId, setValue]);

  const handleUpdate: SubmitHandler<FormInput> = (data) => {
    try {
      updateCategory.mutate();
      console.log('Category updated successfully');
      reset();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCategoryName(e.target.value);
  //   trigger('categoryName'); // Trigger validation when input value changes
  // };

  return (
    <div>
      <Modal
        open={open}
        onClose={cancelUpdateOperation}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.update_category_modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className={styles.heading}>Update Category</div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit(handleUpdate)}>
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
                      {...register('categoryName', {
                        required: 'Category is required',
                        validate: (value) => {
                          const lowerCaseValue = value.toLowerCase();
                          return (
                            !categoriesList?.data?.some(
                              (category: any) =>
                                category.name.toLowerCase() === lowerCaseValue
                            ) || 'Category already exists'
                          );
                        },
                      })}
                      value={categoryName}
                      onChange={(e) => {
                        setCategoryName(e.target.value);
                      }}
                    />
                    {errors.categoryName && (
                      <p className={styles.error} style={{ color: 'red' }}>
                        {errors.categoryName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className={styles.update_btn}>
                  <Button
                    variant="contained"
                    onClick={cancelUpdateOperation}
                    className={styles.cancel_button}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" type="submit">
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
