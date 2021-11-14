const permissions = require("../permissions.json");
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("permissions")
    .del()
    .then(function () {
      const allPermissions = Object.keys(permissions) // Oject
        .reduce((current, next) => {
          return [...current, ...permissions[next]]; // return []
        }, []);

      // Inserts seed entries
      return knex("permissions").insert(
        allPermissions.map((value, index) => {
          return { id: index + 1, name: value };
        })
      );
    });
};
