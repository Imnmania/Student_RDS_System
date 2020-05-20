"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class StrudentEnrolledCoursesSchema extends Schema {
  up() {
    this.create("strudent_enrolled_courses", (table) => {
      table.increments();
      table.integer("student_id");
      table.integer("offered_course_id");
      table.timestamps();
    });
  }

  down() {
    this.drop("strudent_enrolled_courses");
  }
}

module.exports = StrudentEnrolledCoursesSchema;
