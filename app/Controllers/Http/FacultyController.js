"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const { validateAll } = use("Validator");

const Faculty = use("App/Models/Faculty");
const Department = use("App/Models/Department");

/**
 * Resourceful controller for interacting with faculties
 */
class FacultyController {
  /**
   * Show a list of all faculties.
   * GET faculties
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    let faculties = await Faculty.all();
    return view.render("faculty.index", { faculties });
  }

  /**
   * Render a form to be used for creating a new faculty.
   * GET faculties/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    const departments = await Department.all();
    return view.render("faculty.create", { departments });
  }

  /**
   * Create/save a new faculty.
   * POST faculties
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, session }) {
    const valididation = await validateAll(request.all(), {
      email: "required|email|unique:faculties,email",
      username: "required|unique:faculties,username",
      password: "required",
      name: "required",
      guardian_name: "required",
      address: "required",
      phone_number: "required",
      qualification: "required",
      sex: "required",
      dob: "required",
      doj: "required",
      status: "required",
      salary: "required",
      marital_status: "required",
      dept_id: "required",
    });

    if (valididation.fails()) {
      session.withErrors(valididation.messages()).flashAll();
      session.flash({ error: "You have some validation error" });
      return response.redirect("back");
    }

    delete request.all()._csrf;
    await Faculty.create(request.all());
    session.flash({
      msg: `Faculty registered successfully for username: ${
        request.all().username
      } and password: ${request.all().password}`,
    });
    return response.route("faculty.index");
  }

  /**
   * Display a single faculty.
   * GET faculties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    let faculties = await Faculty.find(params.id);

    return view.render("faculty.show", { faculty: faculties.toJSON() });
  }

  /**
   * Render a form to update an existing faculty.
   * GET faculties/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
    let faculties = await Faculty.find(params.id);
    const departments = await Department.all();

    return view.render("faculty.edit", {
      faculty: faculties.toJSON(),
      departments: departments.toJSON(),
    });
  }

  /**
   * Update faculty details.
   * PUT or PATCH faculties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, session }) {
    const valididation = await validateAll(request.all(), {
      email: `required|email|unique:faculties,email,id,${params.id}`,
      username: `required|unique:faculties,username,id,${params.id}`,
      password: "required",
      name: "required",
      guardian_name: "required",
      address: "required",
      phone_number: "required",
      qualification: "required",
      sex: "required",
      dob: "required",
      doj: "required",
      status: "required",
      salary: "required",
      marital_status: "required",
      dept_id: "required",
    });

    if (valididation.fails()) {
      session.withErrors(valididation.messages()).flashAll();
      session.flash({ error: "You have some validation error" });
      return response.redirect("back");
    }

    delete request.all()._method;
    delete request.all()._csrf;

    if (!request.all().password) delete request.all().password; // skip when password is empty

    let faculties = await Faculty.find(params.id);
    faculties.merge(request.all());
    await faculties.save();
    session.flash({
      msg: `Faculty registered successfully for username: ${
        request.all().username
      } and password: ${request.all().password}`,
    });
    return response.route("faculty.index");
  }

  /**
   * Delete a faculty with id.
   * DELETE faculties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response, session }) {
    let faculty = await Faculty.find(params.id);
    await faculty.delete();
    session.flash({ msg: "Successfully deleted!" });
    return response.route("faculty.index");
  }

  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {auth} crx.auth
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
      return response.route("faculty.login");
    }
    const { username, password } = request.all();

    try {
      const facultyAuthenticator = auth.authenticator("faculty");
      await facultyAuthenticator.attempt(username, password);
      return response.route("faculty.dashboard");
    } catch (error) {
      session.flash({ error: error.message.split(":")[1] });
      return response.route("faculty.login");
    }
  }

  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Session} ctx.session
   * @param {Auth} ctx.auth
   */
  async logout({ auth, response }) {
    await auth.logout();
    return response.route("faculty.login");
  }

  async courses({ auth, view }) {
    const mycourses = await auth.user.courses().with("course").fetch();
    //return mycourses;
    return view.render("facultyPortal.dashboard", {
      mycourses: mycourses.toJSON(),
    });
  }
}

module.exports = FacultyController;
