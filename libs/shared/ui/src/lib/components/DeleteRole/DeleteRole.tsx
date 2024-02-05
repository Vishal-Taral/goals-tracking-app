import styles from './DeleteRole.module.scss';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import Button from '@mui/material/Button';
import { useDeleteRole } from '@goal-tracker/data-access';

export interface DeleteRoleProps {
  open: boolean;
  handleClose: () => void;
  deleteRoleId: any;
  rolesList: any;
  cancelDeleteOperation: () => void;
}

export function DeleteRole({ open, handleClose, deleteRoleId, rolesList, cancelDeleteOperation }: DeleteRoleProps) {

  const role = rolesList?.data?.find((category: any) => category.roleId === deleteRoleId);
  const roleName = role ? role.name : '';

  const deleteRole = useDeleteRole({ success: handleClose });
  const handleDelete = () => {
    deleteRole.mutate(deleteRoleId);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={cancelDeleteOperation}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.delete_role_modal}>
          <div className={styles.delete_icon}>
            <span className={styles.icon}>
              <DeleteIcon />
            </span>
          </div>
          <div className={styles.delete_confirmation_container}>
            <div className={styles.heading}>
              <h1>Delete Role ?</h1>
            </div>
            <div className={styles.warning}>
              <span className={styles.warning_icon}>
                <WarningIcon />
              </span>
              <span>{`You'll permanently lose this "${roleName}" Role`}</span>
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

export default DeleteRole;
