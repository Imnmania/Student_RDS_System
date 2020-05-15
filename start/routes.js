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

Route.on("/register").render("auth.sign_up").as("admin.register");
Route.on("/login").render("auth.login").as("admin.login").middleware(["Guest"]);
Route.post("/register", "AdminController.createAdmin").as("admin.register");
Route.post("/login", "AdminController.login").as("admin.login");

Route.group(() => {
  Route.on("/").render("dashboard").as("dashboard");

  /**
   * ---------------------------------------------------
   *      Resource: properties
   * ---------------------------------------------------
   */
  Route.resource("students", "StudentController");
  Route.resource("faculty", "FacultyController");
  Route.post("/logout", "AdminController.logout").as("admin.logout");
})
  .middleware(["Authenticated"])
  .prefix("admin");
