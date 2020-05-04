"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AttendenceSchema extends Schema {
  up() {
    this.create("attendences", (table) => {
      table.increments();
      table.integer("student_id", 11).notNullable();
      table.integer("faculty_id", 11).notNullable();
      table.string("course_id", 250).notNullable();
      table.integer("total_attendence", 11).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("attendences");
  }
}

module.exports = AttendenceSchema;
