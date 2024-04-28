import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getRoomById } from "../../redux/room/roomThunks";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { createOrderPaypal, onApprove } from "../../redux/order/orderThunk";
import moment from "moment";

const Details = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const { id } = useParams()
    const { details } = useSelector((state) => state.room)
    const [totalPrice, setTotalPrice] = useState(10);

    const handleCreateOrder = async () => {
        const orderId = await dispatch(createOrderPaypal(totalPrice)).unwrap();
        return orderId.payload;
      };
      const handleOnApprove = (data) => {
        dispatch(onApprove({dataPaypal: data,  price: parseInt(location?.state?.totalPrice), note: "", startDate: moment(location?.state?.startDate).toISOString(), endDate: moment(location?.state?.endDate).toISOString(), roomId: id}));
      };

    useEffect(() => {
        dispatch(getRoomById({ id: id }))
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



    return (
        <>
            <div className="sm:container mx-auto">
                <div>
                    <div className="relative">
                        <div className="grid gap-1 grid-cols-2 overflow-hidden">
                            <div className="aspect-square w-full ">
                                <img
                                    className="aspect-square rounded-l-xl object-cover cursor-pointer "
                                    src={img[0].url}
                                    alt=""
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2 ">
                                {img?.map((item, index) => {
                                    return (
                                        <div className="aspect-square cursor-pointer object-cover " key={item?.id}>
                                            <img
                                                className={`h-full w-full 
                                            ${index === 1 ? 'rounded-tr-xl' : ''} 
                                            ${index === 3 ? 'rounded-br-xl' : ''}
                                            ` }
                                                src={item?.url} alt="" />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="flex py-5 px-5 sm:px-0 flex-col sm:flex-row ">
                        <div className="flex sm:w-2/3 flex-col">
                            <div className="mb-6">
                                <h1 className="font-semibold text-xl mb-4">{details?.name}</h1>
                                <h2>{details?.street}</h2>
                            </div>

                            <div className="flex flex-row py-5">
                                <div className="w-16 h-16 rounded-full object-cover">
                                    <img src="https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg" alt="" />
                                </div>
                                <div className="flex px-5 flex-col justify-center">
                                <h1 className="text-2xl font-bold">Hoster By : {details?.user?.profile?.fullName}</h1>
                                <h2> Joined in November {details?.user?.profile?.createdAt}</h2>
                                </div>
                            </div>
                            <div className="border border-gray-200 w-full"></div>
                            <div className="py-5">
                                <h1 className="font-semibold pb-2">Description</h1>
                                <div dangerouslySetInnerHTML={{ __html: details?.user?.profile?.description }}></div>
                            </div>                           
                        </div>
                        <div className="flex sm:w-1/3 flex-col">
                            <div className="mb-6">
                                <h1 className="font-semibold text-xl mb-4">Euro Villa Hoa Xuan Da Nang</h1>
                                <h2>Start Date: {moment(location?.state?.startDate).format('DD/MM/YYYY')}</h2>
                                <h2>End Date: {moment(location?.state?.endDate).format('DD/MM/YYYY')}</h2>
                                <h2>Total Price: {location?.state?.totalPrice} $</h2>
                            </div>
                            <PayPalScriptProvider
                  options={{
                    clientId: "AVUFZ--HoO4trdrJGthrRsviaWOTpJBKuFzvGGP2I8lxw9JpgpFTdGou-2Ou7sO3177PY4u-zx33LdiC",
                  }}
                >
                  <PayPalButtons
                    createOrder={handleCreateOrder}
                    onApprove={handleOnApprove}
                  />
                </PayPalScriptProvider>
                        </div>
                    </div>

                    <div className="border border-gray-200 w-full"></div>

                    <div className="py-8 px-5">
                        <h1 className="text-xl font-semibold py-4">Things to now</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-3">
                            <div className="flex flex-col">
                                <h1 className="font-semibold text-lg">House rule</h1>
                                <h1>Check in</h1>
                                <h1>Check out</h1>
                                <h1>4 guest maximum</h1>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="font-semibold text-lg">Safety & property</h1>
                                <h1>Nearby lake, river, other body of water</h1>
                                <h1>Carbon monoxide alarm</h1>
                                <h1>Smoke alarm</h1>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="font-semibold text-lg">Cancellation policy</h1>
                                <h1>This reservation is non-refundable.</h1>
                                <h1>Review the Host’s full cancellation policy which applies even if you cancel for illness or disruptions caused by COVID-19.</h1>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Details;
