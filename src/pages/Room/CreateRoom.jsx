import React, { useState, useEffect } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CreateRoom.css';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../redux/category/categoryThunk";
import getCoordinatesFromAddress from "./GetCoordinatesFromAddress ";
import { createRoom } from "../../redux/room/roomThunks";
import { jwtDecode } from "jwt-decode";
import * as yup from "yup";
import { Autocomplete, Box, TextField, Button } from '@mui/material';
import { Country, State } from 'country-state-city';

const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("description is required"),
    street: yup.string().required("street is required"),
    price: yup.number().required("price is required"),
});


const CreateRoom = () => {

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
            street: '',
            country: '',
            codeCountry: '',
            city: '',
            codeCity: '',
            description: '',
            district: '',
            email: user?.UserName,
            latitude: '',
            longitude: '',
            userId: user?.UserId,
            categoryId: '',
            files: [],
            price: 0,
            latitude: "16.028102540830243",
            longitude: "108.23789666115937"
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await dispatch(createRoom(values));
        },
    });

    const [value2, setValue2] = useState('');
    const handleEditorChange = (content) => {
        setValue2(content);
        formik.setFieldValue('description', content); // Set country ISO code in Formik
    };
    const [selectedCountry, setSelectedCountry] = useState(Country.getAllCountries()[0] ? {
        label: `${Country.getAllCountries()[0].name} (${Country.getAllCountries()[0].isoCode})`,
        isoCode: Country.getAllCountries()[0].isoCode,
        name: Country.getAllCountries()[0].name
    } : null);
    const [selectedState, setSelectedState] = useState(State.getStatesOfCountry("VN")[0] ? {
        label: `${State.getStatesOfCountry("VN")[0].name} (${State.getStatesOfCountry("VN")[0].isoCode})`,
        isoCode: State.getStatesOfCountry("VN")[0].isoCode,
        name: State.getStatesOfCountry("VN")[0].name
    } : null);

    const handleCountryChange = (event, newCountry) => {
        if (newCountry) {
            setSelectedCountry(newCountry); // Update the selected country state
            formik.setFieldValue('country', newCountry.name); // Set country name in Formik
            formik.setFieldValue('codeCountry', newCountry.isoCode); // Set country ISO code in Formik
        } else {
            setSelectedCountry(null); // Clear the selected country state
            formik.setFieldValue('country', ''); // Clear country name in Formik
            formik.setFieldValue('codeCountry', ''); // Clear country ISO code in Formik
        }
    };

    const handleStateChange = (event, newState) => {
        if (newState) {
            setSelectedState(newState); // Update the selected city state
            formik.setFieldValue('city', newState.name); // Set city name in Formik
            formik.setFieldValue('codeCity', newState.isoCode); // Set city state code in Formik
            console.log(formik.initialValues)

        } else {
            setSelectedState(null); // Clear the selected city state
            formik.setFieldValue('city', ''); // Clear city name in Formik
            formik.setFieldValue('codeCity', ''); // Clear city state code in Formik
        }
    };
    const [address, setAddress] = useState('')
    const { categories } = useSelector((state) => state.category)
    const user = jwtDecode(localStorage.getItem('token'))




    useEffect(() => {
        dispatch(getAllCategory())
    }, [])

    const handleGetCoordinates = async () => {
        const coordinates = await getCoordinatesFromAddress(address, cityId.name, selectedCountry.id);
        return coordinates
    }
    const [imagesUpload, setImagesUpload] = useState([]);

    const handleFile = (event) => {
        const file = event.target.files[0];

        if (file) {
            setImagesUpload([...imagesUpload, file]);
            formik.setFieldValue("files", [...formik.values.files, file]);
        }

    };
    const removeImage = (i) => {
        formik.setFieldValue('files', formik.values.files.filter(x => x.name !== i)); // Xóa tệp khỏi danh sách files trong Formik
        setImagesUpload(imagesUpload.filter(x => x.name !== i));
        console.log(formik.values);
    };
    const handleCategoryChange = (event, newValue) => {
        if (newValue) {
            formik.setFieldValue('categoryId', newValue.id); // Lưu ID của Category vào trường categoryId của Formik
        } else {
            formik.setFieldValue('categoryId', ''); // Xóa ID của Category khi không có Category được chọn
        }
    };
    return (
        <>
            <Box> <section class="bg-white dark:bg-gray-900">
                <Box class="py-8 px-4  lg:py-16">
                    <Box className="flex w-[90%] mx-auto">
                        <Box class="w-[50%] grid gap-4 sm:grid-cols-2 sm:gap-6 px-6">
                            <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
                            <Box class="sm:col-span-2">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                                <TextField fullWidth id="outlined-basic" variant="outlined"
                                    name="name"

                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    style={{
                                        marginBottom: "10px",
                                        display: "inline-grid",
                                    }} />
                            </Box>

                            <Box>
                                <label for="categoryId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                <Autocomplete
                                    fullWidth
                                    disablePortal
                                    id="combo-box-demo"
                                    options={categories}
                                    getOptionLabel={(option) => option.name} // Chọn thuộc tính hiển thị là name của Category
                                    getOptionSelected={(option, value) => option.id === value.id} // Chọn thuộc tính được chọn dựa trên id
                                    onChange={handleCategoryChange} // Gọi hàm handleCategoryChange khi có sự kiện thay đổi Category
                                    renderInput={(params) => <TextField {...params} variant="outlined" />} // Sử dụng TextField của Material-UI cho input
                                />
                            </Box>
                            <Box class="w-full">
                                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <TextField fullWidth id="outlined-basic" variant="outlined"
                                    name="price"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    error={formik.touched.price && Boolean(formik.errors.price)}
                                    helperText={formik.touched.price && formik.errors.price} />
                            </Box>

                            <Box>
                                <label for="country" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                                <Autocomplete
                                    value={selectedCountry}
                                    onChange={handleCountryChange}
                                    options={Country.getAllCountries().map(country => ({
                                        label: `${country.name} (${country.isoCode})`,
                                        isoCode: country.isoCode,
                                        name: country.name
                                    }))}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />

                            </Box>
                            <Box>
                                <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State (City)</label>
                                <Autocomplete fullWidth
                                    disablePortal
                                    id="combo-box-demo"
                                    value={selectedState}
                                    onChange={handleStateChange}
                                    options={State.getStatesOfCountry(formik.values.codeCountry).map(city => ({
                                        label: `${city.name} (${city.isoCode})`,
                                        isoCode: city.isoCode,
                                        name: city.name
                                    }))}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </Box>
                            <Box class="sm:col-span-2">
                                <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Street</label>
                                <TextField fullWidth id="outlined-basic" variant="outlined" name="street"
                                    value={formik.values.street}
                                    onChange={formik.handleChange}
                                    error={formik.touched.street && Boolean(formik.errors.street)}
                                    helperText={formik.touched.street && formik.errors.street}
                                    style={{
                                        marginBottom: "10px",
                                        display: "inline-grid",
                                    }} />
                            </Box>
                            <Box class="sm:col-span-2">
                                <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>

                                <Box className='editor'>
                                    <ReactQuill theme="snow"
                                        value={value2}
                                        onChange={handleEditorChange}
                                        className="editor-input"
                                        style={{ height: "200px", marginBottom: "50px" }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box className="w-[50%] px-6 mt-[6%]">
                            <Box class="flex items-center justify-center w-full">
                                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <Box class="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                                    </Box>
                                    <input id="dropzone-file" onChange={handleFile} type="file" multiple class="hidden" />
                                </label>
                            </Box>
                            <Box className="flex flex-wrap gap-2 mt-2 relative">
                                {imagesUpload.map((file, key) => {
                                    return (
                                        <Box key={key} className="overflow-hidden relative">
                                            <i onClick={() => { removeImage(file.name) }} className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer">X</i>
                                            <img className="h-20 w-20 rounded-md" src={URL.createObjectURL(file)} />
                                        </Box>
                                    )
                                })}
                            </Box>

                            <Button type="submit" class="bg-blue-500 hover:bg-blue-700 w-[30%] rounded-lg py-2 text-white font-medium" onClick={formik.handleSubmit}>
                                Add product
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </section>
            </Box>
        </>);
}

export default CreateRoom;