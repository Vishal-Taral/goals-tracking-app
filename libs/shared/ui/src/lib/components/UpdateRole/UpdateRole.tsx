import styles from './UpdateRole.module.scss';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { usePutUpdateRole } from '@goal-tracker/data-access';
import { useForm } from 'react-hook-form';

export interface UpdateRoleProps {
  open: boolean;
  handleClose: (event: string) => void;
  updateRoleId: string | null;
  prefilledInputData: any;
  rolesList: any;
  cancelUpdateOperation: (event : string) => void; 
}

export function UpdateRole({open,handleClose,updateRoleId,prefilledInputData,rolesList, cancelUpdateOperation}: UpdateRoleProps) {
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();

  const [updatePopupData, setUpdatePopupData] = useState({
    name: prefilledInputData?.name,
    description: prefilledInputData?.description,
  });

  const updateRole = usePutUpdateRole({
    id: updateRoleId,
    name: getValues("roleName"),
    description: getValues("description"),
    success: handleClose,
  });

  const changeHandler = (e: any, heading: string) => {
    const updatedData = { ...updatePopupData, [heading]: e.target.value };
    setUpdatePopupData(updatedData);
  };

  const handleUpdate = () => {
    setUpdatePopupData({
      name: getValues("roleName"),
      description: getValues("description"),
    });

    updateRole.mutate();
  };

  return (
    <div>
      <div>
        <Modal
          open={open}
          onClose={() => cancelUpdateOperation('cancel')}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={styles.update_role_modal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <h1 className={styles.heading}>Update Role</h1>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit(handleUpdate)}>
                <div className={styles.label_and_inputs}>
                  <div className={styles.field_name}>
                    <label htmlFor="name">Role Name*</label>
                  </div>
                  <div>
                    <input
                      defaultValue={updatePopupData.name}
                      type="text"
                      placeholder='Enter The Name'
                      className={styles.input_fields}
                      {...register("roleName", {
                        required: 'Role name is required',
                        validate: value => {
                          const lowerCaseValue = value.toLowerCase();
                          return (
                            !rolesList?.data?.some((category: any) => category.name.toLowerCase() === lowerCaseValue) ||
                            'Role name is already exists'
                          );
                        },
                      })}
                    />
                  </div>
                  {errors.roleName && <p className={styles.error}>{errors.roleName.message}</p>}
                </div>

                <div className={styles.label_and_inputs}>
                  <div className={styles.field_name}>
                    <label htmlFor="name">Role description*</label>
                  </div>
                  <div>
                    <input
                      defaultValue={updatePopupData.description}
                      type="text"
                      placeholder='Enter the goal'
                      className={styles.input_fields}
                      {...register("description", {
                        required: 'Description is required',
                        validate: value => {
                          const lowerCaseValue = value.toLowerCase();
                          return (
                            !rolesList?.data?.some((category: any) => category.description.toLowerCase() === lowerCaseValue) ||
                            'Role description already exists'
                          );
                        },
                      })}
                    />
                  </div>
                  {errors.description && <p className={styles.error}>{errors.description.message}</p>}
                </div>
                <div className={styles.update_btn}>
                  <Button variant="contained" onClick={() => cancelUpdateOperation('cancel')} className={styles.cancel_button}>Cancel</Button>
                  <Button variant="contained" type='submit'>Update</Button>
                </div>
              </form>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default UpdateRole;
