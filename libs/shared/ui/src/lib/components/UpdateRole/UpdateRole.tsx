import styles from './UpdateRole.module.scss';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useState} from 'react'
import { useUpdateRoles } from '@goal-tracker/data-access';
/* eslint-disable-next-line */
export interface UpdateRoleProps {
  open: boolean;
  handleClose: () => void;
  updateRoleId: string | null;
  prefilledInputData : any;
}
 
export function UpdateRole({ open, handleClose, updateRoleId, prefilledInputData }: UpdateRoleProps) {

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
 
  const [updatePopupData, setUpdatePopupData] = useState({
    name: prefilledInputData?.name ,description: prefilledInputData?.description
  })
  const changeHandler = (e: any, heading: string) => {
    const updatedData = {...updatePopupData, [heading]: e.target.value}
    setUpdatePopupData(updatedData);
  }
  const updateRole = useUpdateRoles({...updatePopupData, id: updateRoleId});
  const handleUpdate = async () => {
      await updateRole.mutate();    
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
              <form>
                <div className={styles.label_and_inputs}>
                  <div className={styles.field_name}>
                    <label htmlFor="name">Role Name</label>
                  </div>
                  <div >
                    <input defaultValue={updatePopupData.name} onChange={(e)=>changeHandler(e,'name')} type="text" placeholder='Enter The Name' className={styles.input_fields} />
                  </div>
                </div>
 
                <div className={styles.label_and_inputs}>
                  <div className={styles.field_name}>
                    <label htmlFor="name">Role description</label>
                  </div>
                  <div >
                    <input defaultValue={updatePopupData.description} onChange={(e)=>changeHandler(e,'description')} type="text" placeholder='Enter the goal' className={styles.input_fields} />
                  </div>
                </div>
                <div className={styles.update_btn}>
                  <Button variant="contained" onClick={()=>handleClose('cancel')} className={styles.cancel_button}>Cancel</Button>
                  <Button variant="contained" onClick={handleUpdate}>Update</Button>
                </div>
              </form>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
 
export default UpdateRole;
 