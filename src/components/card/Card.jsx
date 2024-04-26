import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoPricetagOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { deleteRoom } from "../../redux/room/roomThunks";

function Card( {item} ) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const submitDelete = () =>{
      dispatch(deleteRoom(item?.id))
  }

  const submitEdit = () =>{
    navigate(`/editRoom/${item?.id}`)
}
    return (
      <div className="flex gap-20">
        <div className="flex-2 h-200">
          <Link to={`/${item.id}`} className="block w-full h-full">
            <img src={item?.images?.[0] || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb5z6MCCSYYRWCiVDmoNaRZ1qEwl6MlQCOzkSBJbdMlg&s'} alt="" className="w-full h-full object-cover rounded-lg" />
          </Link>
        </div>
        <div className="flex-3 flex flex-col justify-between gap-10">
          <h2 className="text-20 font-semibold text-gray-700 transition-colors duration-400 hover:text-black">
            <Link to={`/${item?.id}`}>{item?.name}</Link>
          </h2>
          <p className="flex items-center gap-5 text-gray-800">
            <img src="/pin.png" alt="" className="w-4 h-4" />
            <span>{item?.address}</span>
          </p>
          
          <p className="text-20  font-light  bg-yellow-200 flex gap-4  w-20 items-center">
          <IoPricetagOutline /> {item?.price}
          </p>
          <div className="flex justify-between gap-10">
            <div className="flex gap-20 text-sm">
              <div className="flex items-center gap-5 bg-gray-200 rounded-lg px-2 ">
                <img src="/bed.png" alt="" className="w-4 h-4" />
                <span>{item?.bedroom} bedroom</span>
              </div>
              <div className="flex items-center gap-5 bg-gray-200 rounded-lg px-2">
                <img src="/bath.png" alt="" className="w-4 h-4" />
                <span>{item?.bathroom} bathroom</span>
              </div>
            </div>
            <div className="flex gap-20">
            <button className="py-2 px-4 bg-[#008489] hover:bg-[#008972] text-white rounded-md "
              onClick={()=>{submitEdit()}}
            >Edit</button>
            <button className="py-2 px-4 bg-red-400 hover:bg-red-500 text-white rounded-md "
              onClick={()=>{submitDelete()}}
            >Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  export default Card;