const axios = require('axios')

module.exports.getAddressCoordinates = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`

    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK')
        {
            const location = response.data.results[ 0 ].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        }
        else 
        {
            throw new Error('Unable to fetch coordinates');
        }
        } catch (error) {
            console.error(error);
            throw error;
        }
}