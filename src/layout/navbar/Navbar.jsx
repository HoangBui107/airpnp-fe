import { useState } from "react";
import { FaAirbnb } from "react-icons/fa6";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import UserMenu from "../../components/UserMenu";

const Navbar = () =>{
    const [type, setType] = useState('current')
    const handleChangeType = (currentType)=>{
        setType(currentType)
    }

    return(
        <>
        <div className="h-20 flex items-center pl-6">
            <FaAirbnb className="font-semibold transform rotate-180" color="#F5385D" size={40}/>
            <h1 className="text-primary text-lg font-semibold font-circular pl-3">Airpnp</h1>
          

            <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
            <button
            className={`py-2 px-6 ${
                type === "current" ? " text-black rounded-full font-bold" : ""
            }`}
            onClick={() => {
                handleChangeType("current");
            }}
            >
            Stay
          </button>
          <button
            className={`py-2 px-6 ${
                type === "listOrder" ? "text-black rounded-full font-bold" : ""
            }`}
            onClick={() => {
                handleChangeType('listOrder');
            }}
            >
            Experient
          </button>

            </nav>

          
        <div className="w-1/6 ">
            {/* <h1>Airbnb your home</h1>
            <div className="flex flex-row border border-black p-2 ml-2 rounded-3xl hover:shadow-2xl shadow-gray-500">
            <IoMdMenu size={30}/>
            <IoPersonCircleSharp color="" size={30}/>
            </div> */}
            <UserMenu currentUser={null}/>
        </div>
        </div>
        <div className="border border-gray-200 w-full mb-2"></div>
              </>
    )
}

export default Navbar;