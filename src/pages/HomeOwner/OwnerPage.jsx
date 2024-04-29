import { Link, useNavigate, Await, useLoaderData } from "react-router-dom";
import { Suspense, useEffect } from "react";
import List from "../../components/list/List";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms, getRoomStatus } from "../../redux/room/roomThunks";
import SpinLoading from "../../components/spin/Spin";
import BigChartBox from "../../components/chart/BigChartBox";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function OwnerPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { room, status } = useSelector((state) => state.room)
  console.log(room)
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

  const dataset = [
    { month: 'January', revenue: 50000 },
    { month: 'February', revenue: 40000 },
    { month: 'March', revenue: 45000 },
    { month: 'April', revenue: 60000 },
    { month: 'May', revenue: 70000 },
    { month: 'June', revenue: 65000 },
    { month: 'July', revenue: 70000 },
    { month: 'August', revenue: 75000 },
    { month: 'September', revenue: 80000 },
    { month: 'October', revenue: 85000 },
    { month: 'November', revenue: 90000 },
    { month: 'December', revenue: 95000 }
  ];
  const valueFormatter = (value) => `$${value.toLocaleString()}`;
  const chartSetting = {
    // Example setting, replace with actual settings
    colors: ['blue', 'red', 'green', 'yellow']
  };
  return (

    <>

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2">
                <div className="flex flex-col justify-center border border-gray-200 shadow-xl px-4 pb-4 pt-8 rounded-2xl">
                  <BigChartBox />
                  <h1 className="text-center">Total Revenue In Year</h1>
                </div>
                <div className="flex flex-col items-center justify-center w-full border border-gray-200 shadow-xl px-6 pb-4 pt-8 rounded-2xl ">
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={dataset}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Legend />
                      <Bar dataKey="revenue" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                  <h1 className="text-center mt-4">Total Revenue In Year</h1>
                </div>
              </div>


              <div className="title flex items-center justify-between">
                <h1 className="font-[100] text-3xl">My List Room</h1>
                <Link to="/add">
                  <button className="max-w-[20] bg-[#008982] hover:opacity-90 text-white py-2.5 px-5 rounded cursor-pointer">Create New Room</button>
                </Link>
              </div>
              <Suspense fallback={
                <>
                  <SpinLoading />
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
          <div className="chatContainer flex-[2_2_0%] bg-fcf5f3 h-full"></div>
        </div>
      </>
    </>
  );

}

export default OwnerPage;