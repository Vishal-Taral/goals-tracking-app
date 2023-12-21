import styles from './update.module.scss';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useState,useEffect} from 'react'
/* eslint-disable-next-line */
export interface UpdateProps {
  open: any;
  handleClose: (action: any) => void;
  updatePopupDataCallback: () => void;
  roleListData : any;
}

export function Update({ open, handleClose, updatePopupDataCallback, roleListData }: UpdateProps) {
  console.log("roleListData======>" , roleListData);

  const roleName = roleListData.name;
  const roleDescription =  roleListData.description;

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
    name: roleName ,description: roleDescription
  })
  const changeHandler = (e : any, heading : any) => {
    setUpdatePopupData({...updatePopupData, [heading]: e})
    updatePopupDataCallback({...updatePopupData, [heading]: e})
  }

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
                    <input value={roleName} onChange={(e)=> changeHandler(e,'name')} type="text" placeholder='Enter The Name' className={styles.input_fields} />
                  </div>
                </div>

                <div className={styles.label_and_inputs}>
                  <div className={styles.field_name}>
                    <label htmlFor="name">Role description</label>
                  </div>
                  <div >
                    <input value={roleDescription} onChange={(e)=> changeHandler(e,'description')} type="text" placeholder='Enter the goal' className={styles.input_fields} />
                  </div>
                </div>

                {/* <div className={styles.duration}>
                  <div className={styles.label_and_inputs}>
                    <div className={styles.field_name}>
                      <label htmlFor="name">Duration from</label>
                    </div>
                    <div >
                      <input type="date" className={styles.input_fields} />
                    </div>
                  </div>

                  <div className={styles.label_and_inputs}>
                    <div className={styles.field_name}>
                      <label htmlFor="name">To</label>
                    </div>
                    <div >
                      <input type="date" className={styles.input_fields} />
                    </div>
                  </div>
                </div>

                <div className={styles.label_and_inputs}>
                  <div className={styles.field_name}>
                    <label htmlFor="name">Email</label>
                  </div>
                  <div >
                    <input type="email" placeholder='Enter the email' className={styles.input_fields} />
                  </div>
                </div> */}

                <div className={styles.update_btn}>
                  <Button variant="contained" onClick={()=>handleClose('cancel')} className={styles.cancel_button}>Cancel</Button>
                  <Button variant="contained" onClick={()=>handleClose('update')}>Update</Button>
                </div>
              </form>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Update;

