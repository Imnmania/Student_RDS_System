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

    return view.render("student.enroll", { sections: sections.toJSON() });
  }

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
  }

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
