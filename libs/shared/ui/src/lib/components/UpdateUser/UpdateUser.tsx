import React, { useState, useEffect } from 'react';
import styles from './UpdateUser.module.scss';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { usePutUpdateUser } from '@goal-tracker/data-access';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export interface UpdateUserProps {
  open: boolean;
  handleClose: () => void;
  prefilledInputData: any;
  userId: any;
  roles: any;
}

export function UpdateUser({ open, handleClose, prefilledInputData, userId, roles }: UpdateUserProps) {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(prefilledInputData?.role?.roleId || ""); 
  const createUser = usePutUpdateUser({ success: handleClose });

  console.log("prefilledInputData-->", prefilledInputData);


  const [formData, setFormData] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    mobile_number: "",
    role: selectedRoleId,
    gender: "",
    password: ""
  });
  

  const handleInputChange = (e: any) => {
    const { name, value, type } = e.target;

    if (type === 'radio') {
      if (e.target.checked) {
        setFormData((prevFormData: any) => ({
          ...prevFormData,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleUpdateUser = (e: any) => {
    e.preventDefault();
    console.log(formData)
    createUser.mutate({ userId, updatedUserData: formData});
  };

  const renderInputField = (label: string, name: string, type: string) => (
    <div className={styles.label_and_inputs}>
      <div className={styles.field_name}>
        <label htmlFor={name}>{label}</label>
      </div>
      <div>
        <input
          type={type}
          placeholder={`Enter the ${name}`}
          className={styles.input_fields}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );

  useEffect(() => {
    if (prefilledInputData) {
      // setSelectedRoleId(prefilledInputData.role?.id);
      setFormData({
        firstName: prefilledInputData?.firstName,
        lastName: prefilledInputData?.lastName,
        email: prefilledInputData.email,
        mobile_number: prefilledInputData.mobile_number,
        role: prefilledInputData.role?.roleId,
        gender: prefilledInputData.gender,
      });
    }
  }, [prefilledInputData]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.create_user_modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className={styles.heading}>Update User</div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleUpdateUser}>
              <div className={styles.multiple_inputs}>
                {renderInputField("User's First Name", "firstName", "text")}
                {renderInputField("User's Last Name", "lastName", "text")}
              </div>

              <div className={styles.multiple_inputs}>
                {renderInputField("Email", "email", "email")}
                {renderInputField("User's Mobile No.", "mobile_number", "tel")}
              </div>

              <div className={styles.multiple_inputs}>
                <div className={styles.label_and_inputs}>
                  <div className={styles.field_name}>
                    <label>User's Role</label>
                  </div>
                  <Select
                  defaultValue={prefilledInputData?.role?.id}
                    value={selectedRoleId}
                    onChange={(e) => setSelectedRoleId(e.target.value)}
                    className={styles.select_dropdown}
                  >
                    <MenuItem value="">
                      Select Role
                    </MenuItem>
                    {roles?.data?.map((role: any) => (
                      <MenuItem key={role.roleId} value={role.roleId} >
                        {role.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className={styles.gender}>
                  <div className={styles.field_name}>
                    <label htmlFor="name">Gender</label>
                  </div>
                  <div className={styles.gender_selection_section}>
                    <div className={styles.input_and_label}>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        onChange={handleInputChange}
                        checked={formData.gender === 'Male'}
                      />
                      <label>Male</label>
                    </div>

                    <div className={styles.input_and_label}>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        onChange={handleInputChange}
                        checked={formData.gender === 'Female'}
                      />
                      <label>Female</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.multiple_inputs}>
                {renderInputField("Password", "password", "password")}
              </div>

              <div className={styles.update_btn}>
                <Button
                  variant="contained"
                  onClick={handleClose}
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
