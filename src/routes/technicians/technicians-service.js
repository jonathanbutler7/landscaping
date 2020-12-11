const TechniciansService = {
  getAllTechnicians(knex) {
    return knex.select('*').from('technicians');
  },
};

module.exports = TechniciansService;
