"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { validateAll } = use("Validator");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Student = use("App/Models/Student");
const Department = use("App/Models/Department");

/**
 * Resourceful controller for interacting with students
 */
class StudentController {
  /**
   * Show a list of all students.
   * GET students
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    let students = await Student.all();
    return view.render("students.index", { students });
  }

  /**
   * Render a form to be used for creating a new student.
   * GET students/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    const departments = await Department.all();
    return view.render("students.create", { departments });
  }

  /**
   * Create/save a new student.
   * POST students
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, session }) {
    const valididation = await validateAll(request.all(), {
      email: "required|email|unique:students,email",
      username: "required|unique:students,username",
      password: "required",
      name: "required",
      father_name: "required",
      mother_name: "required",
      address: "required",
      phone_number: "required",
      degree: "required",
      status: "required",
      credit_passed: "required",
      parent_phone: "required",
      dob: "required",
      sex: "required",
      marital_status: "required",
      dept_id: "required",
      cgpa: "required",
    });

    if (valididation.fails()) {
      session.withErrors(valididation.messages()).flashAll();
      session.flash({ error: "You have some validation error" });
      return response.redirect("back");
    }

    delete request.all()._csrf;
    await Student.create(request.all());
    session.flash({ msg: "You have been registered successfully!!" });
    return response.route("students.index");
  }

  /**
   * Display a single student.
   * GET students/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    let student = await Student.find(params.id);
    const date = new Date(student.dob);
    const datetoISODate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    student.dob = datetoISODate;
    return view.render("students.show", { student: student.toJSON() });
  }

  /**
   * Render a form to update an existing student.
   * GET students/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
    let student = await Student.find(params.id);
    const departments = await Department.all();
    const date = new Date(student.dob).toISOString();
    const datetoISODate = date.split("T")[0];

    student.dob = datetoISODate;

    return view.render("students.edit", {
      student: student.toJSON(),
      departments: departments.toJSON(),
    });
  }

  /**
   * Update student details.
   * PUT or PATCH students/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, session }) {
    const valididation = await validateAll(request.all(), {
      email: `required|email|unique:students,email,id,${params.id}`,
      username: `required|unique:students,username,id,${params.id}`,
      password: "required",
      name: "required",
      father_name: "required",
      mother_name: "required",
      address: "required",
      phone_number: "required",
      degree: "required",
      status: "required",
      credit_passed: "required",
      parent_phone: "required",
      dob: "required",
      sex: "required",
      marital_status: "required",
      dept_id: "required",
      cgpa: "required",
    });

    if (valididation.fails()) {
      session.withErrors(valididation.messages()).flashAll();
      console.log(valididation.messages());
      return response.redirect("back");
    }

    delete request.all()._method;
    delete request.all()._csrf;

    if (!request.all().password) delete request.all().password; // skip when password is empty

    let student = await Student.find(params.id);
    student.merge(request.all());
    await student.save();
    return response.route("students.index");
  }

  /**
   * Delete a student with id.
   * DELETE students/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response, session }) {
    let student = await Student.find(params.id);
    await student.delete();
    session.flash({ msg: "Successfully deleted!" });
    return response.route("students.index");
  }
}

module.exports = StudentController;
