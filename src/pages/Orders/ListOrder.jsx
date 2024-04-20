import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRoomById } from "../../redux/room/roomThunks";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import './ListOrder.css';

const ListOrder = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {details} = useSelector((state) => state.room)
    console.log(details)
    const handleCreateOrder = () => {
        // const orderId = dispatch(createOrderAction(totalPrice));
        // return orderId;
      };
      const handleOnApprove = (data) => {
        // dispatch(onApproveOrderAction(data, orders));
      };

    useEffect(()=>{
        dispatch(getRoomById({id:id}))
    },[])
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

    const data = 
        {
            id:1,
            category:{
                id:1,
                name: 'studio'
            },
            name: 'Nha long',
            streets: '91 phuoc ly 1',
            district:'Son tra',
            city:'Da nang',
            country:'Viet Nam',
            email:'hoangbui23@gmail.com',
            longitude:'',
            latitude:'',
            price:'320',
            description:'There is a place filled with sunshine & sea breeze near My Khe beach called Astro House, where you can catch the vibe of Santorini in Danang. Nested on 3rd floor, city views appear through the big windows.',
            feedbacks:[
                {
                    userId: '',
                    hotelId:'',
                    content:'phong dep vcl',
                }
            ],
            roomImages:[
                {
                    id: 1,
                    url:"",
                }
            ]
        }
    
    return (
        <>
        <Box  className="card">
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
        </>
    )
}
export default ListOrder;