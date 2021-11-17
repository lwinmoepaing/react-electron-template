exports.seed = function (knex) {
  function randomMinMax(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

  const [adminId, employeId] = [1, 2];
  const names = ["Mg ", "Htet ", "Hein ", "Min ", "Soe ", "Moe "];

  const getName = () => {
    return (
      names[randomMinMax(0, names.length - 1)] +
      names[randomMinMax(0, names.length - 1)] +
      names[randomMinMax(0, names.length - 1)]
    );
  };
  const password =
    "$2b$10$88FkB7OiWKon9fMurSM.0OVzy.1Pa8zjkZzOI.DGToInLOpoB5t5a";
  const profile_picture = "profile_picture.png";
  const user = (
    id,
    unique_name,
    user_name,
    password,
    phone_no,
    address,
    profile_picture,
    role_id
  ) => ({
    id,
    unique_name,
    user_name,
    password,
    phone_no,
    address,
    profile_picture,
    role_id,
  });

  const users = [
    3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  ].map((ids) =>
    user(
      ids,
      getName().toLowerCase().replace(/ /g, "") + ids,
      getName(),
      password,
      "094200592" + ids,
      "addr" + ids,
      profile_picture,
      randomMinMax(1, 2)
    )
  );
  // console.log(users);
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        user(
          1,
          "admin",
          "Admin",
          password,
          "09420059241",
          "addr",
          profile_picture,
          adminId
        ),
        user(
          2,
          "employee",
          "Employee",
          password,
          "09420059241",
          "addr",
          profile_picture,
          employeId
        ),
        ...users,
      ]);
    });
};
