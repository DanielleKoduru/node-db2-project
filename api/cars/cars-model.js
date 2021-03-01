const db = require('../../data/db-config')

// `getAll` resolves to an array of car records (or an empty array)
const getAll = () => {
  return db
    .select("*")
    .from("cars")
}

// `getById` resolves to a car record by the given id
const getById = (id) => {
  return db
    .select("*")
    .from("cars")
    .where("id", id)
    .first(1) 
}

// `create` resolves to the newly created car record
const create = async car => {
  const [id] = await db
    .insert({
      vin: car.vin,
      make: car.make,
      model: car.model,
      mileage: car.mileage,
      title: car.title,
      transmission: car.transmission
    })
    .into("cars")

    const newCar = await db("cars")
    .where("id", id)
    .first()

  return newCar
}

module.exports = {
  getAll,
  getById,
  create,
}