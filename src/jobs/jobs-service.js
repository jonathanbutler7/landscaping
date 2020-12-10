const JobsService = {
  getAllJobs(knex) {
    return knex.select('*').from('job');
  },
};

module.exports = JobsService;
