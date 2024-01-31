import React, { useContext, useState } from 'react';
import styles from './AddRole.module.scss';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { usePostAddRole, AddRoleInput } from '@goal-tracker/data-access';
import AppContext from '../../contexts/AppContext';
import { useForm } from 'react-hook-form';

export interface AddRoleProps {
  open: boolean;
  handleClose: () => void;
  rolesList: any;
  cancelCreateOperation: () => void
}

export function AddRole({ open, handleClose, rolesList, cancelCreateOperation }: AddRoleProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      roleName: '',
      descName: ''
    }
  });
  console.log("rolesList", rolesList);
  console.log("errors", errors);

  const addRole = usePostAddRole({ success: handleClose });

  const obj: any = {
    roleName: watch("roleName"),
    roleDescription: watch("descName")
  };

  const handleCreateRole = () => {
    addRole.mutate(obj);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={cancelCreateOperation}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.updateUserModal}>
          <Typography id="modal-modal-title" variant="h6" component="span">Create Role</Typography>
          <form onSubmit={handleSubmit(handleCreateRole)}>
            <div className={styles.label_and_inputs}>
              <div>
                <div className={styles.field_name}>
                  <label htmlFor="name">Role Name*</label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter The Name"
                    className={styles.input_fields}
                    {...register("roleName", {
                      required: 'Role name is required',
                      validate: value => {
                        const lowerCaseValue = value.toLowerCase();
                        return (
                          !rolesList?.data?.some((category: any) => category.name.toLowerCase() === lowerCaseValue) ||
                          'Role name is already exists'
                        );
                      }
                    })}
                  />
                </div>
                {errors.roleName && <p className={styles.error}>{errors.roleName.message}</p>}
              </div>
              <div className={styles.label_and_inputs}>
                <div className={styles.field_name}>
                  <label htmlFor="name">Role Description*</label>
                </div>
                <input
                  type="text"
                  placeholder="Enter The Description"
                  className={styles.input_fields}
                  {...register("descName", {
                    required: 'description is required',
                    validate: value => {
                      const lowerCaseValue = value.toLowerCase();
                      return (
                        !rolesList?.data?.some((category: any) => category.description.toLowerCase() === lowerCaseValue) ||
                        'Role description already exists'
                      );
                    }
                  })}
                />
                {errors.descName && <p className={styles.error}>{errors.descName.message}</p>}
              </div>
            </div>

            <div className={styles.update_btn}>
              <Button
                variant="contained"
                onClick={cancelCreateOperation}
                className={styles.cancel_button}
              >
                Cancel
              </Button>
              <Button variant="contained" className={styles.create_button} type='submit'>
                Create
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AddRole;