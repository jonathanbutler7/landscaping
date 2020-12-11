const CustomersService = {
  getAllCustomers(knex) {
    return knex.select('*').from('customers');
  },
};

module.exports = CustomersService;
