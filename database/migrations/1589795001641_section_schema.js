"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SectionSchema extends Schema {
  up() {
    this.create("sections", (table) => {
      table.increments();
      table.string("name");
      table.string("room_no");
      table.string("time");
      table.integer("faculty_id");
      table.integer("offered_course_id");

      // table.foreign("faculty_id").references("faculties.id");
      // table.foreign("offered_course_id").references("offered_courses.id");
      table.timestamps();
    });
  }

  down() {
    this.drop("sections");
  }
}

module.exports = SectionSchema;
