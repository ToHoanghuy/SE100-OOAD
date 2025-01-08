const Room = require('../models/Room')
const roomSvc = require('../services/roomSvc')
const cloudinary = require('../config/cloudinaryConfig')

module.exports.getAllRoom = async (req, res, next) => {
    try {
        const rooms = await roomSvc.getAllRoom()
        res.status(201).json({
            isSuccess: true,
            data: rooms,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports.getRoomById = async (req, res, next) => {
    const roomId = req.params.roomId
    try{
        const rooms = await roomSvc.getRoomById(roomId)
        res.status(201).json({
            isSuccess: true,
            data: rooms,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports.getRoomByLocationId = async(req, res, next) => {
    const {locationId} = req.params
    try{
        const rooms = await roomSvc.getRoomByLocationId(locationId)
        res.status(201).json({
            isSuccess: true,
            data: rooms,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}

//CREATE: cân nhắc hỗ trợ import thông tin từ file excel
module.exports.createRoom = async (req, res, next) => {
    const {
        locationId,
        name,
        quantity,
        capacity,
        area,
        pricePerNight,
        description,
        facility,
        bed,
    } = req.body
    const images = req.files.map((file) => ({
        url: file.path,
        publicId: file.filename
    }))
    const facilityParsered = JSON.parse(facility)
    const bedParsered = JSON.parse(bed)
    console.log(facilityParsered, bedParsered)
    try{
        const roomData =  new Room({
            locationId,
            name,
            quantity,
            capacity,
            area,
            pricePerNight,
            description,
            facility: facilityParsered,
            bed: bedParsered,
            image: images, 
        })
        const savedRoom = await roomSvc.createRoom(roomData)
        res.status(201).json({
            isSuccess: true,
            data: savedRoom,
            error: null
        })
    }
    catch (error) {
       req.files.map(async file => {
            try {
                await cloudinary.uploader.destroy(file.filename);
                console.log(`Deleted: ${file.filename}`);
                res.status(404).json({
                isSuccess: true,
                data: 'upload fail',
                error: null,
            });
            } catch (err) {
                next(err)
            }
        })
        next(error)
    }
}
module.exports.updateRoom = async (req, res, next) => {
    const {roomId} = req.params
    const roomData = req.body
    try {
        const result = await roomSvc.updateRoom(roomId, roomData)
        res.status(201).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}
module.exports.deteleRoom = async (req, res, next) => {
    const {roomId} = req.params
    try{
        const result = await roomSvc.deteleRoom(roomId)
        res.status(201).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}