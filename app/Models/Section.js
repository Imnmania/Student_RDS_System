"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Section extends Model {
  faculty() {
    return this.belongsTo("App/Models/Faculty");
  }

  course() {
    return this.belongsTo("App/Models/OfferedCourse", "offered_course_id");
  }
}

module.exports = Section;
