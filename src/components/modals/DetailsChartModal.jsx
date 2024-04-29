import { useDispatch, useSelector } from "react-redux";
import { closeDetails, closeDetailsChart, openDetails, openDetailsChart } from "../../redux/modal/modalSlice";
import { Button, Modal } from 'antd';
import { useEffect } from "react";
import { getRoomById } from "../../redux/room/roomThunks";
import PieChartBox from "../chart/PieChartBox";
import BarChartBox from "../chart/BarChartBox";
import { barChartBoxRevenue } from "../../data";

const DetailsChartModal = ({ id }) => {
    const dispatch = useDispatch()
    const { isLoading } = useSelector((state) => state.auth)
    const open = useSelector((state) => state.modal.detailsChart)

    const onClose = () => {
        dispatch(closeDetailsChart())
    }
    const { details } = useSelector((state) => state.room)
    const onOpen = () => {
        dispatch(openDetailsChart())
    }

    // useEffect(()=>{
    //     dispatch(getRoomById({id:id}))
    // },[id])



    return (
        <>
            <Modal
                title={details?.name}
                centered
                open={open}
                onCancel={() => onClose()}
                width={1000}
                footer={null}
            >
                <>
                    <div className="flex flex-col px-4 max-h-[70vh] overflow-hidden overflow-y-auto">
                        <div className="flex w-full justify-center py-4 ">
                            <h1 className="text-3xl font-bold ">Chart </h1>

                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col border border-gray-200 shadow-sm justify-center rounded-xl ">
                                <PieChartBox />
                            </div>
                            <div className="grid grid-col-1 gap-4">
                                <div className="flex flex-col border border-gray-200 shadow-sm justify-center rounded-xl ">  '
                                    <BarChartBox {...barChartBoxRevenue} />
                              
                                </div>
                                <div className="flex flex-col border border-gray-200 shadow-sm justify-center rounded-xl ">   
                                    <BarChartBox {...barChartBoxRevenue} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </Modal>
        </>
    );
};

export default DetailsChartModal;