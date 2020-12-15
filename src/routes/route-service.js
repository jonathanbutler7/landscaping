const RouteService = {
  getAll(knex, table) {
    return knex.select('*').from(table);
  },
  insert(knex, newItem, table) {
    return knex.insert(newItem).into(table).returning('*');
  },
  getById(knex, id, table) {
    return knex.from(table).select('*').where('_id', id).returning('*');
  },
  getByEmail(knex, email, table) {
    return knex.from(table).select('*').where('email', email).returning('*');
  },
  update(knex, id, body, table) {
    return knex(table).where({ _id: id }).update(body).returning('*');
  },
  delete(knex, id, table) {
    console.log(id)
    return knex(table).where({ _id: id }).delete().returning('*');
  },
};

module.exports = RouteService;
