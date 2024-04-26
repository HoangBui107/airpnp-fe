import { useState } from "react"
import { useDispatch } from "react-redux";
import { changePassword } from "../../redux/auth/authThunks";

const Security = () => {
    const dispatch = useDispatch()
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [data, setData] = useState({
        password: '',
        newPassword: '',
        confirmPassword: ''
    });

    const submitChangePassword = () =>{
        if(data.newPassword === data.confirmPassword){
            dispatch(changePassword(data))
        }
    }
    return (
        <>
            <div className="sm:container px-6 lg:mx-auto">
                <div className="flex flex-col w-full md:px-12 lg:px-24 py-14 gap-4">
                    <h1 className="text-xl md:sm:2xl lg:text-3xl xl:text-4xl 2xl:5xl font-medium">Account</h1>
                    <div className="flex flex-row gap-2">
                        <span className="text-lg md:text-2xl lg:text-3xl xl:text-4xl font-semibold ">Secutiry</span>
                    </div>
                    <div></div>
                    <div className="my-4 ">
                        <h2 className="text-xl">Change Password</h2>
                    </div>
                    <div className="my-2">
                        <div className="flex flex-row justify-between">
                            <p className=" text-2xl font-semibold">Password</p>
                            <button className=" font-medium text-[#008489]" onClick={()=>{setIsChangePassword(!isChangePassword)}}>Update</button>
                        </div>
                        {isChangePassword ? (
                            <>
                            <div className="flex flex-col">
                                <div className="flex flex-col w-full gap-2 my-2">
                                    <h1 className="font-medium text-lg">Password</h1>
                                    <p>Current Password</p>
                                <input className="border border-gray-300 h-10 " type="password" value={data.password} onChange={(e)=>{setData({...data, password:e.target.value})}} ></input>
                                </div>
                                <div className="flex flex-col w-full gap-2 my-2">
                                    <h1 className="font-medium text-lg">New Password</h1>
                                    <p>New Password</p>
                                <input className="border border-gray-300 h-10" type="password" value={data.newPassword} onChange={(e)=>{setData({...data, newPassword:e.target.value})}} ></input>
                                </div>
                                <div className="flex flex-col w-full gap-2 my-2">
                                    <h1 className="font-medium text-lg " > Confirm New Password</h1>
                                    <p>Confirm New Password</p>
                                <input className="border border-gray-300 h-10 " type="password" value={data.confirmPassword} onChange={(e)=>{setData({...data, confirmPassword:e.target.value})}} ></input>
                                </div>
                                <button className="py-2 px-4 bg-[#008489] text-white max-w-[40%] mt-2 rounded-md" onClick={()=>(submitChangePassword())}> Update Password</button>
                            </div>
                            </>
                        ) 
                        : (
                            <>
                        <div>
                            <p>Update lasted two month</p>
                        </div>
                            </>

                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Security