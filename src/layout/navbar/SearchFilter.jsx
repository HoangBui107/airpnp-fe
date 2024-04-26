import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {filterByName} from "../../redux/room/roomSlice"
import { getAllRooms } from "../../redux/room/roomThunks";
const SearchFilters = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [name , setName] = useState()
    useEffect(()=>{
        if(name === ''){
            dispatch(getAllRooms())
        }else{
            dispatch(filterByName(name))
        }
     

    },[name])

    const handleChange = (event) => {
        setName(event.target.value || '');
      };
    return (
        <div 
            className="h-[48px]  lg:h-[64] flex flex-row items-center justify-between border rounded-full"
        >
            <div className="hidden lg:block">   
                <div className="flex flex-row items-center justify-between">
                    <div className="cursor-pointer w-[250px] h-[48px] lg:h-[64] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
                        <p className="text-xs font-semibold">Where</p>
                    </div>
                        <input type="text" value={name} onChange={(e)=>{handleChange(e)}}/>
{/* 
                    <div className="cursor-pointer h-[48px] lg:h-[64] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
                        <p className="text-xs font-semibold">Check in</p>
                        <p className="text-sm">Add dates</p>
                    </div>
                    
                    <div className="cursor-pointer h-[48px] lg:h-[64] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
                        <p className="text-xs font-semibold">Check out</p>
                        <p className="text-sm">Add dates</p>
                    </div>

                    <div className="cursor-pointer h-[48px] lg:h-[64] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
                        <p className="text-xs font-semibold">Who</p>
                        <p className="text-sm">Add guests</p>
                    </div> */}
                </div>
            </div>

            

            <div className="p-2 h-10 w-10 flex justify-center items-center rounded-full bg-primary lg:mr-2 cursor-pointer" onClick={()=>{navigate('/list')}}>
                <div className="cursor-pointer p-2 lg:p-4 bg-airbnb hover:bg-airbnb-dark transition rounded-full text-white" >
                <IoIosSearch size={24} />
                </div>
            </div>
        
        </div>
    )
}

export default SearchFilters;