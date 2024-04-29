import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterByName } from "../../redux/room/roomSlice"
import { getAllRooms } from "../../redux/room/roomThunks";
import TextField from '@mui/material/TextField';

const SearchFilters = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [name, setName] = useState()
    useEffect(() => {
        dispatch(getAllRooms({ name: name }))
    }, [name])

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
                        <TextField fullWidth variant="standard" placeholder="Please enter name hotel"
                            InputProps={{
                                disableUnderline: true,
                            }} id="fullWidth"  value={name} onChange={(e)=>{handleChange(e)}}/>
                    </div>
                </div>
            </div>


            <div className="p-2 h-10 w-10 flex justify-center items-center rounded-full bg-primary lg:mr-2 cursor-pointer" onClick={() => { navigate('/list') }}>
                <div className="cursor-pointer p-2 lg:p-4 bg-airbnb hover:bg-airbnb-dark transition rounded-full text-white" >
                    <IoIosSearch size={24} />
                </div>
            </div>

        </div>
    )
}

export default SearchFilters;