import React from "react";

const CustomMarker = (props) => {
    const {
        latitude,
        longitude, 
        price,
        onPress,
        isSelected,
    } = props;

    return (
        <div onClick={onPress} style={{
            position: "absolute",
            left: longitude,
            top: latitude,   
            backgroundColor: isSelected ? "black" : "white",
            padding: 5,
            borderRadius: 10,
            borderColor: "grey",
            borderWidth: 1,
            transform: "translate(-50%, -50%)", // Center the marker
            }}>
            <span style={{
                color: isSelected ? "white" : "black",
                fontWeight: "bold"
            }}>
                {price}$
            </span>
        </div>
    );
};

export default CustomMarker;
