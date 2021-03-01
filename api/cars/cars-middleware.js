const cars = require("./cars-model")
var vinValidator = require('vin-validator')

const checkCarId = async (req, res, next) => {
  try {
    const carId = await cars.getById(req.params.id)
    if (carId) {
      next();
    } else {
      res.status(404).json({
        message: `car with id ${req.params.id} is not found`
      })
    }
  } catch (err) {
    next(err)
  }
}

const checkCarPayload = async (req, res, next) => {
  if (!req.body.vin || !req.body.make || !req.body.model || !req.body.mileage)
    return res.status(400).json({
      message: "required field is missing"
    })
  next()
}

const checkVinNumberValid = async (req, res, next) => {
  try {
    const vinValid = await vinValidator.validate(req.body.vin)
    if (!vinValid) {
    return res.status(400).json({
        message: `vin ${req.body.vin} is invalid`
      })
    }
  } catch (err) {
    next(err)
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const car = await cars.getAll()
  const checkVin = car.map(car => car.vin)
  if(checkVin.includes(req.body.vin)) {
    return res.status(400).json({
      message: "vin number is not unique"
    })
  }else{
    next()
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}