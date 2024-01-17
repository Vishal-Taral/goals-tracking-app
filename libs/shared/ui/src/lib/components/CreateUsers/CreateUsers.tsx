import React, { useState } from 'react';
import styles from './CreateUsers.module.scss';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { usePostAddUser } from '../../../../../data-access/src/lib/queries/usePostAddUser';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export interface UpdateCategoryProps {
  open: boolean;
  handleClose: () => void;
  roles: any;
}

export function CreateUsers({ open, handleClose, roles }: UpdateCategoryProps) {
  const [selectedRoleId, setSelectedRoleId] = useState<string>("");  

  const createUser = usePostAddUser({ success: handleClose });

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
        setFormData((prevFormData : any) => ({
          ...prevFormData,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevFormData : any) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleCreateUser = (e: any) => {
    e.preventDefault();
    const updatedFormData = { ...formData, role: selectedRoleId };
    createUser.mutate(updatedFormData);
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
            <div className={styles.heading}>Create User</div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleCreateUser}>
              <div className={styles.multiple_inputs}>
                {renderInputField("User's First Name", "firstName", "text")}
                {renderInputField("User's Last Name", "lastName", "text")}
              </div>

              <div className={styles.multiple_inputs}>
                {renderInputField("Email", "email", "email")}
                {renderInputField("User's Mobile No.", "mobile_number", "tel")}
              </div>

              <div className={styles.multiple_inputs}>
                <div className={styles.label_and_inputs }>
                  <div className={styles.field_name}>
                    <label>User's Role</label>
                  </div>
                  <Select
                    value={selectedRoleId}
                    onChange={(e) => setSelectedRoleId(e.target.value)}
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
                      />
                      <label>Male</label>
                    </div>

                    <div className={styles.input_and_label}>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        onChange={handleInputChange}
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

export default CreateUsers;
