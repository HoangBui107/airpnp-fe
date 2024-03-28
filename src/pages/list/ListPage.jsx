import { useEffect, useState } from "react";
import Map from "../../components/Map";
import ListingItem from "../../components/listingitem/ListingItem";
import GoogleMapReact from "google-map-react";
import CustomMarker from "../../components/CustomMarket";

const ListPage = () => {
    const [favorite, setFavorite] = useState(false)
    const [selectedPlaceId, setSelectedPlaceId] = useState(null);
    const favoriteButton = () => {
        setFavorite(!favorite)
    }

    const [shouldRenderMap, setShouldRenderMap] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShouldRenderMap(true); // Kích hoạt hiển thị bản đồ sau 3 giây
        }, 3000);

        return () => clearTimeout(timer); // Xóa hẹn giờ khi component unmount
    }, []);
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
            url: 'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2xpZGV8ZW58MHx8MHx8fDA%3D',
            country: 'My tho',
            city: 'Viet Nam',
            category: 'Nui',
            price: '500',
            latitude: 16.036001,
            longitude: 108.179362
        },



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
    return (
        <>
            <div className="flex gap-6">
                <div className=" pt-3 h-screen w-1/2 pl-10 grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-8">
                    {hotel?.map((item) => {
                        return (
                            <ListingItem key={item?.id} data={item} isFavorite={favorite} btn={() => { favoriteButton() }} />
                        )
                    })}
                </div>
                <div className="w-1/2 h-[80vh] relative">
                    {/* {shouldRenderMap ? (
                      
                        <GoogleMapReact
                            bootstrapURLKeys={{
                                key: process.env.REACT_APP_GOOGLE_MAP_KEY,
                            }}
                            defaultCenter={center}
                            defaultZoom={defaultProps.zoom}
                    
                        >

                            {hotel?.map((item) => {
                                return (
                                    <CustomMarker
                                        latitude={item?.latitude}
                                        longitude={item?.latitude}
                                        price={parseInt('300$')}
                                        isSelected={item?.id === selectedPlaceId}
                                        onPress={() => setSelectedPlaceId(item?.id)}
                                    key={item?.id}
                                    />

                                )
                            })}
                        </GoogleMapReact>

                    ) : (
                        ""
                    )} */}
                </div>
            </div>
        </>
    )
}

export default ListPage;