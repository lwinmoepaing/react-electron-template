
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('initial').del()
    .then(function () {
      // Inserts seed entries
      return knex('initial').insert([
        {id: 1, key: 'IS_INIT', type: "boolean", value: "false"},
        {id: 2, key: 'APP_NAME', type: "string", value: "Default App"},
      ]);
    });
};
