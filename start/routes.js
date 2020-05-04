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

Route.on("/register").render("auth.sign_up").as("admin.register");
Route.on("/").render("students.create").as("dashboard");
Route.on("/login").render("auth.login").as("admin.login");
Route.post("/register", "AdminController.createAdmin").as("admin.register");
Route.post("/login", "AdminController.login").as("admin.login");
