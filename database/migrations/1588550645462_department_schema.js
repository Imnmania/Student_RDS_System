"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class DepartmentSchema extends Schema {
  up() {
    this.create("departments", (table) => {
      table.increments();
      table.integer("dept_id", 250).notNullable().unique();
      table.string("dept_name", 250).notNullable().unique();
      table.timestamps();
    });
  }

  down() {
    this.drop("departments");
  }
}

module.exports = DepartmentSchema;
