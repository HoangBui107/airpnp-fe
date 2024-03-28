import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";

import CustomMarker from "./CustomMarket";

  
  const Map = ({ data, location, zoomLevel }) => {
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  // useEffect(()=>{
  //   if(!selectedPlaceId ){
  //       return;
  //   }
  //   const index = data.findIndex(hotel => hotel.id === selectedPlaceId);
  //   flatlist.current.scrollToIndex({index})

  //   const selectedPlace = data[index];
  //   const region = {
  //     latitude: selectedPlace.latitude,
  //     longitude: selectedPlace.longitude,
  //     latitudeDelta: 0.2,
  //     longitudeDelta: 0.03,
  //   }
  //   data.current.animateToRegion(region);
  // },[selectedPlaceId])
  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAP_KEY,
        }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
        {/* <LocationPin
          lat={location?.lat}
          lng={location?.lng}
          text={location?.address}
        /> */}
         <CustomMarker
                latitude={data?.latitude}
                longitude={data?.latitude}
                price={parseInt('300$')}
                isSelected={data?.id===selectedPlaceId}
                onPress={() => setSelectedPlaceId(data?.id)}
                // key={hotel?.id.toString()}
              />
      </GoogleMapReact>
    </>
  );
};

export default Map;