import styles from './DeleteRole.module.scss';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import Button from '@mui/material/Button';
import { useDeleteRole } from '@goal-tracker/data-access';

export interface DeleteRoleProps {
  open: boolean;
  handleClose: () => void;
  deleteRoleId: number | null; 
}

export function DeleteRole({ open, handleClose, deleteRoleId }: DeleteRoleProps) {

  const deleteRole = useDeleteRole({success : handleClose});
  const handleDelete = () => {
    deleteRole.mutate('deleteRoleId');
  };


  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.delete_role_modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className={styles.delete_icon}>
              <span className={styles.icon}>
                <DeleteIcon />
              </span>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className={styles.delete_confirmation_container}>
              <div className={styles.heading}>
                <h1>Delete User ?</h1>
              </div>
              <div className={styles.warning}>
                <span className={styles.warning_icon}>
                  <WarningIcon />
                </span>
                <span>You'll permanently lose this user</span>
              </div>
            </div>

            <div className={styles.delete_btn}>
              <Button
                variant="contained"
                onClick={() => handleClose()}
                className={styles.cancel_button}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleDelete}
                className={styles.delete}
              >
                Delete
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteRole;
