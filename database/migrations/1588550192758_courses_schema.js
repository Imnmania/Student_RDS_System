"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CoursesSchema extends Schema {
  up() {
    this.create("courses", (table) => {
      table.increments();
      table.string("course_id", 250).notNullable().unique();
      table.string("course_name", 250).notNullable();
      table.integer("dept_id", 250).notNullable();
      table.float("credit_hr", 11).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("courses");
  }
}

module.exports = CoursesSchema;
