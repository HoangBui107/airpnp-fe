import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getPreSignURL } from "../../redux/file/fileThunk";
import { getProfileByToken, updateProfile } from "../../redux/profile/profileThunk";
import BreadcrumbSetting from "./Breadcrumb";
import { Autocomplete, Box, TextField, Button } from '@mui/material';
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
    };
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
            address: '',
            phone: '',
            description: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await dispatch(createRoom(values));
        },
    });

    const { profile } = useSelector((state) => state.profile)
    const user = jwtDecode(localStorage.getItem('token'))
    const { data } = useSelector((state) => state.file)
    const [imageUrl, setImageUrl] = useState('https://d1wuv3pBoxt0vy.cloudfront.net/avatar-users/5b383afb-771b-4729-847f-ad6e366795cd.jpg');

    useEffect(() => {
        dispatch(getProfileByToken()).then((res) => {
            const updatedFields = fields.map(field => ({
                ...field,
                value: res.payload[fieldAttributeMap[field.name]]

            }));
            console.log(res)
            setImageUrl(res?.payload?.avatarUrl)
            setFields(updatedFields);
        }).catch(error => {
            console.error('Lỗi khi lấy dữ liệu hồ sơ:', error);
        });
    }, []);

    const [loading, setLoading] = useState(false);

    const axiosClient = axios.create({
        baseURL: "",
    });

    const handleChange = async (event) => {
        // const file = event.fileList[0].originFileObj
        // if (file) {
        //     await dispatch(getPreSignURL()).unwrap().then(async (res) => {
        //         const reponse = await axiosClient.put(res?.result?.preSignedUrl, file)
        //         await dispatch(getProfileByToken()).unwrap().then((res) => {
        //             setImageUrl(res?.avatarUrl)
        //         })
        //         return reponse
        //     })
        // }
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
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {imageUrl ? <img loading='lazy' className=" rounded-full" src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </Box>
                        <Box class="w-full">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <TextField fullWidth id="outlined-basic" variant="outlined"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name} 
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
                            <button className="px-4 py-2 bg-white text-black border border-black hover:bg-black hover:text-white font-medium rounded-lg" onClick={() => { update() }}>Update profile</button>
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