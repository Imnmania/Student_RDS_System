const { hooks } = require("@adonisjs/ignitor");

const moment = require("moment");
// const Admin = use("App/Models/Admin");
// const Student = use("App/Models/Student");

hooks.after.providersBooted(async () => {
  /** @type {typeof import('@adonisjs/framework/src/View')} View */
  const View = use("View");

  const md5 = require("md5");
  View.global("getAvater", (email) => {
    const $mail = email.toLowerCase();
    return `https://www.gravatar.com/avatar/${md5($mail)}?s=300&d=mm`;
  });

  View.global("stringify", (data) => JSON.stringify(data));
  View.global("moment", moment);
  View.global("monthNameArray", [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);

  let date = new Date();
  View.global("date", date);

  // function isAdminLoggedIn() {
  //   return auth.user instanceof Admin;
  // }
  // function isStudentLoggedIn() {
  //   return auth.user instanceof Student;
  // }
  // View.global("isAdminLoggedIn", isAdminLoggedIn);
  // View.global("isStudentLoggedIn", isStudentLoggedIn);
});
