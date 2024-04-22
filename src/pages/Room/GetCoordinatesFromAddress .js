import axios from "axios";

const getCoordinatesFromAddress = async (address, city, country) => {
    try {
        const accessToken = 'pk.eyJ1IjoiaG9hbmdidWkiLCJhIjoiY2x1cG9xN2FoMjQ4cDJqbjIyZ2M0YWxmdiJ9.Ns8PaFWgIggbP5Kyw30T5w';
        let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}%20${encodeURIComponent(city)}${country ? ',' + encodeURIComponent(country) : ''}.json`;
        url += `?access_token=${accessToken}`;

        const response = await axios.get(url);

        return response.data.features;
    } catch (error) {
        console.error("There was an error while fetching places:", error);
    }
};

export default getCoordinatesFromAddress;
