"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CoursesRecordSchema extends Schema {
  up() {
    this.create("courses_records", (table) => {
      table.increments();
      table.integer("student_id", 11).notNullable();
      table.integer("faculty_id", 11).notNullable();
      table.string("course_id", 250).notNullable();
      table.string("semester", 250).notNullable();
      table.string("grade", 250).notNullable();
      table.float("grade_point", 250).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("courses_records");
  }
}

module.exports = CoursesRecordSchema;
