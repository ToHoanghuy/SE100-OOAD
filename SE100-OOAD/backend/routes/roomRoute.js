const {Router} = require('express')
const roomController = require('../controllers/roomController')
const uploadMiddleware = require('../middleware/cloudinaryMiddleware')
const upload = uploadMiddleware('travel-social')

const router = Router()

router.get('/room/getall', roomController.getAllRoom);
router.get('/room/getbyid/:roomId', roomController.getRoomById);
router.get('/room/getbylocationid/:locationId', roomController.getRoomByLocationId);
router.post('/room/newroom', upload.array('file', 10) ,roomController.createRoom);
router.put('/room/update/:roomId', roomController.updateRoom);
router.delete('/room/delete/:roomId', roomController.deteleRoom);

module.exports = router