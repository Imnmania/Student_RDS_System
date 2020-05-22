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

          const student_grades = await Grade.query()
            .where("student_id", g.student_id)
            .with("sections")
            .with("sections.course")
            .fetch();
          let sumOfCredithrAndGrades = 0;

          console.log(JSON.stringify(student_grades.toJSON(), undefined, 4));
          student_grades.toJSON().forEach((student_grade) => {
            sumOfCredithrAndGrades +=
              student_grade.grade * student_grade.sections.course.credit_hr;
          });
          const cgpa = +parseFloat(
            sumOfCredithrAndGrades / student.credit_passed
          ).toFixed(2);
          student.cgpa = cgpa;
          await student.save();
        }
      });

    session.flash({ msg: "Graded successfully!!" });
    return response.route("faculty.dashboard");
  }

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
