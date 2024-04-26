import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRoomById } from "../../redux/room/roomThunks";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import './ListOrder.css';
import { getOrder } from "../../redux/order/orderThunk";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import SpinLoading from "../../components/spin/Spin";
const ListOrder = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { data, loading } = useSelector((state) => state.room)
  console.log(data)
  const handleCreateOrder = () => {
    // const orderId = dispatch(createOrderAction(totalPrice));
    // return orderId;
  };
  const handleOnApprove = (data) => {
    // dispatch(onApproveOrderAction(data, orders));
  };

  useEffect(() => {
    dispatch(getOrder())
  }, [])
  const img = [
    {
      id: 1,
      url: "https://xaydunganthienphat.com.vn/upload/filemanager/mau%20nha/mau%20nha%20cap%204%20mai%20thai%203%20phong%20ngu/mau-nha-cap-4-mai-thai-3-phong-ngu-1-phong-tho-mau-so-2.jpg"
    },
    {
      id: 2,
      url: "https://sbshouse.vn/wp-content/uploads/2022/03/nha-3-tang-hien-dai-2-1.jpg"
    },
    {
      id: 3,
      url: "https://sbshouse.vn/wp-content/uploads/2022/03/nha-3-tang-hien-dai-2-1.jpg"
    },
    {
      id: 4,
      url: "https://sbshouse.vn/wp-content/uploads/2022/03/nha-3-tang-hien-dai-2-1.jpg"
    },

  ]
  // useEffect(())
  const [center, setCenter] = useState({
    lat: 16.042834,
    lng: 108.169094,
    address: "My Hotel",
  });

  // const data =
  // {
  //   id: 1,
  //   category: {
  //     id: 1,
  //     name: 'studio'
  //   },
  //   name: 'Nha long',
  //   streets: '91 phuoc ly 1',
  //   district: 'Son tra',
  //   city: 'Da nang',
  //   country: 'Viet Nam',
  //   email: 'hoangbui23@gmail.com',
  //   longitude: '',
  //   latitude: '',
  //   price: '320',
  //   description: 'There is a place filled with sunshine & sea breeze near My Khe beach called Astro House, where you can catch the vibe of Santorini in Danang. Nested on 3rd floor, city views appear through the big windows.',
  //   feedbacks: [
  //     {
  //       userId: '',
  //       hotelId: '',
  //       content: 'phong dep vcl',
  //     }
  //   ],
  //   roomImages: [
  //     {
  //       id: 1,
  //       url: "",
  //     }
  //   ]
  // }

  return (
    <>
    {loading ? (
      <SpinLoading />
    ) : (
      <div className="flex flex-col container mx-auto">
        <div className="py-10">
          <h1 className=" text-3xl font-semibold">Welcome, Hoang!</h1>
          <button className="py-1 px-4 border border-black  rounded-lg font-normal  ">
            Complete your listing
          </button>
        </div>
        <div className="py-4">
          <h2 className="text-2xl font-medium">Your reservations</h2>
          <div className="flex flex-row gap-4">
            <button className="py-2 px-4 border-2 border-black rounded-3xl  ">
              Check out (0)
            </button>
            <button className="py-2 px-4 border-2 border-black rounded-3xl ">
              Check out (0)
            </button>
          </div>
        </div>
        <div className="bg-[#F7F7F7] flex ">
          {data ? (
            <>
              <div className="flex flex-row py-4 px-2 gap-4">

                <div className=" relative h-48 w-48">
                  <img className=" object-cover max-w-48 max-h-48 rounded-xl" src="https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g" alt="" />
                </div>
                <div className="flex flex-col justify-center gap-3">

                  <h1 className="text-xl font-medium">Khach san hoang bui</h1>
                  <p>24/04/2024 -- 30/05/20</p>
                  <p>300$</p>
                  <p>khach san xin vcl</p>
                  <p>loai 1 phong ngu </p>
                </div>
              </div>
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
          <p className=" font-medium underline underline-offset-2 ">All reservations(0)</p>
        </div>
      </div>
    )}
    </>
  )
}
export default ListOrder;

<Box className="card">
  <Box className="card-body">
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box display={"flex"} alignItems={"center"}>
        <img
          src="https://mdbootstrap.com/img/new/avatars/7.jpg"
          alt=""
          style={{ width: "45px", height: "45px" }}
          className="rounded-circle"
        />
        <Box className="ms-3">
          <Typography variant="subtitle1">
            "order.user?.fullName"
          </Typography>
          <Typography variant="subtitle1" className="text-muted">
            order.totalPrice VND
          </Typography>
          <span className="badge rounded-pill badge-warning">
            Shipping Status: order.shippingStatus | Payment Status:
            {/* {order.paymentStatus} */}
          </span>
        </Box>
      </Box>
    </Box>
  </Box>
  <Box
    className="card-footer border-0 bg-light p-2"
    display={"flex"}
    justifyContent={"space-around"}
  >
    <Link
      //   to={`/order/${order.id}`}
      className="btn btn-link m-0 text-reset"
      data-ripple-color="primary"
    >
      View<i className="fas fa-eye  ms-2"></i>
    </Link>
  </Box>
</Box>