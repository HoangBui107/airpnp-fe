import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button, TextField, Box } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { createCategory, deleteCategory, getAllCategory, updateCategory } from "../../redux/category/categoryThunk";
import "./ManageCategory.css"

const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("description is required"),
});

const validationSchema2 = yup.object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("description is required"),
});

const ManageCategories = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",

        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await dispatch(createCategory(values));
            setSelectedCategoryIndex(null)

        },
    });

    const formik2 = useFormik({
        initialValues: {
            id: "",
            name: "",
            description: "",
        },
        validationSchema: validationSchema2,
        onSubmit: async (values) => {
            console.log(values)
            await dispatch(updateCategory(values));
            setSelectedCategoryIndex(null)
        },
    });

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);

    const handleTextClick = (id, name, description) => {
        setSelectedCategoryIndex(id);
        formik2.setFieldValue("id", id); // Đặt giá trị cho trường 'fieldName'

        formik2.setFieldValue("name", name);
        formik2.setFieldValue("description", description); // Đặt giá trị cho trường 'fieldName'
        // Đặt giá trị cho trường 'fieldName'
    };

    useEffect(() => {
        dispatch(getAllCategory());
    }, []);

    const handleDeleteCategory = (id) => {
        dispatch(deleteCategory(id));
    };
    return (
        <>
            <Grid item xs={12} width={"98%"} margin={"auto"}>
                <Box display={"flex"} justifyContent={"center"}>
                    <Box
                        style={{
                            width: "33%",
                            marginBottom: "10px",
                            display: "inline-grid",
                        }}
                    >
                        <TextField
                            id="outlined"
                            name="name"
                            label="Name Category"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            style={{
                                marginBottom: "10px",
                                display: "inline-grid",
                            }}
                        />
                        <TextField
                            id="outlined-multiline-static"
                            name="description"
                            label="Description Category"
                            multiline
                            rows={4}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                        <Button onClick={formik.handleSubmit}>Create Category</Button>
                    </Box>
                </Box>
                <Box className="row">
                    <Grid container width={"100%"}>
                        {categories.map((item, index) => (
                            <Grid item display={"flex"} marginRight={"2%"}>
                                <Box >
                                    <Box className="card">
                                        <Box className="card-body">
                                            <Box
                                                display={"flex"}
                                                justifyContent={"space-between"}
                                                alignItems={"center"}
                                            >
                                                <Box display={"flex"} alignItems={"center"}>
                                                    <img
                                                        src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                                                        alt=""
                                                        style={{ width: "45px", height: "45px" }}
                                                        className="rounded-circle"
                                                    />
                                                    {selectedCategoryIndex === item.id ? (
                                                        <><TextField
                                                            className="ms-3"
                                                            label="Name"
                                                            name="name"
                                                            id="standard-size-small"
                                                            size="small"
                                                            variant="standard"
                                                            value={formik2.values.name}
                                                            onChange={formik2.handleChange}
                                                            error={
                                                                formik2.touched.name &&
                                                                Boolean(formik2.errors.name)
                                                            }
                                                            helperText={
                                                                formik2.touched.name && formik2.errors.name
                                                            }
                                                        />
                                                            <TextField
                                                                className="ms-3"
                                                                label="Description"
                                                                name="description"
                                                                id="standard-size-small"
                                                                size="small"
                                                                variant="standard"
                                                                value={formik2.values.description}
                                                                onChange={formik2.handleChange}
                                                                error={
                                                                    formik2.touched.description &&
                                                                    Boolean(formik2.errors.description)
                                                                }
                                                                helperText={
                                                                    formik2.touched.description && formik2.errors.description
                                                                }
                                                            /></>


                                                    ) : (
                                                        <Box className="ms-3" width={`100px`}>
                                                            <p
                                                                className="fw-bold mb-1"
                                                                onClick={() =>
                                                                    handleTextClick(item.id, item.name, item.description)
                                                                }
                                                            >
                                                                {item.name}
                                                            </p>
                                                            <p
                                                                className="fw-bold mb-1"
                                                                onClick={() =>
                                                                    handleTextClick(item.id, item.name, item.description)
                                                                }
                                                            >
                                                                {item.description}
                                                            </p>

                                                            <p className="text-muted mb-0">
                                                                {item.products?.length} products
                                                            </p>
                                                        </Box>
                                                    )}
                                                </Box>
                                                <span className="badge rounded-pill badge-success">
                                                    Active
                                                </span>
                                            </Box>
                                        </Box>
                                        <Box className="card-footer border-0 bg-light p-2 d-flex justify-content-around">
                                            <Button
                                                onClick={() => {
                                                    handleDeleteCategory(item.id);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                            {selectedCategoryIndex === item.id ? (
                                                <>
                                                    <Button onClick={formik2.handleSubmit}>Update Category</Button>
                                                </>
                                            ) : (
                                                <>

                                                </>
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Grid>
        </>
    );
};

export default ManageCategories;