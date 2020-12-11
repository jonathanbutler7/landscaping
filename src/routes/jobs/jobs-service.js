const JobsService = {
  getAllJobs(knex) {
    return knex.select('*').from('jobs');
  },
};

module.exports = JobsService;
