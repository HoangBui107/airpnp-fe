import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoPricetagOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { deleteRoom } from "../../redux/room/roomThunks";
import DetailsModal from "../modals/DetailsModal";
import { openDetails } from "../../redux/modal/modalSlice";

const Card = React.memo(({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState('');

  const submitDelete = useCallback(() => {
    dispatch(deleteRoom(item?.id));
  }, [dispatch, item?.id]);
  
  const submitEdit = useCallback(() => {
    navigate(`/editRoom/${item?.id}`);
  }, [navigate, item?.id]);
  
  const submitView = useCallback(() => {
    setSelectedId(item?.id);
    dispatch(openDetails());
  }, [dispatch, item?.id]);

  return (
    <div className="flex flex-col md:flex-row md:gap-20 mx-auto md:mx-0 shadow-2xl">
      <div className="flex flex-2 px-2 py-2">
        <Link to={`/${item.id}`} className="block w-full h-full">
          <img src={item?.images?.[0] || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb5z6MCCSYYRWCiVDmoNaRZ1qEwl6MlQCOzkSBJbdMlg&s'} alt="" className="w-full h-full object-cover rounded-lg" />
        </Link>
      </div>
      <div className="flex-3 flex flex-col justify-between gap-10">
        <h2 className="text-20 font-semibold text-3xl text-gray-700 transition-colors duration-400 hover:text-black">
          <Link to={`/${item?.id}`}>{item?.name}</Link>
        </h2>

        <p className="flex items-center gap-5 text-gray-800">
          <img src="/pin.png" alt="" className="w-4 h-4" />
          <span>{item?.address}</span>        

        </p>          <div dangerouslySetInnerHTML={{ __html: item?.description}}></div>

        <p className="text-20 font-light text-green-500 text-xl sm:font-semibold flex gap-4 max-w-40 items-center">
          <IoPricetagOutline /> {item?.price} $
        </p>
        <div className="flex justify-around pb-4 px-10">
          <div className="flex gap-5">
            <button className="py-2 px-4 bg-[#008489] hover:bg-[#008972] text-white rounded-md" onClick={submitView}>View as a customer</button>
            <button className="py-2 px-4 bg-[#008489] hover:bg-[#008972] text-white rounded-md" onClick={submitEdit}>Edit</button>
            <button className="py-2 px-4 bg-red-400 hover:bg-red-500 text-white rounded-md" onClick={submitDelete}>Delete</button>
          </div>
        </div>
      </div>
      {selectedId === item.id ? <DetailsModal id={item?.id} /> : null}
    </div>
  );
});

export default Card;
