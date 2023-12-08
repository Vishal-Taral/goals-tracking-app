import styles from './delete.module.scss';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import Button from '@mui/material/Button';

/* eslint-disable-next-line */
export interface DeleteProps {
  open :any;
  handleClose : (action : any) => void;
}

export function Delete({open , handleClose}: DeleteProps) {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    borderTop: '5px solid red',
    borderRadius : 4,
    boxShadow: 24,
    p: 2,
    color : 'black',
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
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className={styles.delete_icon}>
                <span className={styles.icon}><DeleteIcon /></span>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className={styles.delete_confirmation_container}>
              <div className={styles.heading}><h1>Delete User ?</h1></div>
              <div className={styles.warning}>
                <span className={styles.warning_icon}>
                  <WarningIcon />
                </span>
                <span>You'll permanently loss this user</span>
              </div>
            </div>

            <div className={styles.delete_btn}>
              <Button variant="contained" onClick={handleClose} className={styles.cancel_button}>Cancel</Button>
              <Button variant="contained" onClick={handleClose} className={styles.delete}>Delete</Button>
            </div>

          </Typography>
        </Box>
      </Modal>
      </div>
    </div>
  );
}

export default Delete;

