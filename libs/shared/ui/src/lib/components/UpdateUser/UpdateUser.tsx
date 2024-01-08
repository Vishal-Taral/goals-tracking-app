import styles from './UpdateUser.module.scss';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useState} from 'react'
import { usePutUpdateUser } from '@goal-tracker/data-access';
/* eslint-disable-next-line */
export interface UpdateUserProps {
  open: boolean;
  handleClose: () => void;
  prefilledInputData : any;
}

export function UpdateUser({ open, handleClose, prefilledInputData }: UpdateUserProps) {

  console.log("prefilledInputData-->",prefilledInputData);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    role: '',
  });

  const { mutate } = usePutUpdateUser();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutate({
      userId: prefilledInputData?.userId, 
      updatedUserData: formData,
    });
    handleClose();
  };
 
  return (
    <div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleObj}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <h1 className={styles.heading}>Update Role</h1>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit}>
                <div className={styles.label_and_inputs}>
                  <div className={styles.field_name}>
                    <label htmlFor="name">User First Name</label>
                  </div>
                  <div >
                    <input type="text" placeholder='Enter The Name' className={styles.input_fields} />
                  </div>
                </div>
 
                <div className={styles.label_and_inputs}>
                  <div className={styles.field_name}>
                    <label htmlFor="name">User Last Name</label>
                  </div>
                  <div >
                    <input type="text" placeholder='Enter the goal' className={styles.input_fields} />
                  </div>
                </div>

                <div className={styles.label_and_inputs}>
                  <div className={styles.field_name}>
                    <label htmlFor="name">Email</label>
                  </div>
                  <div >
                    <input type="text" placeholder='Enter The Name' className={styles.input_fields} />
                  </div>
                </div>

                <div className={styles.label_and_inputs}>
                  <div className={styles.field_name}>
                    <label htmlFor="name">Mobile Number</label>
                  </div>
                  <div >
                    <input type="text" placeholder='Enter The Name' className={styles.input_fields} />
                  </div>
                </div>

                <div className={styles.label_and_inputs}>
                  <div className={styles.field_name}>
                    <label htmlFor="name">Role</label>
                  </div>
                  <div >
                    <input type="text" placeholder='Enter The Name' className={styles.input_fields} />
                  </div>
                </div>
                <div className={styles.update_btn}>
                  <Button variant="contained" className={styles.cancel_button} onClick={handleClose}>Cancel</Button>
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
 
export default UpdateUser;
 