import BarChartBox from "../../../components/chart/BarChartBox";
import BigChartBox from "../../../components/chart/BigChartBox";
import ChartBox from "../../../components/chart/ChartBox";
import TopBox from "../../../components/topBox/TopBox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllStore, getAllUser, getTopDeals } from "../../../redux/auth/authThunks";
import { getCountByMonth, getOrderByAdmin } from "../../../redux/order/orderThunk";
import { getAllRooms } from "../../../redux/room/roomThunks";
import { getAllCategory } from "../../../redux/category/categoryThunk";
const Dashboard = () =>{
    const dispatch = useDispatch()
    const {data, store, topDeals} = useSelector((state) => state.auth)
    const rooms = useSelector((state) => state.room.room)
    const orders = useSelector((state) => state.order.data)
    const countByMonth = useSelector((state) => state.order.countByMonth)
    const categories = useSelector((state) => state.category.categories)

    useEffect(()=>{
        dispatch(getAllUser())
        dispatch(getAllStore())
        dispatch(getAllRooms({categoryId: ''}))
        dispatch(getOrderByAdmin())
        dispatch(getTopDeals())
        dispatch(getCountByMonth())
        dispatch(getAllCategory())
    },[])
    return(
        <>
        <div className="w-full py-2 px-5 bg-[#222b3c] h-full overflow-y-auto  ">
                        <div className="grid grid-cols-1 mg:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                            <div className="  grid grid-col-1 grid-row-2 gap-4 col-start-1 " >
                                <div className="p-5 rounded-10 border-2 border-solid border-[#384256]">
                                    <TopBox  data={topDeals}/>
                                </div>
                                <div className="p-5 rounded-10 border-2 border-solid border-[#384256]">
                                    <BarChartBox {...categories} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-5 col-span-1 lg:col-span-2 ">
                                <div className="grid xl:grid-cols-2 grid-row-2 gap-4" >
                                    <div className="p-5 rounded-10 border-2 border-solid border-[#384256] "  >
                                        <ChartBox props={chartBoxUser}  data={{title: "Total User" , number: data?.length}}/>
                                    </div>
                                    <div className="p-5 rounded-10 border-2 border-solid border-[#384256]" >
                                        <ChartBox props={chartBoxUser}  data={{title: "Total Owner" , number: store?.length}}/>
                                    </div>
                                    <div className="p-5 rounded-10 border-2 border-solid border-[#384256]" >
                                        <ChartBox props={chartBoxUser} data={{title: "Total Order" , number: orders?.length}}/>
                                    </div>
                                    <div className="p-5 rounded-10 border-2 border-solid border-[#384256]" >
                                        <ChartBox props={chartBoxUser} data={{title: "Total Room" , number: rooms?.length}}/>
                                    </div>
                                </div>
                                <div className="p-5 rounded-10 border-2 border-solid border-[#384256]">
                                    <BigChartBox data={countByMonth}/>
                                </div>
                            </div>
                        </div>
                    </div>
        </>
    )
}

export default Dashboard;

export const chartBoxUser = {
    color: "#8884d8",
    icon: "/userIcon.svg",
    title: "Total Users",
    number: "11.238",
    dataKey: "users",
    percentage: 45,
    chartData: [
      { name: "Sun", users: 400 },
      { name: "Mon", users: 600 },
      { name: "Tue", users: 500 },
      { name: "Wed", users: 700 },
      { name: "Thu", users: 400 },
      { name: "Fri", users: 500 },
      { name: "Sat", users: 450 },
    ],
  };
  