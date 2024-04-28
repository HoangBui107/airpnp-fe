import { useState } from "react"
import { useDispatch } from "react-redux";
import { changePassword } from "../../redux/auth/authThunks";
import { Switch } from 'antd';
import BreadcrumbSetting from "./Breadcrumb";
const Security = () => {
    const dispatch = useDispatch()
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [data, setData] = useState({
        password: '',
        newPassword: '',
        confirmPassword: ''
    });

    const submitChangePassword = () => {
        if (data.newPassword === data.confirmPassword) {
            dispatch(changePassword(data))
        }
    }
    return (
        <>
            <div className="sm:container px-6 lg:mx-auto">
                <div className="flex flex-col w-full md:px-12 lg:px-24 py-14 gap-4">
    
                    <BreadcrumbSetting />
          
                    <div className="my-2">
                        <div className="flex flex-row justify-between">
                            <p className=" text-2xl font-semibold">Change Password</p>
                            <button className=" font-medium text-[#008489]" onClick={() => { setIsChangePassword(!isChangePassword) }}>Update</button>
                        </div>
                        {isChangePassword ? (
                            <>
                                <div className="flex flex-col">
                                    <div className="flex flex-col w-full gap-2 my-2">
                                        <h1 className="font-medium text-lg">Password</h1>
                                        <p>Current Password</p>
                                        <input className="border border-gray-300 h-10 " type="password" value={data.password} onChange={(e) => { setData({ ...data, password: e.target.value }) }} ></input>
                                    </div>
                                    <div className="flex flex-col w-full gap-2 my-2">
                                        <h1 className="font-medium text-lg">New Password</h1>
                                        <p>New Password</p>
                                        <input className="border border-gray-300 h-10" type="password" value={data.newPassword} onChange={(e) => { setData({ ...data, newPassword: e.target.value }) }} ></input>
                                    </div>
                                    <div className="flex flex-col w-full gap-2 my-2">
                                        <h1 className="font-medium text-lg " > Confirm New Password</h1>
                                        <p>Confirm New Password</p>
                                        <input className="border border-gray-300 h-10 " type="password" value={data.confirmPassword} onChange={(e) => { setData({ ...data, confirmPassword: e.target.value }) }} ></input>
                                    </div>
                                    <button className="py-2 px-4 bg-[#008489] text-white max-w-[40%] mt-2 rounded-md" onClick={() => (submitChangePassword())}> Update Password</button>
                                </div>
                            </>
                        )
                            : (
                                <>

                                </>

                            )}
                    </div>
                    <div className="border border-gray-200 w-full"></div>
                    <div className="my-2">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row">
                                <p className=" text-2xl font-semibold">Social </p>
                            </div>
                            <div>
                                <div className="my-4 flex flex-row justify-between">
                                    <p className=" text-gray-700 text-lg">Facebook</p>
                                    <button className=" font-medium text-[#008489]" >Connect</button>
                                </div>
                                <span>Connected</span>
                            </div>
                            <div>
                                <div className="my-4 flex flex-row justify-between">
                                    <p className=" text-gray-700 text-lg" >Google</p>
                                    <button className=" font-medium text-[#008489]" >Connect</button>
                                </div>
                                <span>Connected</span>
                            </div>
                        </div>
                    </div>

                    <div className="my-2">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row ">
                                <p className=" text-2xl font-semibold">Account</p>

                            </div>
                            <div className="my-4 flex flex-row justify-between">
                                <p className=" text-gray-700">Add 2MFA authentication</p>
                                <button className=" font-medium text-[#008489]" >Connect</button>
                            </div>
                            <div className="my-4 flex flex-row justify-between">
                                <p className=" text-gray-700">Drak mode</p>
                                <Switch size="large" defaultChecked />
                            </div>
                            <div className="my-4 flex flex-row justify-between">
                                <p className=" text-gray-700">Disable account</p>
                                <button className=" font-normal text-[#D93900]" >Disable</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Security