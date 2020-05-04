"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AdminSchema extends Schema {
  up() {
    this.create("admins", (table) => {
      table.increments();
      table.string("email", 250).notNullable().unique();
      table.string("username", 250).notNullable().unique();
      table.string("password", 250).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("admins");
  }
}

module.exports = AdminSchema;
