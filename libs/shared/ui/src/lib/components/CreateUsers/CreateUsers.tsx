import React, { useState } from 'react';
import styles from './CreateUsers.module.scss';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export interface UpdateCategoryProps {
  open: boolean;
  handleClose: () => void;
}

export function CreateUsers({ open, handleClose }: UpdateCategoryProps) {

  const styleObj = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'white',
    border: '1px solid #fff',
    borderRadius: 4,
    boxShadow: 24,
    p: 2,
    color: 'black',
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleObj}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className={styles.heading}>Create User</div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form>
              <div className={styles.multiple_inputs}>
                <div className={styles.label_and_inputs}>
                  <div className={styles.field_name}>
                    <label htmlFor="name">User's First Name</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Enter the first name"
                      className={styles.input_fields}
                    />
                  </div>
                </div>

                <div className={styles.label_and_inputs}>
                  <div className={styles.field_name}>
                    <label htmlFor="name">User's last name</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Enter the last name"
                      className={styles.input_fields}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.multiple_inputs}>
                <div className={styles.label_and_inputs}>
                  <div className={styles.field_name}>
                    <label htmlFor="name">Email</label>
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Enter the mail"
                      className={styles.input_fields}
                    />
                  </div>
                </div>

                <div className={styles.label_and_inputs}>
                  <div className={styles.field_name}>
                    <label htmlFor="name">User's Mobile No.</label>
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Enter the Mobile No."
                      className={styles.input_fields}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.multiple_inputs}>
                <div className={styles.label_and_inputs}>
                  <div className={styles.field_name}>
                    <label htmlFor="name">User's Role</label>
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Enter the Role"
                      className={styles.input_fields}
                    />
                  </div>
                </div>

                <div className={styles.gender_selection_section}>
                  vishal
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
                <Button variant="contained" className={styles.create_button} type="submit">
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

export default CreateUsers;