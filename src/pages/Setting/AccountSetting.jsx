import { useEffect } from "react";
import { MdOutlineMedicalInformation, MdPayments, MdOutlineSecurity } from "react-icons/md";
import { useNavigate } from "react-router-dom";

  


const AccountSetting = () => {
    const navigate = useNavigate();

    const options = [
        {
            name: "Personal Info",
            icon: MdOutlineMedicalInformation,
            description: "Provide personal details and how we can reach you",
            param: 'personal-info'
        },
        {
            name: "Login & security",
            icon: MdOutlineSecurity ,
            description: "Update your password and secure your account"
        },
        {
            name: "Payment & payouts",
            icon: MdPayments,
            description: "Review payment, payout, counpons, and gif card"
        },
        {
            name: "Taxes",
            icon: "",
            description: ""
        },
        {
            name: "Notification",
            icon: "",
            description: ""
        },
    ]



    return (
        <>
            <div className="sm:container px-6 sm:mx-auto">
                <div className="flex flex-col w-full sm:px-12 md:px-24 py-14 gap-4">
                    <h1 className="text-xl md:sm:2xl lg:text-3xl xl:text-4xl 2xl:5xl font-medium">Account</h1>
                    <div className="flex flex-row gap-2">
                        <span className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium ">Bui Nguyen Minh Hoang,</span>
                        <span className="text-lg md:text-xl lg:text-2xl xl:text-3xl">hoang@gmail.com,</span>
                        <a className="text-lg md:text-xl lg:text-2xl xl:text-3xl underline font-semibold " href="3">Go To Profile</a>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:px-12 md:px-24  md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {options.map((item, index) => {
                        return (
                            <div 
                                onClick={()=>{navigate(item?.param)}}
                                className="bg-white w-full shadow-xl flex flex-col rounded-xl px-4 py-4 cursor-pointer" 
                                key={index}
                            >
                                <div className="mb-6"> 
                                {item.icon && <item.icon size={26}/>}
                                </div>
                                <div className="w-full"> 
                                <h3 className="text-base font-[400] md:text-base md:font-[500]">{item?.name}</h3>
                                <p className="text-gray-400 text-base">{item.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default AccountSetting