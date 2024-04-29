import ChartBox from "../../../components/chart/ChartBox";
import TopBox from "../../../components/topBox/TopBox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllStore, getAllUser, getTopDeals } from "../../../redux/auth/authThunks";
import { getCountByMonth, getOrderByAdmin } from "../../../redux/order/orderThunk";
import { getAllRooms } from "../../../redux/room/roomThunks";
import { getAllCategory, getAllCategoryForAdmin } from "../../../redux/category/categoryThunk";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const dispatch = useDispatch()
    const { data, store, topDeals } = useSelector((state) => state.auth)
    const rooms = useSelector((state) => state.room.room)
    const orders = useSelector((state) => state.order.data)
    const countByMonth = useSelector((state) => state.order.countByMonth)
    const categoriesChart = useSelector((state) => state.category.categoriesChart)

    useEffect(() => {
        dispatch(getAllUser())
        dispatch(getAllStore())
        dispatch(getAllRooms({ categoryId: '' }))
        dispatch(getOrderByAdmin())
        dispatch(getTopDeals())
        dispatch(getCountByMonth())
        dispatch(getAllCategoryForAdmin())
        dispatch(getAllCategory())
    }, [])
    return (
        <>
            <div className="w-full py-2 px-5 bg-[#222b3c] h-full overflow-y-auto  ">
                <div className="grid grid-cols-1 mg:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                    <div className="  grid grid-col-1 grid-row-2 gap-4 col-span-2 " >
                        <div className="p-5 rounded-10 border-2 border-solid border-[#384256]">
                            <TopBox data={topDeals} />
                        </div>
                        <div className="p-5 rounded-10 border-2 border-solid border-[#384256]">
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={categoriesChart}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
                                    <Legend />
                                    <Bar dataKey="quantityRoom" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>

                            <h1 className="text-center mt-4">Quantity Room Per Category</h1>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 col-span-1 lg:col-span-2 ">
                        <div className="grid xl:grid-cols-2 grid-row-2 gap-4" >
                            <div className="p-5 rounded-10 border-2 border-solid border-[#384256] "  >
                                
                                <ChartBox props={chartBoxUser} data={{ title: "Total User", number: data?.length }} />
                            </div>
                            <div className="p-5 rounded-10 border-2 border-solid border-[#384256]" >
                                <ChartBox props={chartBoxUser} data={{ title: "Total Owner", number: store?.length }} />
                            </div>
                            <div className="p-5 rounded-10 border-2 border-solid border-[#384256]" >
                                <ChartBox props={chartBoxUser} data={{ title: "Total Order", number: orders?.length }} />
                            </div>
                            <div className="p-5 rounded-10 border-2 border-solid border-[#384256]" >
                                <ChartBox props={chartBoxUser} data={{ title: "Total Room", number: rooms?.length }} />
                            </div>
                        </div>
                        <div className="p-5 rounded-10 border-2 border-solid border-[#384256]">
                            <div className="w-full h-full ">
                                <h1 className="text-lg sm:text-xl md:text-2xl mb-5 font-semibold" style={{ color: 'white' }}>{countByMonth.title}</h1>
                                <div className="chart">
                                    <ResponsiveContainer width="99%" height={150}>
                                        <BarChart data={countByMonth}>
                                            <Tooltip
                                                contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
                                                labelStyle={{ display: "none" }}
                                                cursor={{ fill: "none" }}
                                            />
                                            <Bar dataKey={countByMonth.dataKey} fill={countByMonth.color} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            {/* <BigChartBox data={countByMonth} /> */}
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
