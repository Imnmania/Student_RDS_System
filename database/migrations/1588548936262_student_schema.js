"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class StudentSchema extends Schema {
  up() {
    this.create("students", (table) => {
      table.increments();
      table.string("name", 250).notNullable();
      table.string("username", 250).notNullable().unique();
      table.string("password", 250).notNullable();
      table.string("father_name", 250).notNullable();
      table.string("mother_name", 250).notNullable();
      table.string("address", 250).notNullable();
      table.string("phone_number", 50).notNullable();
      table.string("degree", 250).notNullable();
      table.string("status", 250).notNullable();
      table.float("credit_passed", 250).notNullable();
      table.string("parent_phone", 250).notNullable();
      table.date("dob", 250).notNullable();
      table.string("sex", 250).notNullable();
      table.string("marital_status", 250).notNullable();
      table.integer("dept_id", 250).notNullable();
      table.float("cgpa", 250).notNullable();
      table.string("major", 250).notNullable();
      table.string("email", 250).notNullable().unique();

      table.timestamps();
    });
  }

  down() {
    this.drop("students");
  }
}

module.exports = StudentSchema;
