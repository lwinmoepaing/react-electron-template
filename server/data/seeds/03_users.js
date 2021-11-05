exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          unique_name: "admin",
          user_name: "Admin",
          password: "123456",
          phone_no: "09",
          address: "",
          profile_picture: "profile_picture",
          role_id: "1",
        },
        {
          id: 2,
          unique_name: "staff",
          user_name: "Staff",
          password: "123456",
          phone_no: "09",
          address: "",
          profile_picture: "profile_picture",
          role_id: "2",
        },
      ]);
    });
};
