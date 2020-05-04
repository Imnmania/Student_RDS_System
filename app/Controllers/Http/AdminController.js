"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/session/src/Session')} Session */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} Auth */
const { validateAll } = use("Validator");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Admin = use("App/Models/Admin");

class AdminController {
  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Session} ctx.session
   * @param {Auth} ctx.auth
   */
  async createAdmin({ request, response, session }) {
    const numberOfAdmin = await Admin.getCount();
    if (numberOfAdmin >= 1) {
      return response.redirect("/login");
    }

    const valididation = await validateAll(request.all(), {
      email: "required|email|unique:admins,email",
      username: "required",
      password: "required",
    });
    if (valididation.fails()) {
      session.withErrors(valididation.messages()).flashAll();
      return response.redirect("back");
    }

    let { email, username, password } = request.all();
    let admin = new Admin();
    admin.fill({ email, username, password });
    await admin.save();
    session.flash({ msg: "You have been registered successfully!!" });
    return response.route("dashboard");
  }
  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Session} ctx.session
   * @param {Auth} ctx.auth
   */
  async login({ request, response, session, auth }) {
    const valididation = await validateAll(
      request.all(),
      {
        username: "required",
        password: "required",
      },
      {
        required: "{{field}} is required",
      }
    );
    if (valididation.fails()) {
      session.withErrors(valididation.messages()).flashAll();
      return response.route("admin.login");
    }
    const { username, password } = request.all();

    try {
      await auth.attempt(username, password);
    } catch (error) {
      console.error(error);
      return response.route("admin.login");
    }
    session.flash({ msg: "You have been logged in successfully!!" });

    return response.route("dasßhboard");
  }
}

module.exports = AdminController;