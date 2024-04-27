import {
    barChartBoxRevenue,
    barChartBoxVisit,
    chartBoxUser,
} from "../../../data";
import BarChartBox from "../../../components/chart/BarChartBox";
import BigChartBox from "../../../components/chart/BigChartBox";
import ChartBox from "../../../components/chart/ChartBox";
import PieChartBox from "../../../components/chart/PieChartBox";
import TopBox from "../../../components/topBox/TopBox";
const Dashboard = () =>{

    return(
        <>
        <div className="w-full py-2 px-5 bg-[#222b3c] h-full overflow-y-auto  ">
                        <div className="grid grid-cols-1 mg:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            <div className="  grid grid-col-1 grid-row-2 gap-4 col-start-1 " >
                                <div className="p-5 rounded-10 border-2 border-solid border-[#384256]">
                                    <TopBox />
                                </div>
                                <div className="p-5 rounded-10 border-2 border-solid border-[#384256]">
                                    <BarChartBox {...barChartBoxVisit} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-5 col-span-1 lg:col-span-2 ">
                                <div className="grid xl:grid-cols-2 grid-row-2 gap-4" >
                                    <div className="p-5 rounded-10 border-2 border-solid border-[#384256] "  >
                                        <ChartBox {...chartBoxUser} />
                                    </div>
                                    <div className="p-5 rounded-10 border-2 border-solid border-[#384256]" >
                                        <ChartBox {...chartBoxUser} />
                                    </div>
                                    <div className="p-5 rounded-10 border-2 border-solid border-[#384256]" >
                                        <ChartBox {...chartBoxUser} />
                                    </div>
                                    <div className="p-5 rounded-10 border-2 border-solid border-[#384256]" >
                                        <ChartBox {...chartBoxUser} />
                                    </div>
                                </div>
                                <div className="p-5 rounded-10 border-2 border-solid border-[#384256]">
                                    <BigChartBox />
                                </div>
                            </div>
                            <div className="  grid grid-col-1 grid-row-2 gap-4 col-span-1  " >
                                <div className="xl:p-5 rounded-10 border-2 border-solid border-[#384256]">
                                    <PieChartBox />
                                </div>
                                <div className="p-5 rounded-10 border-2 border-solid border-[#384256]">
                                    <BarChartBox {...barChartBoxRevenue} />
                                </div>
                            </div>

                        </div>
                    </div>
        </>
    )
}

export default Dashboard;