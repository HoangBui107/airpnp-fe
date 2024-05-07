import { Suspense, lazy, useEffect, useState } from "react";
import Map, { GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import HeaderCategories from "../../layout/header/HeaderCategories";
import './CustomMarket.scss'
import CustomMarker from "../../components/common/CustomMarketMap";
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms } from "../../redux/room/roomThunks";
import SpinLoading from "../../components/spin/Spin";
const RoomItem = lazy(() => import('../../components/list/RoomItem'));

const ListSearchMap = () => {
    const dispatch = useDispatch()
    const [favorite, setFavorite] = useState(false)
    const [selectedPlaceId, setSelectedPlaceId] = useState(null);
    const favoriteButton = () => {
        setFavorite(!favorite)
    }
    useEffect(() => {
        dispatch(getAllRooms())
    }, [])
    const { room, loading } = useSelector((state) => state.room)
    
    return (
        <>
            <div className="relative h-24 z-10 ">
                <HeaderCategories />
            </div>
            {!loading && room.length > 0 ?
                (
                    <>
                        <div className="lg:flex gap-6 h-auto grid grid-col-1 md:grid-cols-2 px-10 md:pl-10 md:pr-0   ">
                            <div className="mt-5 lg:pt-3 w-full lg:w-1/2  grid grid-col-1 md:grid-col-2 lg:grid-cols-3  lg:ml-0   gap-8">
                                <Suspense fallback={<div>Loading...</div>}>
                                    {room?.map((item) => {
                                        return (
                                            <RoomItem key={item?.id} data={item} isFavorite={favorite} btn={() => { favoriteButton() }} />
                                        )
                                    })}
                                </Suspense>
                            </div>
                            <div className="hidden lg:block lg:relative w-full lg:w-1/2 h-[80vh]">
                                <div className="fixed w-full h-[80vh]">
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <Map
                                            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                                            initialViewState={{
                                                longitude: room?.[0]?.longitude,
                                                latitude: room?.[0]?.latitude,
                                                zoom: 13,
                                            }}
                                            mapStyle="mapbox://styles/mapbox/streets-v11"
                                        >
                                                {room?.map((item) => (
                                                    <CustomMarker
                                                        key={item.id}
                                                        latitude={item?.latitude}
                                                        longitude={item?.longitude}
                                                        data={item}
                                                        isSelected={item.id === selectedPlaceId}
                                                        onPress={(e) => setSelectedPlaceId(e)}
                                                    />

                                                ))}
                                            <GeolocateControl
                                                positionOptions={{ enableHighAccuracy: true }}
                                                trackUserLocation={true}
                                            />
                                        </Map>
                                        : ""
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                    </>
                )
                : (
                    <>
                        <SpinLoading />
                    </>
                )
            }
        </>
    )
}

export default ListSearchMap;