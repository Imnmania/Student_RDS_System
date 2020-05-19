"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", ({ response }) => response.route("dashboard"));

/**
 * Admin Login
 */

Route.on("/admin/register").render("auth.sign_up").as("admin.register");
Route.post("/admin/register", "AdminController.createAdmin").as(
  "admin.register"
);
Route.on("/admin/login")
  .render("auth.login")
  .as("admin.login")
  .middleware(["Guest"]);
Route.post("/admin/login", "AdminController.login").as("admin.login");

/**
 * Student login
 */
Route.on("/student/login").render("student.login").as("student.login");
Route.post("/student/login", "StudentController.login")
  .as("student.login")
  .middleware("StudentGuest");
Route.post("/student/logout", "StudentController.logout").as("student.logout");
Route.group(() => {
  Route.on("/").render("student.dashboard").as("student.dashboard");
  Route.on("/profile").render("student.profile").as("student.profile");
})
  .prefix("student")
  .middleware(["auth:student", "StudentAuthenticated"]);

Route.group(() => {
  Route.on("/").render("dashboard").as("dashboard");

  /**
   * ---------------------------------------------------
   *      Resource: properties
   * ---------------------------------------------------
   */
  Route.resource("students", "StudentController");
  Route.resource("faculty", "FacultyController");
  Route.resource("course", "CourseController");
  Route.resource("department", "DepartmentController");
  Route.resource("offeredCourse", "OfferedCourseController");
  Route.post("/logout", "AdminController.logout").as("admin.logout");
})
  .middleware(["Authenticated"])
  .prefix("admin");

Route.group(() => {
  Route.resource("sections", "SectionController");
})
  .middleware(["Authenticated"])
  .prefix("admin/offeredCourse/:offeredCourseId");
