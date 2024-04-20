import { Suspense, lazy, useEffect, useState } from "react";
import Map, { GeolocateControl} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Header from "../../layout/header/Header";
import './CustomMarket.scss'
import CustomMarker from "../../components/common/CustomMarket";
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms } from "../../redux/room/roomThunks";

const ListingItem = lazy(() => import('../../components/list/ListingItem'));
const ListPage = () => {
    const dispatch = useDispatch()
    const [favorite, setFavorite] = useState(false)
    const [selectedPlaceId, setSelectedPlaceId] = useState(null);
    const favoriteButton = () => {
        setFavorite(!favorite)
    }
    const { room } = useSelector((state) => state.room)
    useEffect(()=>{
        dispatch(getAllRooms())
    },[])
    const hotel = [
        {
            id: 1,
            name: 'khach san 1',
            url: 'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2xpZGV8ZW58MHx8MHx8fDA%3D',
            country: 'Da nang',
            city: 'Viet Nam',
            category: 'Beach',
            price: '200',
            latitude: 16.042834,
            longitude: 108.169094
        },
        {
            id: 2,
            name: 'khach san 1',
            url: 'https://media.istockphoto.com/id/472899538/photo/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab.jpg?s=612x612&w=0&k=20&c=rz-WSe_6gKfkID6EL9yxCdN_UIMkXUBsr67884j-X9o=',
            country: 'My tho',
            city: 'Viet Nam',
            category: 'Nui',
            price: '500',
            latitude: 16.036001,
            longitude: 108.179362
        },
        {
            id: 3,
            name: 'khach san 1',
            url: 'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2xpZGV8ZW58MHx8MHx8fDA%3D',
            country: 'My tho',
            city: 'Viet Nam',
            category: 'Nui',
            price: '500',
            latitude: 16.036001,
            longitude: 108.179362
        },
        {
            id: 4,
            name: 'khach san 1',
            url: 'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2xpZGV8ZW58MHx8MHx8fDA%3D',
            country: 'My tho',
            city: 'Viet Nam',
            category: 'Nui',
            price: '500',
            latitude: 16.036001,
            longitude: 108.179362
        },
        {
            id: 5,
            name: 'khach san 1',
            url: 'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2xpZGV8ZW58MHx8MHx8fDA%3D',
            country: 'My tho',
            city: 'Viet Nam',
            category: 'Nui',
            price: '500',
            latitude: 16.036001,
            longitude: 108.179362
        }



    ]

    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    };


    const [center, setCenter] = useState({
        lat: 16.042834,
        lng: 108.169094,
    });

    const state = {
        viewport: {
            width: "100vw",
            height: "100vh",
            latitude: 21.0244246,
            longitude: 105.7938072,
            zoom: 16
        }
    };

    return (
        <>
            <div className="pb-24 sm:pb-24 ">
                <Header />
            </div>
            <div className="flex gap-6 h-auto ">
                <div className=" pt-3 w-1/2 pl-10 grid grid-cols-2   gap-8">
                <Suspense fallback={<div>Loading...</div>}>
                    {room?.map((item) => {
                        return (
                            <ListingItem key={item?.id} data={item} isFavorite={favorite} btn={() => { favoriteButton() }} />
                        )
                    })}
                </Suspense>
                </div>
                <div className="w-1/2 h-[90vh] sticky top-24 ">
                <Suspense fallback={<div>Loading...</div>}>
             
          
                        <Map
                            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                            initialViewState={{
                                longitude: 108.169094,
                                latitude: 16.042834,
                                zoom: 13,
                            }}
                            mapStyle="mapbox://styles/mapbox/streets-v11"
                        >
                            {hotel?.map((item) => (
                                <CustomMarker
                                    key={item.id}
                                    latitude={item.latitude}
                                    longitude={item.longitude}
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
        </>
    )
}

export default ListPage;