import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileByToken, updateProfile, uploadAvatar } from "../../redux/profile/profileThunk";
import BreadcrumbSetting from "./Breadcrumb";
import {Box, TextField, Button } from '@mui/material';
import ReactQuill from 'react-quill';
import * as yup from "yup";
import { useFormik } from 'formik';

const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("description is required"),
    address: yup.string().required("address is required"),
    phone: yup.string().required("phone is required"),
});

const UpdateProfile = () => {
    const [description, setDescription] = useState('');
    const handleEditorChange = (content) => {
        setDescription(content);
        formik.setFieldValue('description', content);
    };
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            fullName: '',
            avatarUrl: '',
            address: '',
            phone: '',
            description: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(updateProfile({id: user.UserId, profile: values}));
        },
    });

    const { profile } = useSelector((state) => state.profile)
    const user = jwtDecode(localStorage.getItem('token'))
    const [imageUrl, setImageUrl] = useState('https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.1224184972.1714176000&semt=sph');

    useEffect(() => {
        if (profile) {
            formik.setValues({
                fullName: profile.fullName || "",
                avatarUrl: profile.avatarUrl || "",
                phone: profile.phone || "",
                address: profile.address || "",
                description: profile.description || "",
            });
            setDescription(profile.description);
            setImageUrl(profile.avatarUrl);
        }
    }, [profile]);


    useEffect(() => {
        dispatch(getProfileByToken());
    }, []);

    const [loading, setLoading] = useState(false);

    const handleUploadAvatar = (event) => {
        const file = event.fileList[0].originFileObj
        if (file) {
          dispatch(uploadAvatar(file));
          dispatch(getProfileByToken());
        }
      };
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <Box style={{ marginTop: 8 }}>Upload</Box>
        </button>
    );
    return (
        <>
            <Box className="flex flex-col px-6 sm:container sm:mx-atuo">
                <Box className="flex flex-col w-full sm:px-12 md:px-24 py-14 gap-4">
                    <BreadcrumbSetting />
                </Box>
                <Box className="flex flex-row sm:px-12 md:px-24 gap-4 ">
                    <Box className="flex flex-col gap-4 w-2/3">
                        <Box className="flex justify-center items-center">
                            <Upload
                                name="avatar"
                                listType="picture-circle"
                                className="avatar-uploader"
                                showUploadList={false}
                            onChange={handleUploadAvatar}
                            >
                                {imageUrl ? <img loading='lazy' className="w-40 rounded-full" src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </Box>
                        <Box class="w-full">
                            <label for="fullName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <TextField fullWidth id="outlined-basic" variant="outlined"
                                name="fullName"
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                helperText={formik.touched.fullName && formik.errors.fullName}
                            />
                        </Box>

                        <Box class="w-full">
                            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                            <TextField fullWidth id="outlined-basic" variant="outlined"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                helperText={formik.touched.phone && formik.errors.phone}
                            />
                        </Box>

                        <Box class="w-full">
                            <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                            <TextField fullWidth id="outlined-basic" variant="outlined"
                                name="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                error={formik.touched.address && Boolean(formik.errors.address)}
                                helperText={formik.touched.address && formik.errors.address}
                            />
                        </Box>
                        <Box class="sm:col-span-2">
                            <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>

                            <Box className='editor'>
                                <ReactQuill theme="snow"
                                    value={description}
                                    onChange={handleEditorChange}
                                    className="editor-input"
                                    style={{ height: "200px", marginBottom: "50px" }}
                                />
                            </Box>
                        </Box>
                        <Box className="flex justify-end mt-4">
                            <Button
                                type="submit"
                                variant="outlined"
                                onClick={formik.handleSubmit}
                            >
                                Save Change
                            </Button>
                        </Box>
                    </Box>
                    <Box className="flex flex-col w-1/3">

                    </Box>
                </Box>

            </Box>


        </>
    )
}

export default UpdateProfile;