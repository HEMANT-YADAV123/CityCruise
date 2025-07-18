const rideModel = require('../models/rideModel');
const mapsService = require('../services/mapsService');
const crypto = require('crypto');
const { sendMessageToSocketId } = require('../socket');

async function getFare(pickup,destination){
    if(!pickup || !destination)
    {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapsService.getDistanceTime(pickup,destination);//it will return us the distance and the take between these 2 endpoints.

    const baseFare = {
        auto: 15,
        car: 25,
        moto: 9
    };

    const perKmRate = {
        auto: 8,
        car: 12,
        moto: 6
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
    };

    return fare;
    
}
module.exports.getFare = getFare;

function getOtp(num) {
    const otp = crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString();
    return otp;
}

module.exports.createRide = async ({ user, pickup, destination, vehicleType}) => {

    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);

    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[ vehicleType ]
    })

    return ride;
}


module.exports.confirmRide = async ({
    rideId, captain
}) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;

}

module.exports.startRide = async ({rideId,otp,captain}) => {
    if(!rideId || !otp)
    {
        throw new Error('Ride and otp both are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if(!ride)
    {
        throw new Error('ride not found');
    }

    if(ride.otp !== otp)
    {
        throw new Error('Invalid OTP')
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    },{
        status: 'ongoing'
    })

    sendMessageToSocketId(ride.user.socketId,{
        event: 'ride-started',
        data: ride
    })

    return ride;
}

module.exports.getActiveRide = async (userId) => {
    if (!userId) {
        throw new Error('User ID is required');
    }

    const activeRide = await rideModel.findOne({
        user: userId,
        status: { $in: ['accepted', 'ongoing'] }
    }).populate('user').populate('captain');

    return activeRide;
};

module.exports.endRide = async ({rideId,captain}) => {
    if(!rideId)
    {
        throw new Error('rideId is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if(!ride)
    {
        throw new Error('Ride not found');
    }

    if(ride.status !== 'ongoing')
    {
        throw new Error('Ride not ongoing')
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    },{
        status: 'completed'
    })

    return ride;
}