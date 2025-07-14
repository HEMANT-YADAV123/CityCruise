const rideService = require('../services/rideService');
const {validationResult} = require('express-validator');
const mapsService = require('../services/mapsService')
const { sendMessageToSocketId}  = require('../socket');
const rideModel = require('../models/rideModel');

module.exports.createRide = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }
    const {userId,pickup,destination,vehicleType} = req.body;
    try {
        const ride = await rideService.createRide({user:req.user._id,pickup,destination,vehicleType});
        res.status(201).json(ride);

        const pickupCoordinates = await mapsService.getAddressCoordinates(pickup);
        console.log(pickupCoordinates);

        const captainsInRadius = await mapsService.getCaptainsInTheRadius(pickupCoordinates.ltd,pickupCoordinates.lng,3);//three things lat,lng and radius(2km);
        ride.otp = "";

        // Filter captains based on status (active) and vehicle type
        const availableCaptains = captainsInRadius.filter(captain => {
            return captain.status === 'active' && captain.vehicle.vehicleType === vehicleType;
        });
        console.log(`Found ${availableCaptains.length} available captains for ${vehicleType} vehicle type`);

        // Only send ride requests to available captains
        if (availableCaptains.length > 0) {
            ride.otp = "";
            const rideWithUser = await rideModel.findOne({_id: ride._id}).populate('user');

            availableCaptains.map(captain => {
                console.log(`Sending ride request to captain: ${captain._id}, socketId: ${captain.socketId}`);
                sendMessageToSocketId(captain.socketId,{
                    event: 'new-ride',
                    data: rideWithUser
                });
            });
        } else {
            console.log(`No available captains found for ${vehicleType} vehicle type`);
            // Optionally, you can emit an event to the user that no captains are available
            // sendMessageToSocketId(req.user.socketId, {
            //     event: 'no-captains-available',
            //     data: { message: 'No captains available for your vehicle type' }
            // });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message});
        
    }
}

module.exports.getFare = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;
    if (!pickup || !destination) { 
        return res.status(400).json({ message: 'Pickup and destination are required' }); 
    }

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports.confirmRide = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    const {rideId} = req.body;
    try {
        const ride = await rideService.confirmRide({ rideId ,captain: req.captain });

        sendMessageToSocketId(ride.user.socketId,{
            event: 'ride-confirmed',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports.startRide = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    const {rideId,otp} = req.query;

    try {
        const ride = await rideService.startRide({rideId, otp, captain: req.captain });
        sendMessageToSocketId(ride.user.socketId,{
            event: 'ride-started',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.endRide = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    const {rideId} = req.body;
    try {
        const ride = await rideService.endRide({rideId, captain: req.captain});

        sendMessageToSocketId(ride.user.socketId,{
            event: 'ride-ended',
            data: ride
        })

        return res.status(200).json({ride});
    } catch (error) {
        return res.status(500).json({message: error.message });
    }
}