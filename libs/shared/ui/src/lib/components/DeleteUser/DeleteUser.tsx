import styles from './DeleteUser.module.scss';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import Button from '@mui/material/Button';
import { useDeleteUser } from '@goal-tracker/data-access';

export interface DeleteUserProps {
  open: boolean;
  handleClose: () => void;
  deleteUserId: number | null;
  cancelDeleteOperation: () => void;
}

export function DeleteUser({ open, handleClose, deleteUserId, cancelDeleteOperation }: DeleteUserProps) {

  console.log('deleteUserId', deleteUserId)
  const deleteUsers = useDeleteUser(deleteUserId, { success: handleClose });
  const handleDelete = () => {
    console.log('deleteUserId', deleteUserId, 'deleteUsers', deleteUsers)
    deleteUsers.mutate();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={cancelDeleteOperation}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.delete_user_modal}>
          <div className={styles.delete_icon}>
            <span className={styles.icon}>
              <DeleteIcon />
            </span>
          </div>

          <div className={styles.delete_confirmation_container}>
            <div className={styles.heading}>
              <h1>Delete User ?</h1>
            </div>
            <div className={styles.warning}>
              <span className={styles.warning_icon}>
                <WarningIcon />
              </span>
              <span>You'll permanently lose this User, UserID- {deleteUserId}</span>
            </div>
          </div>

          <div className={styles.delete_btn}>
            <Button
              variant="contained"
              onClick={cancelDeleteOperation}
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
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteUser;
