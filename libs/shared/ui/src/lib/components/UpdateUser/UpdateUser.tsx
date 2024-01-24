import React, { useState, useEffect } from 'react';
import styles from './UpdateUser.module.scss';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { usePutUpdateUser } from '@goal-tracker/data-access';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

export interface UpdateUserProps {
  open: boolean;
  handleClose: () => void;
  prefilledInputData: any;
  userId: any;
  roles: any;
  cancelUpdateOperation: () => void;
  usersList : any
}

export function UpdateUser({ open, handleClose, prefilledInputData, userId, roles, cancelUpdateOperation , usersList}: UpdateUserProps) {
  const createUser = usePutUpdateUser({ success: handleClose });

  const { register, handleSubmit, setError, setValue, control, formState: { errors } } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile_number: "",
      role: "", 
      gender: "",
      password: ""
    }
  });

  console.log("prefilledInputData-->", prefilledInputData);

  const handleUpdateUser: SubmitHandler<any> = (data: any) => {
    console.log(data)
    const isEmailExist = usersList?.data?.some((user : any) => user.email === data.email);
    if (isEmailExist) {
      setError('email', {
        type: 'manual',
        message: 'This email is already exists.',
      });
      // alert('this user is already exist! ')
    } else {
      createUser.mutate({ userId, updatedUserData: data });
    }
  };

  useEffect(() => {
    if (prefilledInputData) {
      setValue('firstName', prefilledInputData?.firstName || '');
      setValue('lastName', prefilledInputData?.lastName || '');
      setValue('email', prefilledInputData?.email || '');
      setValue('mobile_number', prefilledInputData?.mobile_number || '');
      setValue('role', prefilledInputData?.role?.roleId || ''); 
      setValue('gender', prefilledInputData?.gender || '');
    }
  }, [prefilledInputData, setValue]);

  return (
    <div>
      <Modal
        open={open}
        onClose={cancelUpdateOperation}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.create_user_modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className={styles.heading}>Update User</div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit(handleUpdateUser)}>
              <div className={styles.multiple_inputs}>
              <div className={styles.label_and_inputs}>
                  <div className={styles.field_name}>
                    <label htmlFor="firstName">User's First Name *</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Enter the First Name"
                      className={styles.input_fields}
                      {...register('firstName', { 
                        required: 'First Name is required',
                        pattern: {
                          value: /^[a-zA-Z]+$/,
                          message: "That's not a valid first name"
                        },
                        maxLength: {
                          value: 15,
                          message: "first name is too long"
                       } 
                      })}
                    />
                    {errors.firstName && (
                      <p className={styles.error}>{errors.firstName.message}</p>
                    )}
                  </div>
                </div>
                <div className={styles.label_and_inputs}>
                  <div className={styles.field_name}>
                    <label htmlFor="lastName">User's Last Name *</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Enter the Last Name"
                      className={styles.input_fields}
                      {...register('lastName', { 
                        required: 'Last Name is required',
                        pattern: {
                          value: /^[a-zA-Z]+$/,
                          message: "That's not a valid last name"
                        },
                        maxLength: {
                          value: 15,
                          message: "last name is too long"
                       }  
                      })}
                    />
                    {errors.lastName && (
                      <p className={styles.error}>{errors.lastName.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.multiple_inputs}>
              <div className={styles.label_and_inputs}>
                  <div className={styles.field_name}>
                    <label htmlFor="email">User's Email *</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Enter the Email"
                      className={styles.input_fields}
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email format",
                        }, 
                      })}
                    />
                    {errors.email && (
                      <p className={styles.error}>{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className={styles.label_and_inputs}>
                  <div className={styles.field_name}>
                    <label htmlFor="mobile_number">User's Mobile No. *</label>
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Enter the Mobile No."
                      className={styles.input_fields}
                      {...register('mobile_number', { 
                        required: 'Mobile No. is required',
                        pattern: {
                          value: /^(?:\+?91)?[6-9]\d{9}$/,
                          message: "Invalid mobile number format",
                        }, 
                        minLength: {
                          value: 10,
                          message: "This number is too short"
                        }, 
                        maxLength: {
                          value: 12,
                          message: "...And now it's too long"
                        } 
                      })}
                      onInput={(e) => {
                        const inputElement = e.target as HTMLInputElement;
                        inputElement.value = inputElement.value.replace(/[^0-9]/g, '');
                      }}
                    />
                    {errors.mobile_number && (
                      <p className={styles.error}>{errors.mobile_number.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.multiple_inputs}>
                <div className={styles.label_and_inputs}>
                  <div className={styles.field_name}>
                    <label>User's Role *</label>
                  </div>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        className={styles.select_dropdown}
                      >
                        <MenuItem value="">
                          Select Role
                        </MenuItem>
                        {roles?.data?.map((role: any) => (
                          <MenuItem key={role.roleId} value={role.roleId}>
                            {role.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                    rules={{ required: 'Please select a role' }}
                  />
                  {errors.role && (
                    <p className={styles.error}>{errors.role.message}</p>
                  )}
                </div>

                <div className={styles.gender}>
                  <div className={styles.field_name}>
                    <label>Gender *</label>
                  </div>
                  <div className={styles.gender_selection_section}>
                    <div className={styles.input_and_label}>
                      <input
                        type="radio"
                        value="Male"
                        {...register('gender', { required: 'Please select a gender' })}
                      />
                      <label>Male</label>
                    </div>

                    <div className={styles.input_and_label}>
                      <input
                        type="radio"
                        value="Female"
                        {...register('gender', { required: 'Please select a gender' })}
                      />
                      <label>Female</label>
                    </div>
                  </div>
                  {errors.gender && (
                    <p className={styles.error}>{errors.gender.message}</p>
                  )}
                </div>
              </div>

              <div className={styles.multiple_inputs}>
                <div className={styles.label_and_inputs}>
                  <div className={styles.field_name}>
                    <label htmlFor="password">User's Password *</label>
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Enter the Password"
                      className={styles.input_fields}
                      {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && (
                      <p className={styles.error}>{errors.password.message}</p>
                    )}
                  </div>
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
                <Button
                  variant="contained"
                  className={styles.create_button}
                  type="submit"

                >
                  create
                </Button>
              </div>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default UpdateUser;
