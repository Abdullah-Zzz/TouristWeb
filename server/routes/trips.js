const {tripsRequest, tripInfo, booked, packages, toursInProvince, CustomPackageData, CustomPackageReservation} = require("../controllers/tripsController")
const express=require('express')
const router =express.Router()


router.get('/trips', tripsRequest)

router.get('/trips/:productId', toursInProvince)

router.get('/booking/:productId', packages)

router.get("/booking/:productId/:packageId", tripInfo)

router.post('/booked', booked)

router.get('/customized', CustomPackageData)

router.post('/customized/order', CustomPackageReservation)

module.exports = router;