import { Link, useNavigate, Await, useLoaderData } from "react-router-dom";
import { Suspense, useContext } from "react";
import List from "../../components/list/List";
import React, { useState } from "react";

function OwnerPage() {
    // const data = useLoaderData();

    // const { updateUser, currentUser } = useContext(AuthContext);

    const navigate = useNavigate();
    const [postData, setPostData] = useState([
        {
          id: 1,
          title: "Beautiful House in the Suburbs",
          images: ["https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/1/30/1142340/Honda-Wr-V.jpeg"],
          address: "123 Suburbia Street",
          price: 2500,
          bedroom: 3,
          bathroom: 2
        },
        {
          id: 2,
          title: "Cozy Apartment in the City Center",
          images: ["https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/1/30/1142340/Honda-Wr-V.jpeg"],
          address: "456 Downtown Avenue",
          price: 1800,
          bedroom: 2,
          bathroom: 1
        },
        {
          id: 3,
          title: "Luxurious Villa with Ocean View",
          images: ["https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/1/30/1142340/Honda-Wr-V.jpeg"],
          address: "789 Oceanfront Drive",
          price: 7500,
          bedroom: 5,
          bathroom: 4
        }
      ]);
    
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
  <div className=" sm:container sm:mx-auto ">
    <div className="details flex-[3_3_0%] overflow-y-scroll pb-50">
      <div className="wrapper p-0 pr-12.5 flex flex-col gap-12">

        <div className="title flex items-center justify-between">
          <h1 className="font-[100] text-3xl">User Information</h1>
          <Link to="/profile/update">
            <button className="w-25 bg-yellow-500 text-black py-2.5 px-5 rounded cursor-pointer">Update Profile</button>
          </Link>
        </div>

        <div className="info flex flex-col gap-5">

          <span className="flex items-center gap-5">
            Avatar:
            <img src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/1/30/1142340/Honda-Wr-V.jpeg" alt="" className="w-10 h-10 rounded-full object-cover" />
          </span>
 
          <span className="flex items-center gap-5">
            Username: <b>1232</b>
          </span>

          <span className="flex items-center gap-5">
            E-mail: <b>123123</b>
          </span>

          <button className="w-28 bg-teal-500 text-white py-2 px-5 rounded cursor-pointer" >Logout</button>
        </div>

        <div className="title flex items-center justify-between">
          <h1 className="font-[100] text-3xl">My List</h1>
          <Link to="/add">
            <button className="w-25 bg-yellow-500 text-black py-2.5 px-5 rounded cursor-pointer">Create New Post</button>
          </Link>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={postData}
            errorElement={<p>Error loading posts!</p>}
          >
            
            <List posts={postData} />
          </Await>
        </Suspense>

        <div className="title flex items-center justify-between">
          <h1 className="font-[100] text-3xl">Saved List</h1>
        </div>
      </div>
    </div>
    {/* Phần chat container */}
    <div className="chatContainer flex-[2_2_0%] bg-fcf5f3 h-full"></div>
  </div>
);

}

export default OwnerPage;