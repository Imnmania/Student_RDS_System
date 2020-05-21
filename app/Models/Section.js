"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Section extends Model {
  faculty() {
    return this.belongsTo("App/Models/Faculty");
  }

  course() {
    return this.belongsTo(
      "App/Models/OfferedCourse",
      "offered_course_id",
      "id"
    );
  }
  students() {
    return this.belongsToMany("App/Models/Student");
  }
  grades() {
    return this.hasMany("App/Models/Grade");
  }
}

module.exports = Section;
