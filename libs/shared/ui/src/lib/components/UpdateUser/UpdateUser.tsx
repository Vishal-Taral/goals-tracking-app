// import styles from './UpdateUser.module.scss';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import {useState} from 'react'
// import { usePutUpdateUser } from '@goal-tracker/data-access';
// /* eslint-disable-next-line */
// export interface UpdateUserProps {
//   open: boolean;
//   handleClose: () => void;
//   prefilledInputData : any;
// }

// export function UpdateUser({ open, handleClose, prefilledInputData }: UpdateUserProps) {

//   console.log("prefilledInputData-->",prefilledInputData);
  
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     mobileNumber: '',
//     role: '',
//   });

//   const { mutate } = usePutUpdateUser();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await mutate({
//       userId: prefilledInputData?.userId, 
//       updatedUserData: formData,
//     });
//     handleClose();
//   };
 
//   return (
//     <div>
//       <div>
//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box className={styles.update_user_modal}>
//             <Typography id="modal-modal-title" variant="h6" component="h2">
//               <h1 className={styles.heading}>Update User</h1>
//             </Typography>
//             <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//               <form onSubmit={handleSubmit}>
//                 <div className={styles.label_and_inputs}>
//                   <div className={styles.field_name}>
//                     <label htmlFor="name">User First Name</label>
//                   </div>
//                   <div >
//                     <input type="text" placeholder='Enter The Name' className={styles.input_fields} />
//                   </div>
//                 </div>
 
//                 <div className={styles.label_and_inputs}>
//                   <div className={styles.field_name}>
//                     <label htmlFor="name">User Last Name</label>
//                   </div>
//                   <div >
//                     <input type="text" placeholder='Enter the goal' className={styles.input_fields} />
//                   </div>
//                 </div>

//                 <div className={styles.label_and_inputs}>
//                   <div className={styles.field_name}>
//                     <label htmlFor="name">Email</label>
//                   </div>
//                   <div >
//                     <input type="text" placeholder='Enter The Name' className={styles.input_fields} />
//                   </div>
//                 </div>

//                 <div className={styles.label_and_inputs}>
//                   <div className={styles.field_name}>
//                     <label htmlFor="name">Mobile Number</label>
//                   </div>
//                   <div >
//                     <input type="text" placeholder='Enter The Name' className={styles.input_fields} />
//                   </div>
//                 </div>

//                 <div className={styles.label_and_inputs}>
//                   <div className={styles.field_name}>
//                     <label htmlFor="name">Role</label>
//                   </div>
//                   <div >
//                     <input type="text" placeholder='Enter The Name' className={styles.input_fields} />
//                   </div>
//                 </div>
//                 <div className={styles.update_btn}>
//                   <Button variant="contained" className={styles.cancel_button} onClick={handleClose}>Cancel</Button>
//                   <Button variant="contained" type='submit'>Update</Button>
//                 </div>
//               </form>
//             </Typography>
//           </Box>
//         </Modal>
//       </div>
//     </div>
//   );
// }
 
// export default UpdateUser;
 


import React, { useState , useEffect} from 'react';
import styles from './UpdateUser.module.scss';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { usePutUpdateUser } from '@goal-tracker/data-access';

export interface UpdateUserProps {
  open: boolean;
  handleClose: () => void;
  prefilledInputData : any;
  userId:any;
}

export function UpdateUser({ open, handleClose, prefilledInputData , userId}: UpdateUserProps) {
  const createUser = usePutUpdateUser({success : handleClose});

  console.log("prefilledInputData-->",prefilledInputData);
  

  const [formData, setFormData] = useState<any>({
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    role: '',
    gender: '',
  });

  const handleInputChange = (e: any) => {
    const { name, value, type } = e.target;

    if (type === 'radio') {
      if (e.target.checked) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleUpdateUser = (e: any) => {
    e.preventDefault();
    createUser.mutate({userId,formData});
  };

  const renderInputField = (label: string, name: string, type: string) => (
    <div className={styles.label_and_inputs}>
      <div className={styles.field_name}>
        <label htmlFor={name}>{label}</label>
      </div>
      <div>
        <input
          type={type}
          placeholder={`Enter the ${name}`}
          className={styles.input_fields}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );

  useEffect(() => {
    if (prefilledInputData) {
      setFormData({
        firstName: prefilledInputData.firstName || '',
        lastName: prefilledInputData.lastName || '',
        email: prefilledInputData.email || '',
        mobileNo: prefilledInputData.mobile_number || '',
        role: prefilledInputData.role?.name || '',
        gender: prefilledInputData.gender || '',
      });
    }
  }, [prefilledInputData]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.create_user_modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className={styles.heading}>Update User</div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleUpdateUser}>
              <div className={styles.multiple_inputs}>
                {renderInputField("User's First Name", "firstName", "text")}
                {renderInputField("User's Last Name", "lastName", "text")}
              </div>

              <div className={styles.multiple_inputs}>
                {renderInputField("Email", "email", "email")}
                {renderInputField("User's Mobile No.", "mobileNo", "tel")}
              </div>

              <div className={styles.multiple_inputs}>
                {renderInputField("User's Role", "role", "text")}
                <div className={styles.gender}>
                  <div className={styles.field_name}>
                    <label htmlFor="name">Gender</label>
                  </div>
                  <div className={styles.gender_selection_section}>
                    <div className={styles.input_and_label}>
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        onChange={handleInputChange}
                        checked={formData.gender === 'Male'}
                      />
                      <label>Male</label>
                    </div>

                    <div className={styles.input_and_label}>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        onChange={handleInputChange}
                        checked={formData.gender === 'Female'}
                      />
                      <label>Female</label>
                    </div>
                  </div>
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
                <Button
                  variant="contained"
                  className={styles.create_button}
                  type="submit"
                  
                >
                  create
                </Button>
              </div>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default UpdateUser;
