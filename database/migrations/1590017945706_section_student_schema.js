"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SectionStudentSchema extends Schema {
  up() {
    this.create("section_student", (table) => {
      table.increments();
      table.integer("section_id");
      table.integer("student_id");
      table.timestamps();
    });
  }

  down() {
    this.drop("section_students");
  }
}

module.exports = SectionStudentSchema;
