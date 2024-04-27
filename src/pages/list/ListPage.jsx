import { Suspense, lazy, useEffect, useState } from "react";
import Map, { GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Header from "../../layout/header/Header";
import './CustomMarket.scss'
import CustomMarker from "../../components/common/CustomMarket";
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms } from "../../redux/room/roomThunks";
import SpinLoading from "../../components/spin/Spin";
const ListingItem = lazy(() => import('../../components/list/ListingItem'));

const ListPage = () => {
    const dispatch = useDispatch()
    const [favorite, setFavorite] = useState(false)
    const [selectedPlaceId, setSelectedPlaceId] = useState(null);
    const favoriteButton = () => {
        setFavorite(!favorite)
    }
    const { room, loading } = useSelector((state) => state.room)
    useEffect(() => {
        dispatch(getAllRooms())
    }, [])

    return (
        <>
            <div className="relative h-24 z-10 ">
                <Header />
            </div>
            {!loading && room.length > 0 ?
                (
                    <>
                        <div className="flex gap-6 h-auto ">
                            <div className=" pt-3 w-1/2 pl-10 grid grid-cols-3   gap-8">
                                <Suspense fallback={<div>Loading...</div>}>
                                    {room?.map((item) => {
                                        return (
                                            <ListingItem key={item?.id} data={item} isFavorite={favorite} btn={() => { favoriteButton() }} />
                                        )
                                    })}
                                </Suspense>
                            </div>
                            <div className="relative w-1/2 h-[80vh]">
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

export default ListPage;