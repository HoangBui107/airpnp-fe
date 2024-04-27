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
import { getMultiPreSignURL } from "../../redux/file/fileThunk";
import axios from "axios";
import * as yup from "yup";
import { Autocomplete, Box, TextField, Button } from '@mui/material';
import { Country, State } from 'country-state-city';

const validationSchema = yup.object({
    // name: yup.string().required("Name is required"),
    // description: yup.string().required("description is required"),
    // street: yup.string().required("street is required"),
    // price: yup.number().required("price is required"),

});


const CreateRoom = () => {
    const dispatch = useDispatch();
    const [value2, setValue2] = useState('');
    const handleEditorChange = (content) => {
        setValue2(content);
        formik.setFieldValue('description', content); // Set country ISO code in Formik

        console.log('Nội dung mới:', content);
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
            price: 0,
            latitude: "16.028102540830243",
            longitude: "108.23789666115937"
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            alert(values)
            // await dispatch(createRoom(values));
        },
    });

    const axiosClient = axios.create({
        baseURL: "",
    });

    const onSubmit = async (values, { setSubmitting, setFieldValue }) => {

        console.log(values);
        const { price, ...data } = values
        await dispatch(createRoom(data)).unwrap().then(async (res) => {
            await dispatch(getMultiPreSignURL({ id: res?.id, quantity: files.length })).unwrap().then(async (url) => {
                console.log(url)
                const promises = files.map(async (file) => {
                    const response = await axiosClient.put(url?.[0]?.preSignedUrl, file).unwrap();
                    return response;
                });
                await Promise.all(promises);

            })
        })
        setSubmitting(false);
    };

    useEffect(() => {
        dispatch(getAllCategory())
    }, [])

    const handleGetCoordinates = async () => {
        const coordinates = await getCoordinatesFromAddress(address, cityId.name, selectedCountry.id);
        return coordinates
    }

    const [files, setFile] = useState([]);
    const handleFile = (e) => {
        let file = e.target.files;

        for (let i = 0; i < file.length; i++) {
            const fileType = file[i]['type'];
            const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
            if (validImageTypes.includes(fileType)) {
                setFile([...files, file[i]]);
            }
        }
    };
    const removeImage = (i) => {
        setFile(files.filter(x => x.name !== i));
    }

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
                            <Box class="w-full">
                                <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Street</label>
                                <TextField fullWidth id="outlined-basic" variant="outlined" />
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
                                <label for="categoryId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                <Autocomplete fullWidth
                                    disablePortal
                                    id="combo-box-demo"
                                    options={top100Films}
                                    renderInput={(params) => <TextField {...params} />}
                                />
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
                            <Box>
                                <label for="district" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">District</label>
                                <Autocomplete fullWidth
                                    disablePortal
                                    id="combo-box-demo"
                                    options={top100Films}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Box>
                            <Box class="sm:col-span-2">
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
                                {files.map((file, key) => {
                                    return (
                                        <Box key={key} className="overflow-hidden relative">
                                            <i onClick={() => { removeImage(file.name) }} className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer">X</i>
                                            <img className="h-20 w-20 rounded-md" src={URL.createObjectURL(file)} />
                                        </Box>
                                    )
                                })}
                            </Box>

                            <Button type="submit" class="bg-blue-500 hover:bg-blue-700 w-[30%] rounded-lg py-2 text-white font-medium"   onClick={formik.handleSubmit}>
                                Add product
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </section>
            </Box>
            {/* )} */}
        </>);
}

