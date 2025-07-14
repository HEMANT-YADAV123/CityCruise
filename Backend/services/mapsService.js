const axios = require('axios')
const captainModel = require('../models/captainModel');

module.exports.getAddressCoordinates = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`

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

module.exports.getDistanceTime = async (origin,destination) => {
    if(!origin || !destination)
    {
        throw new Error('Origin and Distance both are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response =await axios.get(url);
        if(response.data.status === 'OK')
        {
            if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }
            return response.data.rows[ 0 ].elements[ 0 ];
        }
        else
        {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getAutoCompleteSuggestions = async (input) => {
    if(!input)
    {
        throw new Error('Input is Required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (error) {
        console.error(error);
        throw error        
    }

}

module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {
    try {
        console.log(`Searching for captains near: lat=${lat}, lng=${lng}, radius=${radius}km`);
        
        // Calculate bounding box for the search area
        const latDelta = radius / 111; // 1 degree lat ≈ 111 km
        const lngDelta = radius / (111 * Math.cos(lat * Math.PI / 180)); // Adjust for latitude
        
        const captains = await captainModel.find({
            'location.ltd': {
                $gte: lat - latDelta,
                $lte: lat + latDelta
            },
            'location.lng': {
                $gte: lng - lngDelta,
                $lte: lng + lngDelta
            }
        }).select('_id socketId status vehicle location fullname');

        console.log(`Found ${captains.length} captains in bounding box`);
        
        // Filter results by exact distance using Haversine formula
        const captainsInRadius = captains.filter(captain => {
            if (!captain.location || !captain.location.ltd || !captain.location.lng) {
                console.log(`Captain ${captain._id} has invalid location data`);
                return false;
            }
            
            const distance = calculateDistance(lat, lng, captain.location.ltd, captain.location.lng);
            console.log(`Captain ${captain._id} is ${distance.toFixed(2)}km away`);
            return distance <= radius;
        });

        console.log(`Found ${captainsInRadius.length} captains within ${radius}km radius`);
        return captainsInRadius;
    } catch (error) {
        console.error('Error finding captains in radius:', error);
        throw error;
    }
};

// Helper function to calculate distance between two points (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}