import React from "react";
import { Marker, Popup } from "react-map-gl";

const CustomMarker = (props) => {
    const {
        latitude,
        longitude,
        data,
        onPress,
        isSelected,
    } = props;

    return (
        <>
            <Marker latitude={latitude} longitude={longitude} >
                <button className={`bg-${isSelected ? "black" : "white"} text-${isSelected ? "white" : "black"} px-2 py-1 rounded-xl border border-gray-400 `}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onPress(data.id);
                    }}>
                    {data.price}$
                </button>
            </Marker>
            {
                isSelected ?
                    (
                        <Popup 
                        onClose={()=>{
                            onPress('');
                        }} 
                        className="mb-4 " latitude={latitude} longitude={longitude}>
                            <div class="max-w-sm rounded overflow-hidden shadow-lg">
                                <img class="w-full" src={data?.roomImages?.[0]?.url} alt="Sunset in the mountains" />
                                <div class="px-6 py-4">
                                    <div class="font-bold text-xl mb-2">{data?.name}</div>
                                    <p class="text-gray-700 text-base mb-2">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                                    </p>
                                    <h1 className=" text-xl font-semibold">
                                        {data.price} /$
                                    </h1>
                                </div>
                                <div class="px-6 pt-4 pb-2">
                                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                                </div>
                            </div>
                        </Popup>

                    )
                    : null
            }
        </>
    );
};

export default CustomMarker;
