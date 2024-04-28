import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { format } from "date-fns";
import * as React from 'react';
import { useEffect, useState } from "react";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import SpinLoading from "../../components/spin/Spin";
import { getOrder } from "../../redux/order/orderThunk";
import './ListOrder.css';
const ListOrder = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  
  const { data, loading } = useSelector((state) => state.order)
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
              Check out ({data.length})
            </button>
            <button className="py-2 px-4 border-2 border-black rounded-3xl ">
              Check out (0)
            </button>
          </div>
        </div>
        <div className="bg-[#F7F7F7] flex flex-col">
          {data ? (
            <>
            {data.map((item)=>(
              <div className="flex flex-col sm:flex-row py-4 px-2 gap-4" key={item?.id}>
                <div className=" relative w-full sm:h-48 sm:w-48">
                  <img className=" object-cover sm:max-w-48 sm:max-h-48 rounded-xl" src="https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g" alt="" />
                </div>
                <div className="flex flex-col justify-center items-center sm:items-start gap-3">
                  <h1 className="text-xl font-medium">Khach san hoang bui</h1>
                  <p>{format(item?.startDate, "MM/dd/yyyy")} - {format(item?.endDate, "MM/dd/yyyy")}</p>
                  <p>{item?.price}$</p>
                  <p>{item?.note}</p>
                  {/* <p>loai 1 phong ngu </p> */}
                </div>
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