export default CreateRoom;
const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
        label: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
    {
        label: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        label: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { label: 'Forrest Gump', year: 1994 },
    { label: 'Inception', year: 2010 },
    {
        label: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: 'Goodfellas', year: 1990 },
    { label: 'The Matrix', year: 1999 },
    { label: 'Seven Samurai', year: 1954 },
    {
        label: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { label: 'City of God', year: 2002 },
    { label: 'Se7en', year: 1995 },
    { label: 'The Silence of the Lambs', year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: 'Life Is Beautiful', year: 1997 },
    { label: 'The Usual Suspects', year: 1995 },
    { label: 'Léon: The Professional', year: 1994 },
    { label: 'Spirited Away', year: 2001 },
    { label: 'Saving Private Ryan', year: 1998 },
    { label: 'Once Upon a Time in the West', year: 1968 },
    { label: 'American History X', year: 1998 },
    { label: 'Interstellar', year: 2014 },
    { label: 'Casablanca', year: 1942 },
    { label: 'City Lights', year: 1931 },
    { label: 'Psycho', year: 1960 },
    { label: 'The Green Mile', year: 1999 },
    { label: 'The Intouchables', year: 2011 },
    { label: 'Modern Times', year: 1936 },
    { label: 'Raiders of the Lost Ark', year: 1981 },
    { label: 'Rear Window', year: 1954 },
    { label: 'The Pianist', year: 2002 },
    { label: 'The Departed', year: 2006 },
    { label: 'Terminator 2: Judgment Day', year: 1991 },
    { label: 'Back to the Future', year: 1985 },
    { label: 'Whiplash', year: 2014 },
    { label: 'Gladiator', year: 2000 },
    { label: 'Memento', year: 2000 },
    { label: 'The Prestige', year: 2006 },
    { label: 'The Lion King', year: 1994 },
    { label: 'Apocalypse Now', year: 1979 },
    { label: 'Alien', year: 1979 },
    { label: 'Sunset Boulevard', year: 1950 },
    {
        label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    { label: 'The Great Dictator', year: 1940 },
    { label: 'Cinema Paradiso', year: 1988 },
    { label: 'The Lives of Others', year: 2006 },
    { label: 'Grave of the Fireflies', year: 1988 },
    { label: 'Paths of Glory', year: 1957 },
    { label: 'Django Unchained', year: 2012 },
    { label: 'The Shining', year: 1980 },
    { label: 'WALL·E', year: 2008 },
    { label: 'American Beauty', year: 1999 },
    { label: 'The Dark Knight Rises', year: 2012 },
    { label: 'Princess Mononoke', year: 1997 },
    { label: 'Aliens', year: 1986 },
    { label: 'Oldboy', year: 2003 },
    { label: 'Once Upon a Time in America', year: 1984 },
    { label: 'Witness for the Prosecution', year: 1957 },
    { label: 'Das Boot', year: 1981 },
    { label: 'Citizen Kane', year: 1941 },
    { label: 'North by Northwest', year: 1959 },
    { label: 'Vertigo', year: 1958 },
    {
        label: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
    },
    { label: 'Reservoir Dogs', year: 1992 },
    { label: 'Braveheart', year: 1995 },
    { label: 'M', year: 1931 },
    { label: 'Requiem for a Dream', year: 2000 },
    { label: 'Amélie', year: 2001 },
    { label: 'A Clockwork Orange', year: 1971 },
    { label: 'Like Stars on Earth', year: 2007 },
    { label: 'Taxi Driver', year: 1976 },
    { label: 'Lawrence of Arabia', year: 1962 },
    { label: 'Double Indemnity', year: 1944 },
    {
        label: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
    },
    { label: 'Amadeus', year: 1984 },
    { label: 'To Kill a Mockingbird', year: 1962 },
    { label: 'Toy Story 3', year: 2010 },
    { label: 'Logan', year: 2017 },
    { label: 'Full Metal Jacket', year: 1987 },
    { label: 'Dangal', year: 2016 },
    { label: 'The Sting', year: 1973 },
    { label: '2001: A Space Odyssey', year: 1968 },
    { label: "Singin' in the Rain", year: 1952 },
    { label: 'Toy Story', year: 1995 },
    { label: 'Bicycle Thieves', year: 1948 },
    { label: 'The Kid', year: 1921 },
    { label: 'Inglourious Basterds', year: 2009 },
    { label: 'Snatch', year: 2000 },
    { label: '3 Idiots', year: 2009 },
    { label: 'Monty Python and the Holy Grail', year: 1975 },
];