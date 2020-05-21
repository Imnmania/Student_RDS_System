"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Grade extends Model {
  sections() {
    return this.belongsTo("App/Models/Section", "section_id", "id");
  }
}

module.exports = Grade;
