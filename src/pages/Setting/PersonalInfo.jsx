import { useDispatch, useSelector } from "react-redux";
import { getProfileByToken, updateProfile } from "../../redux/profile/profileThunk";
import { useEffect, useState } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";

const PersonalInfo = () => {
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.profile)
    const { user } = useSelector((state) => state.auth)
    console.log(profile)
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

    console.log(user)
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

    const update = () =>{
        dispatch(updateProfile({
            id: user?.UserId,
            fullName: fields[0].value,
            phone: fields[1].value,
            address: fields[2].value,
            avatarUrl: "string",

        }))
    }

    return (
        <>
            <div className="flex flex-col px-6 sm:container sm:mx-atuo">
                <div className="flex flex-col w-full sm:px-12 md:px-24 py-14 gap-4">
                    <div className="flex flex-row gap-4">
                        <a href="#" className="font-[500] text-xl hover:underline">Account</a>
                        <p>Personal info</p>
                    </div>
                    <div>
                        <h1>Personal info</h1>
                    </div>
                </div>

                <div className="flex flex-row sm:px-12 md:px-24 gap-4 ">
                    <div className="flex flex-col gap-4 w-2/3">
                        {fields?.map((item) => {
                            return (
                                <div key={item.name} className="py-4 border-b ">
                                    <div className="flex justify-between">
                                        <p>{item?.name}</p>
                                        {item.isEdit ?
                                            <a className="underline cursor-pointer" onClick={() => { edit(item.name) }}>Edit</a>
                                            :
                                            <div className="flex flex-row gap-2">
                                                <FaCheck cursor={'pointer'} size={20} onClick={() => { edit(item.name) }}/>
                                                <FaXmark cursor={'pointer'} size={20} onClick={() => { 
                                                    edit(item.name) ;
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
                        <div className="flex justify-end mt-4"> 
                            <button className="px-4 py-2 bg-white text-black border border-black hover:bg-black hover:text-white font-medium rounded-lg" onClick={()=>{update()}}>Update profile</button>
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