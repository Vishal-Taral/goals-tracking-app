// import styles from './update-category.module.scss';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import {useUpdateCategory} from '../../../../../data-access/src/lib/queries/updateCategory';
// /* eslint-disable-next-line */
// export interface UpdateProps {
//   open: any;
//   handleClose: (action: any) => void;
// }

// export function UpdateCategory({ open, handleClose }: UpdateProps) {
//   const styleObj = {
//     position: 'absolute' as 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 500,
//     bgcolor: 'white',
//     border: '1px solid #fff',
//     borderRadius: 4,
//     boxShadow: 24,
//     p: 2,
//     color: 'black',
//   };

//   const {mutateAsync:updateCategory} = useUpdateCategory();
//     const payLoad = {
//       categoryId:"c313db86-98cf-11ee-8263-04e56e7607c1",
//       categoryName:"4321Fitness"
//     }

//     const update = updateCategory(payLoad); 

//   return (
//     <div>
//       <div>
//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={styleObj}>
//             <Typography id="modal-modal-title" variant="h6" component="h2">
//               <h1 className={styles.heading}>Update Category</h1>
//             </Typography>
//             <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//               <form>
//                 <div className={styles.label_and_inputs}>
//                   <div className={styles.field_name}>
//                     <label htmlFor="name">Category Name</label>
//                   </div>
//                   <div >
//                     <input type="text" placeholder='Enter The Name' className={styles.input_fields} />
//                   </div>
//                 </div>

//                 {/* <div className={styles.label_and_inputs}>
//                   <div className={styles.field_name}>
//                     <label htmlFor="name">Roll description</label>
//                   </div>
//                   <div >
//                     <input type="text" placeholder='Enter the goal' className={styles.input_fields} />
//                   </div>
//                 </div> */}

//                 {/* <div className={styles.duration}>
//                   <div className={styles.label_and_inputs}>
//                     <div className={styles.field_name}>
//                       <label htmlFor="name">Duration from</label>
//                     </div>
//                     <div >
//                       <input type="date" className={styles.input_fields} />
//                     </div>
//                   </div>

//                   <div className={styles.label_and_inputs}>
//                     <div className={styles.field_name}>
//                       <label htmlFor="name">To</label>
//                     </div>
//                     <div >
//                       <input type="date" className={styles.input_fields} />
//                     </div>
//                   </div>
//                 </div>

//                 <div className={styles.label_and_inputs}>
//                   <div className={styles.field_name}>
//                     <label htmlFor="name">Email</label>
//                   </div>
//                   <div >
//                     <input type="email" placeholder='Enter the email' className={styles.input_fields} />
//                   </div>
//                 </div> */}

//                 <div className={styles.update_btn}>
//                   <Button variant="contained" onClick={handleClose} className={styles.cancel_button}>Cancel</Button>
//                   <Button variant="contained" onClick={handleClose}>Update</Button>
//                 </div>
//               </form>
//             </Typography>
//           </Box>
//         </Modal>
//       </div>
//     </div>
//   );
// }

// export default UpdateCategory;



// pages/update-category.js

import React, { useState } from 'react';
import styles from './update-category.module.scss';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useUpdateCategory } from '../../../../../data-access/src/lib/queries/updateCategory';

export interface UpdateCategoryProps {
  open: any;
  handleClose: () => void;
  selctedId: number;
  preFilledCategoryName : string;
}

export default function UpdateCategory({ open, handleClose, selctedId }: UpdateCategoryProps) {
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

  const { mutateAsync: updateCategory } = useUpdateCategory();
  const [categoryName, setCategoryName] = useState('');

  const ID = 1;

  const payLoad = {
    id: selctedId,
    name: categoryName,
  };

  const handleUpdate = async () => {
    handleClose();
    try {
      console.log('Payload:', payLoad);
      await updateCategory(payLoad);
      console.log('Category updated successfully');
    } catch (error) {
      console.error('Error updating category:', error);
    }
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
            <h1 className={styles.heading}>Update Category</h1>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form>
              <div className={styles.label_and_inputs}>
                <div className={styles.field_name}>
                  <label htmlFor="name">Category Name</label>
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
              </div>

              <div className={styles.update_btn}>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  className={styles.cancel_button}
                >
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleUpdate}>
                  Update
                </Button>
              </div>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
