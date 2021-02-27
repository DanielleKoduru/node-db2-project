const router = require('express').Router()
const cars = require("./cars-model")

const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require("../cars/cars-middleware")

// #1`[GET] /api/cars` returns an array of cars sorted by id (or an empty array if there aren't any).
router.get('/', async (req, res, next) => {
    
}

//#2 `[GET] /api/cars/:id` returns a car by the given id.
router.get('/', async (req, res, next) => {

}

//3 `[POST] /api/cars` returns the created car. Leading or trailing whitespace on budget `name` should be trimmed before saving to db.
router.post('/id', async (req, res, next) => {

}

module.exports = router;