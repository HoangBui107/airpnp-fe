import { useEffect, useState } from "react";
import { format } from "date-fns";
import * as React from 'react';
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import SpinLoading from "../../components/spin/Spin";
import { getOrder } from "../../redux/order/orderThunk";
import './ListOrder.css';
import TextField from '@mui/material/TextField';
import PaidIcon from '../../components/svg/PaidIcon';
import { jwtDecode } from "jwt-decode";
import { createFeedback } from "../../redux/feedback/feedbackThunks";

const ListOrder = () => {
  const dispatch = useDispatch()
  const { data, loading } = useSelector((state) => state.order)

  useEffect(() => {
    dispatch(getOrder())
  }, [])

  const [feedback, setFeedback] = useState()

  const handleChange = (event) => {
    setFeedback(event.target.value || '');
  };
  const user = jwtDecode(localStorage.getItem('token'))

  const handleSendFeedback = (roomId) => {
    dispatch(createFeedback({ userId: user.UserId, roomId: roomId, content: feedback }))
  };
  return (
    <>
      {loading ? (
        <SpinLoading />
      ) : (
        <div className="flex flex-col container mx-auto">
          <div className="py-10">
            <h1 className=" text-3xl font-semibold">Welcome, {user.UserName}!</h1>
          </div>
          <div className="bg-[#F7F7F7] flex flex-col">
            {data ? (
              <>
                {data.map((item) => (
                  <div>
                    <div className="flex flex-col sm:flex-row py-4 px-2 gap-4" key={item?.id}>
                      <div className=" flex items-center relative w-full sm:h-48 sm:w-48">
                        <img className=" object-cover sm:max-w-48 sm:max-h-48 rounded-xl" src={item?.room?.roomImages?.[0]?.url} alt="" />
                      </div>
                      <div className='grid grid-cols-1 sm:grid-cols-2 w-full'>
                        <div className="flex flex-col justify-center  sm:items-start gap-3">
                          <h1 className="text-xl font-medium md:w-full md:text-center">{item?.room?.name}</h1>
                          <div className='flex justify-around w-full'>
                            <p>StartDate</p>
                            <p>EndDate</p>
                          </div>
                          <div className='flex justify-around w-full'>
                            <p>{format(item?.startDate, "MM/dd/yyyy")}</p>
                            <p>{format(item?.endDate, "MM/dd/yyyy")}</p>
                          </div>
                          <div className="border border-gray-200 w-full"></div>
                          <div className='flex flex-row w-full items-start justify-center gap-2 md:items-center'>
                            <PaidIcon size='55px' />
                            <p className='font-normal'>${item?.price}  </p>
                          </div>
                          <p>{item?.note}</p>
                          {/* <p>loai 1 phong ngu </p> */}
                        </div>
                        <div className='flex flex-col md:flex-row justify-center items-center w-full relative'>
                          <div className='flex flex-row w-full sm:gap-6 sm:px-6'>
                            <TextField id="outlined-multiline-static"
                              className=' shadow-2xl'
                              value={feedback}
                              onChange={handleChange}
                              variant="standard"
                              InputProps={{
                                disableUnderline: true,
                                style: {
                                  width: '100%',
                                  borderRadius: 15,
                                  textAlign: 'center',
                                  padding: '10px 10px 50px 10px'
                                },
                              }}
                              multiline
                              rows={7}
                              placeholder="If you have any problems"
                              style={{ width: '100%', borderRadius: 15, placeContent: 'center' }}
                            />

                          </div>
                          <button className='border border-black px-4 py-1 rounded-lg absolute bottom-2' onClick={() => handleSendFeedback(item?.roomId)}>
                          Submit</button>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-200 w-full"></div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className=" w-full h-[30vh] flex flex-col items-center justify-center gap-4">
                  <MdOutlineRemoveShoppingCart className="opacity-50" size={100} spacing={1} />
                  <h1 className=" text-2xl text-gray-600">Don't have any order</h1>
                </div>
              </>
            )}

          </div>

          <div className="my-4">
            {/* <p className=" font-medium underline underline-offset-2 ">All reservations(0)</p> */}
          </div>
        </div>
      )}
    </>
  )
}
export default ListOrder;

