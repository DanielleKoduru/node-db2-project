exports.up = async function (knex) {
  await knex.schema.createTable("cars", (table) => {
    table.increments("id")
    table.string("vin").required().unique()
    table.string("make").required()
    table.string("model").required()
    table.float("mileage").required()
    table.string("title")
    table.string("transmission")
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
