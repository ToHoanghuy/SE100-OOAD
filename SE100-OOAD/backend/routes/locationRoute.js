const {Router} = require('express');
const locationController = require('../controllers/locationController');
const {checkLocationOwner} = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/cloudinaryMiddleware')
const upload = uploadMiddleware('travel-social')
const router = Router();
//create
//router.post('/createlocation', checkLocationOwner, locationController.createNewLocation);
//create with image
router.post('/createlocation', checkLocationOwner, upload.array('file', 20),locationController.createLocation);
//read
router.get('/alllocation', locationController.getAllLocation);
router.get('/locationbycategory/:categoryId', locationController.getLocationByCategory);

router.get('/locationbyuserid/:userId', locationController.getLocationByUserId);
router.get('/locationbyname', locationController.getLocationByName);
router.get('/search', locationController.searchLocationsAndRooms);

router.get('/locationbyid/:locationId', locationController.getLocationById);
//update
router.put('/updatelocation/:locationId', checkLocationOwner, locationController.updateLocation);
router.patch('/location/:locationId', locationController.changeStatusLocation);
//delete
router.delete('/detelelocation/:locationId', checkLocationOwner, locationController.deleteLocation);

module.exports = router;