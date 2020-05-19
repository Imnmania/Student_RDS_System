"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OfferedCoursesSchema extends Schema {
  up() {
    this.create("offered_courses", (table) => {
      table.increments();
      table.string("course_id", 250).notNullable();
      table.string("semester", 250).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("offered_courses");
  }
}

module.exports = OfferedCoursesSchema;
