"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class OfferedCourse extends Model {
  students() {
    return this.belongsToMany(
      "App/Models/OfferedCourse",
      "offered_course_id",
      "student_id"
    ).pivotTable("strudent_enrolled_courses");
  }

  sections() {
    return this.hasMany("App/Models/Section", "id", "offered_course_id");
  }
}

module.exports = OfferedCourse;
