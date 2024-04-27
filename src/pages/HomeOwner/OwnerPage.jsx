import { Link, useNavigate, Await, useLoaderData } from "react-router-dom";
import { Suspense, useContext, useEffect } from "react";
import List from "../../components/list/List";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms, getRoomStatus } from "../../redux/room/roomThunks";
import SpinLoading from "../../components/spin/Spin";

function OwnerPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, room, status } = useSelector((state) => state.room)
  // console.log(status[0].yearlyOrders._2024)
  useEffect(() => {
    dispatch(getAllRooms())
    dispatch(getRoomStatus())
  }, [])
  // const handleLogout = async () => {
  //     try {
  //         await apiRequest.post("/auth/logout");
  //         updateUser(null);
  //         navigate("/");
  //     } catch (err) {
  //         console.log(err);
  //     }
  // };
  return (

    <>
      {loading ? (
        <>
          <SpinLoading />
        </>
      ) : (
        <>
          <div className=" sm:container sm:mx-auto py-8 ">
            <div className="details flex-[3_3_0%] pb-50">
              <div className="wrapper p-0 pr-12.5 flex flex-col gap-12">

                <div className="title flex items-center justify-between">
                  <h1 className="text-3xl font-semibold">User Information</h1>
                  {/* <Link to="/profile/update">
                    <button className="w-25 bg-yellow-500 text-black py-2.5 px-5 rounded cursor-pointer">Update Profile</button>
                  </Link> */}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4 md:gap-2">

                  <div className="flex justify-between flex-1 px-4 py-2 mx-2 rounded-lg " style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}>
                    <div className="flex flex-col justify-between ">
                      <span className=" font-bold text-lg ">Total In Month</span>
                      <span className="text-xl font-light">
                        {status.monthlyOrders}
                      </span>
                      <span className="w-max text-sm border-spacing-1 border-b-black">123</span>
                    </div>
                    <div className="right">
                      <div className="percentage positive">
                        123
                        {/* <KeyboardArrowUpIcon /> */}
                        {/* {form.diff.toFixed(1)} % */}
                      </div>
                      123
                      {/* {form.icon} */}
                    </div>
                  </div>
                  <div className="flex justify-between flex-1 px-4 py-2 mx-2 rounded-lg " style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}>
                    <div className="flex flex-col justify-between ">
                      <span className=" font-bold text-lg ">Total In Month</span>
                      <span className="text-xl font-light">
                        123
                      </span>
                      <span className="w-max text-sm border-spacing-1 border-b-black">123</span>
                    </div>
                    <div className="right">
                      <div className="percentage positive">
                        123
                        {/* <KeyboardArrowUpIcon /> */}
                        {/* {form.diff.toFixed(1)} % */}
                      </div>
                      123
                      {/* {form.icon} */}
                    </div>
                  </div>
                  <div className="flex justify-between flex-1 px-4 py-2 mx-2 rounded-lg " style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}>
                    <div className="flex flex-col justify-between ">
                      <span className=" font-bold text-lg ">Total Room</span>
                      <span className="text-xl font-light">
                        123
                      </span>
                      <span className="w-max text-sm border-spacing-1 border-b-black">123</span>
                    </div>
                    <div className="right">
                      <div className="percentage positive">
                        123
                        {/* <KeyboardArrowUpIcon /> */}
                        {/* {form.diff.toFixed(1)} % */}
                      </div>
                      123
                      {/* {form.icon} */}
                    </div>
                  </div>

                </div>


                <div className="title flex items-center justify-between">
                  <h1 className="font-[100] text-3xl">My List</h1>
                  <Link to="/add">
                    <button className="w-25 bg-yellow-500 text-black py-2.5 px-5 rounded cursor-pointer">Create New Rom</button>
                  </Link>
                </div>
                <Suspense fallback={
                  <>
                  <SpinLoading/>
                  </>
                }>
                  <Await
                    resolve={room}
                    errorElement={<p>Error loading posts!</p>}
                    
                  >
                    <List posts={room} />
                  </Await>
                </Suspense>

                {/* <div className="title flex items-center justify-between">
                  <h1 className="font-[100] text-3xl">Saved List</h1>
                </div> */}
              </div>
            </div>
            {/* Phần chat container */}
            <div className="chatContainer flex-[2_2_0%] bg-fcf5f3 h-full"></div>
          </div>
        </>
      )}
    </>
  );

}

export default OwnerPage;