// import React, { useState } from 'react';
// import styles from './CreateUsers.module.scss';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import { useCreateUser } from '../../../../../data-access/src/lib/queries/useCreateUser';

// export interface UpdateCategoryProps {
//   open: boolean;
//   handleClose: () => void;
// }

// export function CreateUsers({ open, handleClose }: UpdateCategoryProps) {
//   const { mutate } = useCreateUser();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     mobileNo: "",
//     role: "",
//     gender: "",
//   });

//   const handleInputChange = (e : any) => {
//     const { name, value, type } = e.target;

//     if (type === 'radio') {

//       if (e.target.checked) {
//         setFormData((prevFormData) => ({
//           ...prevFormData,
//           [name]: value,
//         }));
//       }
//     } else {

//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         [name]: value,
//       }));
//     }
//   };

//   const handelCreateUser = async (e : any) => {
//     e.preventDefault();
//     await mutate(formData);
//     handleClose();
//   };

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

//   const renderInputField = (label : string, name : string, type : string) => (
//     <div className={styles.label_and_inputs}>
//       <div className={styles.field_name}>
//         <label htmlFor={name}>{label}</label>
//       </div>
//       <div>
//         <input
//           type={type}
//           placeholder={`Enter the ${name}`}
//           className={styles.input_fields}
//           name={name}
//           value={formData[name]}
//           onChange={handleInputChange}
//         />
//       </div>
//     </div>
//   );

//   return (
//     <div>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={styleObj}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             <div className={styles.heading}>Create User</div>
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             <form onSubmit={handelCreateUser}>
//               <div className={styles.multiple_inputs}>
//                 {renderInputField("User's First Name", "firstName" , "text")}
//                 {renderInputField("User's Last Name", "lastName" , "text")}
//               </div>

//               <div className={styles.multiple_inputs}>
//                 {renderInputField("Email", "email", "email")}
//                 {renderInputField("User's Mobile No.", "mobileNo", "tel" )}
//               </div>
              
//               <div className={styles.multiple_inputs}>
//                 {renderInputField("User's Role", "role" , "text")}
//                   <div className={styles.gender}>
//                    <div className={styles.field_name}>
//                      <label htmlFor="name">Gender</label>
//                    </div>
//                    <div className={styles.gender_selection_section}>
//                      <div className={styles.input_and_label}>
//                       <input
//                         type="radio"
//                         name="gender"
//                         value="male"
//                         onChange={handleInputChange}
//                       />
//                        <label>Male</label>
//                      </div>

//                      <div className={styles.input_and_label}>
//                       <input
//                         type="radio"
//                         name="gender"
//                         value="female"
//                         onChange={handleInputChange}
//                       />
//                        <label>Female</label>
//                      </div>                
//                    </div>
//                   </div>
//               </div>
              

//               <div className={styles.update_btn}>
//                 <Button
//                   variant="contained"
//                   onClick={handleClose}
//                   className={styles.cancel_button}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   variant="contained"
//                   className={styles.create_button}
//                   type="submit"
//                   // onClick={handleCreateUser}
//                 >
//                   Create
//                 </Button>
//               </div>
//             </form>
//           </Typography>
//         </Box>
//       </Modal>
//     </div>
//   );
// }

// export default CreateUsers;

// CreateUsers.tsx
// CreateUsers.tsx

import React, { useState } from 'react';
import styles from './CreateUsers.module.scss';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useCreateUser } from '../../../../../data-access/src/lib/queries/useCreateUser';

export interface UpdateCategoryProps {
  open: boolean;
  handleClose: () => void;
}

export function CreateUsers({ open, handleClose }: UpdateCategoryProps) {
  const { mutate, isLoading } = useCreateUser();

  const [formData, setFormData] = useState({
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

  const handleCreateUser = async (e: any) => {
    e.preventDefault();
    await mutate(formData);
    handleClose();
  };

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
            <div className={styles.heading}>Create User</div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleCreateUser}>
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
                      />
                      <label>Male</label>
                    </div>

                    <div className={styles.input_and_label}>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        onChange={handleInputChange}
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
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create'}
                </Button>
              </div>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateUsers;
