import { useEditor } from "@tiptap/react";
import React, { useState, useRef, useEffect } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ReactQuill from 'react-quill';
import { Editor } from 'react-draft-wysiwyg';
import 'react-quill/dist/quill.snow.css';
import './CreateRoom.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { getCityByCountry, getCountry, getDistrictByCityId } from "../../redux/common/commonThunk";
import { getAllCategory } from "../../redux/category/categoryThunk";
import getCoordinatesFromAddress from "./GetCoordinatesFromAddress ";
import { createRoom } from "../../redux/room/roomThunks";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const CreateRoom = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userInfo, setuserInfo] = useState({
        title: '',
    });
    const [selectedCountry, setSelectedCountry] = useState({
        name: '',
        id: ''
    })
    const [cityId, setCityId] = useState({
        name: '',
        id: ''
    })
    const [address, setAddress ] = useState('')
    const [nameDistrict, setNameDistrict] = useState('')
    const { country, city, district } = useSelector((state) => state.common)
    const { category } = useSelector((state) => state.category)
    const user = jwtDecode(localStorage.getItem('token'))
    console.log(user)
    const onChangeValue = (e) => {
        setuserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    }
    const initialValues = {
        name: '',
        street: '',
        city: '',
        country: '',
        description: 'as',
        district: '',
        email: user?.UserName,
        latitude: '',
        longitude: '',
        userId: user?.UserId,
        categoryId: '',
        price: '',
        latitude:"16.028102540830243",
        longitude:"108.23789666115937"
    };

    const validate = (values) => {
        const errors = {};

        return errors;
    };


    const onSubmit = (values, { setSubmitting }) => {
        console.log(values);
        const{price, ...data} =values
        dispatch(createRoom(data)).unwrap().then((res)=>{
        navigate('/')
        })
        setSubmitting(false);
    };

    let editorState = EditorState.createEmpty();
    const [description, setDescription] = useState(editorState);
    const onEditorStateChange = (editorState) => {
        setDescription(editorState);
    }

    useEffect(() => {
        dispatch(getCountry())
        dispatch(getAllCategory())
    }, [])
  
    const handleGetCoordinates = async () => {
        const coordinates = await getCoordinatesFromAddress(address, cityId.name, selectedCountry.id);
        console.log(coordinates)
        return coordinates
    }
    useEffect(() => {
        if (selectedCountry.id) {
            dispatch(getCityByCountry({ country: selectedCountry.id }))
        }
        if (cityId.id) {
            dispatch(getDistrictByCityId({ id: cityId.id }))
        }

        if (selectedCountry.name && cityId.name) {
            handleGetCoordinates()
        }
    }, [selectedCountry, cityId, address])


    useEffect(() => {

    }, [])

    const modules = {
        toolbar: [[{ header: [1, 2, 3, 4, 5, 6, false], font: [], size: [] }],
        [{ font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image", "video"],
        ],

    };
    const [value, setValue] = useState("");


    const [files, setFile] = useState([]);
    const [message, setMessage] = useState();
    const handleFile = (e) => {
        setMessage("");
        let file = e.target.files;

        for (let i = 0; i < file.length; i++) {
            const fileType = file[i]['type'];
            const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
            if (validImageTypes.includes(fileType)) {
                setFile([...files, file[i]]);
            } else {
                setMessage("only images accepted");
            }

        }
    };
    const removeImage = (i) => {
        setFile(files.filter(x => x.name !== i));
    }


    return (<>
        <div> <section class="bg-white dark:bg-gray-900">
            <div class="py-8 px-4  lg:py-16">
                <Formik
                    initialValues={initialValues}
                    validate={validate}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form>
                            <div className="flex w-[90%] mx-auto">
                                <div class="w-[50%] grid gap-4 sm:grid-cols-2 sm:gap-6 px-6">
                                    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
                                    <div class="sm:col-span-2">
                                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                                        <Field type="text" name="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                    </div>
                                    <div class="w-full">
                                        <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Street</label>
                                        <Field onChange={(e) => {
                                            setFieldValue("street", e.target.value);
                                            setAddress(e.target.value)
                                        }}
                                            type="text" name="street" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Street" />
                                    </div>
                                    <div class="w-full">
                                        <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                        <Field type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="" />
                                    </div>
                                    <div>
                                        <label for="categoryId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                        <Field as="select" name="categoryId"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                            <option value="">Select category</option>
                                            {category?.map(item => (
                                                <option key={item.id} value={item.id} >
                                                    {item.name}
                                                </option>
                                            ))}
                                        </Field>

                                    </div>
                                    <div>
                                        <label for="country" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                                        <Field as="select" name="country"
                                            value={selectedCountry.country}
                                            onChange={(e) => {
                                                const selectedOption = e.target.options[e.target.selectedIndex];
                                                const selectedCountryCode = selectedOption.getAttribute('data-code');
                                                setSelectedCountry({
                                                    ...selectedCountry,
                                                    name: e.target.value,
                                                    id: selectedCountryCode
                                                });
                                                setFieldValue("country", e.target.value);

                                                // setSelectedCountry.id(selectedCountryCode);

                                            }}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                            <option value="">Select Country</option>
                                            {country?.map(item => (
                                                <option key={item.countryName} value={item.countryName} data-code={item.countryCode}>
                                                    {item.countryName}
                                                </option>
                                            ))}
                                        </Field>

                                    </div>
                                    {selectedCountry ?
                                        <div>
                                            <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                            <Field as="select"
                                                name="city"
                                                value={cityId.name}
                                                onChange={(e) => {
                                                    const selectedOption = e.target.options[e.target.selectedIndex];
                                                    const selectedCountryCode = selectedOption.getAttribute('data-code');
                                                    setCityId({
                                                        ...cityId,
                                                        name: e.target.value,
                                                        id: selectedCountryCode
                                                    });
                                                    setFieldValue("city", e.target.value);
                                                    // setCityId(selectedCountryCode);

                                                }}
                                                id="country" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                <option selected="">Select City</option>
                                                {city?.map((item) => (
                                                    <option key={item?.name} name="city" value={item?.name} data-code={item.geonameId}>{item?.name}</option>
                                                ))}
                                            </Field>
                                        </div>

                                        : ''}

                                    {cityId ?
                                        <div>
                                            <label for="district" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">District</label>
                                            <Field as="select"
                                                name="district"
                                                id="country" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                <option selected="">Select City</option>
                                                {district?.map((item) => (
                                                    <option key={item?.name} name="city" value={item?.name} >{item?.name}</option>
                                                ))}
                                            </Field>
                                        </div>

                                        : ''}
                                    {/* <div>
                                        <label for="item-weight" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Weight (kg)</label>
                                        <Field type="number" name="item-weight" id="item-weight" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="12" required="" />
                                    </div> */}
                                    <div class="sm:col-span-2">
                                        <div className='editor'>
                                            <ReactQuill theme='snow' name="description" value={value}
                                                onChange={()=>{setFieldValue('description'),value}}
                                                className='editor-input'
                                                modules={modules}
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" class="bg-blue-500 hover:bg-blue-700 w-[30%] rounded-lg py-2 text-white font-medium" disabled={isSubmitting}>
                                        Add product
                                    </button>
                                </div>
                                <div className="w-[50%] px-6 mt-[6%]">
                                    <div class="flex items-center justify-center w-full">
                                        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                                            </div>
                                            <input id="dropzone-file" onChange={handleFile} type="file" class="hidden" />
                                        </label>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2 relative">
                                        {files.map((file, key) => {
                                            return (
                                                <div key={key} className="overflow-hidden relative">
                                                    <i onClick={() => { removeImage(file.name) }} className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer">X</i>
                                                    <img className="h-20 w-20 rounded-md" src={URL.createObjectURL(file)} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
        </div>
    </>);
}

export default CreateRoom;
