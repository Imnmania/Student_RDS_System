"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Section = use("App/Models/Section");

/**
 * Resourceful controller for interacting with courseenrolls
 */
class CourseEnrollController {
  /**
   * Show a list of all courseenrolls.
   * GET courseenrolls
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    let sections = await Section.query().with("course").with("faculty").fetch();

    //return sections;

    return view.render("student.enroll", { sections: sections.toJSON() });
  }

  /**
   * Render a form to be used for creating a new courseenroll.
   * GET courseenrolls/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new courseenroll.
   * POST courseenrolls
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    await auth.user.courses().attach(request.all().sections);

    return response.route("mycourses");
    // const
    //return request.all();
  }

  /**
   * Display a single courseenroll.
   * GET courseenrolls/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing courseenroll.
   * GET courseenrolls/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update courseenroll details.
   * PUT or PATCH courseenrolls/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a courseenroll with id.
   * DELETE courseenrolls/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}

  async enrolledCourses({ auth, view }) {
    const courses = await auth.user
      .courses()
      .with("faculty")
      .with("course")
      .fetch();

    //return courses;
    return view.render("student.mycourses", { courses: courses.toJSON() });
  }
}

module.exports = CourseEnrollController;
