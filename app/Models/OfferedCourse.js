"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class OfferedCourse extends Model {
  sections() {
    return this.hasMany("App/Models/Section", "id", "offered_course_id");
  }
}

module.exports = OfferedCourse;
