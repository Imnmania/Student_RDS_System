"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { validateAll } = use("Validator");

const Faculty = use("App/Models/Faculty");
const Section = use("App/Models/Section");

/**
 * Resourceful controller for interacting with sections
 */
class SectionController {
  /**
   * Show a list of all sections.
   * GET sections
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Render a form to be used for creating a new section.
   * GET sections/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view, params }) {
    const faculties = await Faculty.all();

    return view.render("sections.create", {
      offeredCourseId: params.offeredCourseId,
      faculties: faculties.toJSON(),
    });
  }

  /**
   * Create/save a new section.
   * POST sections
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, params, session }) {
    const valididation = await validateAll(request.all(), {
      name: "required",
      time: "required",
      room_no: "required",
    });

    if (valididation.fails()) {
      session.withErrors(valididation.messages()).flashAll();
      session.flash({ error: "You have some validation error" });
      return response.redirect("back");
    }

    delete request.all()._csrf;
    await Section.create(request.all());
    session.flash({ msg: "Section has been created." });
    return response.route("offeredCourse.show", {
      id: request.all().offered_course_id,
    });
  }

  /**
   * Display a single section.
   * GET sections/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing section.
   * GET sections/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update section details.
   * PUT or PATCH sections/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a section with id.
   * DELETE sections/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}

  async enrolledStudents({ params, view }) {
    const section = await Section.query().where("id", params.section_id).last();

    const students = await section.students().fetch();

    return view.render("facultyPortal.enrollStudents", {
      students: students.toJSON(),
    });
  }
}

module.exports = SectionController;
