const permissions = require("../../../constant/permissions.json");
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("permissions_users")
    .del()
    .then(function () {
      const allPermissions = Object.keys(permissions) // Oject
        .reduce((current, next) => {
          return [...current, ...permissions[next]]; // return []
        }, []);

      // Inserts seed entries
      return knex("permissions_users").insert(
        allPermissions.map((value, index) => {
          return { permission_id: index + 1, user_id: 1 };
        })
      );
    });
};
