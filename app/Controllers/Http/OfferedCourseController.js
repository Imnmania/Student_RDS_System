"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { validateAll } = use("Validator");

const Course = use("App/Models/Course");
const OfferedCourse = use("App/Models/OfferedCourse");

/**
 * Resourceful controller for interacting with offeredcourses
 */
class OfferedCourseController {
  /**
   * Show a list of all offeredcourses.
   * GET offeredcourses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    let offeredCourses = await OfferedCourse.all();
    return view.render("offeredCourse.index", { offeredCourses });
  }

  /**
   * Render a form to be used for creating a new offeredcourse.
   * GET offeredcourses/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    const courses = await Course.all();
    return view.render("offeredCourse.create", { courses });
  }

  /**
   * Create/save a new offeredcourse.
   * POST offeredcourses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, session }) {
    const valididation = await validateAll(request.all(), {
      course_id: "required",
      semester: "required",
    });

    if (valididation.fails()) {
      session.withErrors(valididation.messages()).flashAll();
      session.flash({ error: "You have some validation error" });
      return response.redirect("back");
    }

    delete request.all()._csrf;
    await OfferedCourse.create(request.all());
    session.flash({ msg: "Course has been created." });
    return response.route("offeredCourse.index");
  }

  /**
   * Display a single offeredcourse.
   * GET offeredcourses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.reques
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    let course = await OfferedCourse.find(params.id);
    let sections = await course.sections().with("faculty").fetch();
    return view.render("offeredCourse.show", {
      course: course.toJSON(),
      sections: sections.toJSON(),
    });
  }

  /**
   * Render a form to update an existing offeredcourse.
   * GET offeredcourses/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
    let courseid = await Course.all();
    let courses = await OfferedCourse.find(params.id);
    return view.render("offeredCourse.edit", {
      course: courses.toJSON(),
      id: courseid.toJSON(),
    });
  }

  /**
   * Update offeredcourse details.
   * PUT or PATCH offeredcourses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, session }) {
    const valididation = await validateAll(request.all(), {
      course_id: `required`,
      semester: "required",
    });

    if (valididation.fails()) {
      session.withErrors(valididation.messages()).flashAll();
      session.flash({ error: "You have some validation error" });
      return response.redirect("back");
    }
    delete request.all()._method;
    delete request.all()._csrf;

    let courses = await OfferedCourse.find(params.id);
    courses.merge(request.all());
    await courses.save();
    session.flash({ msg: "Course have been updated" });
    return response.route("offeredCourse.index");
  }

  /**
   * Delete a offeredcourse with id.
   * DELETE offeredcourses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response, session }) {
    let course = await OfferedCourse.find(params.id);
    await course.delete();
    session.flash({ msg: "Successfully deleted!" });
    return response.route("offeredCourse.index");
  }
}

module.exports = OfferedCourseController;
