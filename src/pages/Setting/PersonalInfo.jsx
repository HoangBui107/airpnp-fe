import { useDispatch, useSelector } from "react-redux";
import { getProfileByToken, updateProfile } from "../../redux/profile/profileThunk";
import { useEffect, useState } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import BreadcrumbSetting from "./Breadcrumb";
import { Flex, message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { getPreSignURL, uploadImageProductToS3 } from "../../redux/file/fileThunk";

// const getBase64 = (img, callback) => {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result));
//     reader.readAsDataURL(img);
// };

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const PersonalInfo = () => {
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.profile)
    const { user } = useSelector((state) => state.auth)
    const { data } = useSelector((state) => state.file)
    // console.log(data.result.preSignedUrl)
    const [fields, setFields] = useState([
        {
            name: 'Personal info',
            value: profile.fullName,
            isEdit: true
        },
        {
            name: 'Phone',
            value: profile.phone,
            isEdit: true
        },
        {
            name: 'Address',
            value: profile.address,
            isEdit: true
        },
    ])

    const fieldAttributeMap = {
        'Personal info': 'fullName',
        'Phone': 'phone',
        'Address': 'address'
    };


    useEffect(() => {
        dispatch(getProfileByToken()).then((res) => {
            const updatedFields = fields.map(field => ({
                ...field,
                value: res.payload[fieldAttributeMap[field.name]]

            }));
            setFields(updatedFields);
        }).catch(error => {
            console.error('Lỗi khi lấy dữ liệu hồ sơ:', error);
        });
    }, []);



    const edit = (fieldName) => {
        setFields(prevFields => {
            return prevFields.map(field => {
                if (field.name === fieldName) {
                    return {
                        ...field,
                        isEdit: !field.isEdit
                    };
                }
                return field;
            });
        });
    };

    const onChangeInput = (fieldName, value) => {
        setFields(prevFields => {
            return prevFields.map(field => {
                if (field.name === fieldName) {
                    return {
                        ...field,
                        value: value
                    };
                }
                return field;
            });
        });
    }

    const update = () => {
        dispatch(updateProfile({
            id: user?.UserId,
            fullName: fields[0].value,
            phone: fields[1].value,
            address: fields[2].value,
            avatarUrl: "string",

        }))

    }


    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    
    const formData = new FormData();
    const handleChange = async (info) => {

        const file = info.file.originFileObj;
        // console.log(info.file.originFileObj)
        // const file = info.file.originFileObj
        // // // Append the file to the FormData instance
        // formData.append('file',info.file.originFileObj);
        // console.log(formData)
        try {
            if (info.file.status === 'uploading') {
                setLoading(true);
                console.log("a")
                await dispatch(getPreSignURL()).unwrap().then((res) => {
                    dispatch(uploadImageProductToS3({file:file, url: res?.result?.preSignedUrl }))
                })
                console.log("v")
                return;
            }

        } catch (error) {

        } finally {
            // setLoading(false);

        }
        return;

        // console.log(data?.result?.preSignedUrl)
        // if (info.file.status === 'done') {
        //     console.log("A")
        //     // getBase64(info.file.originFileObj, (url) => {
        //     //     setImageUrl(url);
        //     // });
        // }
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    return (
        <>
            <div className="flex flex-col px-6 sm:container sm:mx-atuo">
                <div className="flex flex-col w-full sm:px-12 md:px-24 py-14 gap-4">
                    {/* <div className="flex flex-row gap-4">
                        <a href="#" className="font-[500] text-xl hover:underline">Account</a>
                        <p>Personal info</p>
                    </div>
                    <div>
                        <h1>Personal info</h1>
                    </div> */}
                    <BreadcrumbSetting />
                </div>
                <div className="flex flex-row sm:px-12 md:px-24 gap-4 ">
                    <div className="flex flex-col gap-4 w-2/3">
                        <div className="flex justify-center items-center">
                            <Upload
                                name="avatar"
                                listType="picture-circle"
                                className="avatar-uploader"
                                showUploadList={false}
                                // action={() => { dispatch(getPreSignURL())}}
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {imageUrl ? <img className=" rounded-full" src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </div>
                        {fields?.map((item) => {
                            return (
                                <div key={item.name} className="py-4 border-b ">
                                    <div className="flex justify-between">
                                        <p>{item?.name}</p>
                                        {item.isEdit ?
                                            <a className="underline cursor-pointer" onClick={() => { edit(item.name) }}>Edit</a>
                                            :
                                            <div className="flex flex-row gap-2">
                                                <FaCheck cursor={'pointer'} size={20} onClick={() => { edit(item.name) }} />
                                                <FaXmark cursor={'pointer'} size={20} onClick={() => {
                                                    edit(item.name);
                                                    // onChangeInput(item.name,)
                                                }} />
                                            </div>

                                        }

                                    </div>
                                    <div>
                                        <input
                                            value={item.value}
                                            disabled={item.isEdit}
                                            onChange={(e) => onChangeInput(item.name, e.target.value)}
                                        />

                                    </div>
                                </div>
                            )
                        })}
                        {/* <input id="upload" type="file"
                            onChange={(event) => {
                                // handleChange(event)
                                // formData.append('file',event.target.files[0]);
                                dispatch(uploadImageProductToS3({ file: event.target.files[0], url: data?.result?.preSignedUrl }))
                                console.log(event)
                                // this.readFile(event)
                                // return false
                            }} /> */}
                        <div className="flex justify-end mt-4">
                            <button className="px-4 py-2 bg-white text-black border border-black hover:bg-black hover:text-white font-medium rounded-lg" onClick={() => { update() }}>Update profile</button>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/3">

                    </div>
                </div>

            </div>


        </>
    )
}

export default PersonalInfo;