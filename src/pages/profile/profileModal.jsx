import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useDispatch,useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {useState} from 'react';
import { UpdateUserProfileAction } from '../../redux/Auth/auth.action';
import { Avatar, IconButton, TextField, Backdrop, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { uploadToCloudinary } from '../../utils/UploadToCloud';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  outline:"none",
  overFlow:"scroll-y",
  borderRadius:3
};

export default function ProfileModal({open,handleClose}) {

    const { auth } = useSelector((Store) => Store);
    const [selectedImage, setSelectedImage] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const dispatch=useDispatch()

    const handleSelectImage = async (event) => {
        setIsLoading(true);
        const imageUrl = await uploadToCloudinary(event.target.files[0], 'image');
        setSelectedImage(imageUrl);
        setIsLoading(false);
        formik.setFieldValue('profilePicture', imageUrl);
      };

    // const handleFileChange=(e)=>{
    //     console.log("pic selelcted...",e)
    //     if (e.currentTarget.files.length > 0) {
    //         formik.setFieldValue('profilePicture', e.currentTarget.files[0])
    //     }
    // }

    // const handleSubmit=(values)=>{
    //     console.log("submitting values...",values)
    // }
    const formik=useFormik({
        initialValues:{
            firstName:auth.user?.firstName || "",
            lastName:auth.user?.lastName || "",
            profilePicture:auth.user?.profilePicture || null
        },
        onSubmit:(values,)=>{
            console.log("onSubmit values...",values)
            dispatch(UpdateUserProfileAction(values))
            handleClose()
        }
    })
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <form onSubmit={formik.handleSubmit}>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-3'>
                        <IconButton onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                        <p>Edit Profile</p>
                    </div>
                    <Button type="submit">Save</Button>
                </div>
                <div>
                    <div className='h-[15rem]'>
                        <img className='w-full h-full rounded-t-md'
                            src='https:/cdn.pixabay.com/photo/2014/01/13/20/01/pebbles-243910_640.jpg' alt=""/>
                    </div>
                    <div className='pl-5'>
                        <label htmlFor="profilePicture">
                        <Avatar className='tranform -translate-y-24 cursor-pointer'
                                sx={{width:"10rem",height:"10rem"}}
                                src={selectedImage || formik.values.profilePicture?
                                        // URL.createObjectURL(formik.values.profilePicture):
                                        selectedImage || formik.values.profilePicture:
                                        "https://cdn-icons-png.flaticon.com/128/892/892758.png"}
                        />
                        <input
                            type='file'
                            accept='image/*'
                            id='profilePicture'
                            name='profilePicture'
                            style={{display:'none'}}
                            onChange={(e)=>{
                                // formik.handleChange(e)
                                // handleFileChange(e)
                                handleSelectImage(e)
                            }}/>
                        </label>
                        
                    </div>
                </div>
                <div className='space-y-3'>
                    <TextField
                        fullWidth
                        id="firstName"
                        name='firstName'
                        label="First Name"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        fullWidth
                        id="lastName"
                        name='lastName'
                        label="Last Name"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                    />
                </div>
            </form>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
      </Modal>
    </div>
  );
}