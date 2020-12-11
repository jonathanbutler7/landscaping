const Service = {
  getAllTechnicians(knex) {
    return knex.select('*').from('technicians');
  },
  getById(knex, id) {
    return knex.from('technicians').where('_id', id).first();
  },
  updateTech(knex, id, body) {
    return knex('technicians').where({ _id: id }).update(body).returning('*');
  },
  deleteTech(knex, id) {
    return knex('technicians').where({ _id: id }).delete().returning('*');
  },
};

module.exports = Service;
