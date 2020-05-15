"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const { validateAll } = use("Validator");

const Faculty = use("App/Models/Faculty");

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
    return view.render("faculty.create");
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
      username: "required",
      password: "required",
      name: "required",
      guardian_name: "required",
      address: "required",
      phone_number: "required",
      qualification: "required",
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
    session.flash({ msg: "Faculty has been created." });
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
    return view.render("faculty.edit", { faculty: faculties.toJSON() });
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
      email: "required|email",
      username: "required",
      password: "required",
      name: "required",
      guardian_name: "required",
      address: "required",
      phone_number: "required",
      qualification: "required",
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
    session.flash({ msg: "Faculty have been updated" });
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
}

module.exports = FacultyController;
