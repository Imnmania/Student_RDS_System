"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FacultySchema extends Schema {
  up() {
    this.create("faculties", (table) => {
      table.increments();
      table.string("name", 250).notNullable();
      table.string("username", 250).notNullable().unique();
      table.string("password", 250).notNullable();
      table.string("address", 250).notNullable();
      table.string("sex", 250).notNullable();
      table.date("dob", 250).notNullable();
      table.date("doj", 250).notNullable();
      table.string("phone_number", 50).notNullable();
      table.string("qualification", 250).notNullable();
      table.string("guardian_name", 250).notNullable();
      table.string("marital_status", 250).notNullable();
      table.integer("dept_id", 250).notNullable();
      table.string("status", 250).notNullable();
      table.string("email", 250).notNullable().unique();
      table.float("salary", 250).notNullable();

      table.timestamps();
    });
  }

  down() {
    this.drop("faculties");
  }
}

module.exports = FacultySchema;
