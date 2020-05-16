"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { validateAll } = use("Validator");

const Course = use("App/Models/Course");
const Department = use("App/Models/Department");

/**
 * Resourceful controller for interacting with courses
 */
class CourseController {
  /**
   * Show a list of all courses.
   * GET courses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    let courses = await Course.all();
    return view.render("course.index", { courses });
  }

  /**
   * Render a form to be used for creating a new course.
   * GET courses/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    const departments = await Department.all();
    return view.render("course.create", { departments });
  }

  /**
   * Create/save a new course.
   * POST courses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, session }) {
    const valididation = await validateAll(request.all(), {
      course_id: "required|unique:courses,course_id",
      course_name: "required",
      credit_hr: "required",
      dept_id: "required",
    });

    if (valididation.fails()) {
      session.withErrors(valididation.messages()).flashAll();
      session.flash({ error: "You have some validation error" });
      return response.redirect("back");
    }

    delete request.all()._csrf;
    await Course.create(request.all());
    session.flash({ msg: "Course has been created." });
    return response.route("course.index");
  }

  /**
   * Display a single course.
   * GET courses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    let courses = await Course.find(params.id);

    return view.render("course.show", { course: courses.toJSON() });
  }

  /**
   * Render a form to update an existing course.
   * GET courses/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
    let courses = await Course.find(params.id);
    return view.render("course.edit", { course: courses.toJSON() });
  }

  /**
   * Update course details.
   * PUT or PATCH courses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, session }) {
    const valididation = await validateAll(request.all(), {
      course_id: `required|unique:courses,course_id,id,${params.id}`,
      course_name: "required",
      credit_hr: "required",
      dept_id: "required",
    });

    if (valididation.fails()) {
      session.withErrors(valididation.messages()).flashAll();
      session.flash({ error: "You have some validation error" });
      return response.redirect("back");
    }
    delete request.all()._method;
    delete request.all()._csrf;

    let courses = await Course.find(params.id);
    courses.merge(request.all());
    await courses.save();
    session.flash({ msg: "Course have been updated" });
    return response.route("course.index");
  }

  /**
   * Delete a course with id.
   * DELETE courses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response, session }) {
    let course = await Course.find(params.id);
    await course.delete();
    session.flash({ msg: "Successfully deleted!" });
    return response.route("course.index");
  }
}

module.exports = CourseController;
