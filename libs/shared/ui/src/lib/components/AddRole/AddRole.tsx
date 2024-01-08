import React, { useContext, useState } from 'react';
import styles from './AddRole.module.scss';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { usePostAddRole } from '@goal-tracker/data-access';
import AppContext from '../../contexts/AppContext';

export interface AddRoleProps {
  open: boolean;
  handleClose: () => void;
}

export function AddRole({ open, handleClose }: AddRoleProps) {

  const [categoryName, setCategoryName] = useState('');
  const [descName, setDescName] = useState('');

  const addRole = usePostAddRole({success: handleClose});

  const obj = {
    roleName: categoryName,
    roleDescription: descName
  }

  // const context = useContext(AppContext)

  const handleCreateCategory = () => addRole.mutate(obj);

  const styleObj = {
    position: 'absolute',
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
            <h1 className={styles.heading}>Create Role</h1>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form>
              <div className={styles.label_and_inputs}>
                <div className={styles.field_name}>
                  <label htmlFor="name">Role Name</label>
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
                <div>
                  <input
                    type="text"
                    placeholder="Enter The Name"
                    className={styles.input_fields}
                    value={descName}
                    onChange={(e) => setDescName(e.target.value)}
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
                <Button variant="contained" className={styles.create_button} onClick={handleCreateCategory}>
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

export default AddRole;