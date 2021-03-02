const router = require('express').Router()
const cars = require("./cars-model")
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require("./cars-middleware")

// #1`[GET] /api/cars` returns an array of cars sorted by id (or an empty array if there aren't any).
router.get('/', async (req, res, next) => {
    try {
        const allCars = await cars.getAll()
        res.status(200).json(allCars)
    } catch (err) {
        next(err)
    }
})

//#2 `[GET] /api/cars/:id` returns a car by the given id.
router.get('/:id', checkCarId, async (req, res, next) => {
    try {
        res.status(200).json(req.car)
    } catch (err) {
        next(err)
    }
})

//#3 `[POST] /api/cars` returns the created car. Leading or trailing whitespace on budget `name` should be trimmed before saving to db.
router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
    try {
        const newCar = cars.create(req.body)
        res.status(201).json(newCar)
    } catch (err) {
        next(err)
    }
})

module.exports = router;