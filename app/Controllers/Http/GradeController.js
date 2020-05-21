"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const { validateAll } = use("Validator");

const Student = use("App/Models/Student");
const Section = use("App/Models/Section");
const Grade = use("App/Models/Grade");
const OfferCourse = use("App/Models/OfferedCourse");
const Course = use("App/Models/Course");

/**
 * Resourceful controller for interacting with grades
 */
class GradeController {
  /**
   * Show a list of all grades.
   * GET grades
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Render a form to be used for creating a new grade.
   * GET grades/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new grade.
   * POST grades
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, params, session }) {
    const student = request.all().student;
    let error = false;
    student.forEach((stud) => {
      if (stud.grade == "") {
        session.flash({
          error: `please enter a grade for student id ${stud.student_id}`,
        });
        error = true;
      }
    });
    if (error) return response.redirect("back");
    delete request.all()._csrf;
    delete request.all().table_length;
    const grades = request
      .all()
      .student.map((stud) => ({ ...stud, section_id: +params.section_id }));
    try {
      await Grade.createMany(grades);
    } catch (error) {
      session.flash({
        error,
      });
      return response.redirect("back");
    }

    Section.query()
      .where("id", +params.section_id)
      .with("course")
      .last()
      .then(async (sections) => {
        const sect = sections.toJSON();
        for (const g of grades) {
          const student = await Student.find(g.student_id);
          student.credit_passed = parseFloat(
            student.credit_passed + sect.course.credit_hr
          );
          await student.save();
        }
      });

    session.flash({ msg: "Graded successfully!!" });
    return response.route("faculty.dashboard");
  }

  /**
   * Display a single grade.
   * GET grades/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing grade.
   * GET grades/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update grade details.
   * PUT or PATCH grades/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a grade with id.
   * DELETE grades/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}

  async assignGrade({ auth, view, params }) {
    const section = await Section.query().where("id", params.section_id).last();
    const students = await section.students().fetch();
    return view.render("facultyPortal.assigngrade", {
      students: students.toJSON(),
      section_id: params.section_id,
    });
  }
}

module.exports = GradeController;
