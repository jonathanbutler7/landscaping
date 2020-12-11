const Service = {
  getAll(knex, endpoint) {
    return knex.select('*').from(endpoint);
  },
  insert(knex, newItem, endpoint) {
    return knex
      .insert(newItem)
      .into(endpoint)
      .returning('*');
  },
  getById(knex, id, endpoint) {
    return knex.from(endpoint).where('_id', id).first();
  },
  updateTech(knex, id, body, endpoint) {
    return knex(endpoint).where({ _id: id }).update(body).returning('*');
  },
  deleteTech(knex, id, endpoint) {
    return knex(endpoint).where({ _id: id }).delete().returning('*');
  },
};

module.exports = Service;
