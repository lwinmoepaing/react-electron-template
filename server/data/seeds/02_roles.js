
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        {id: 1, name: 'Admin', mm_name: 'အက်ဒမင်'},
        {id: 2, name: 'Employee', mm_name: 'ဝန်ထမ်း'},
      ]);
    });
};
