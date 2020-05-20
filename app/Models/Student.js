"use strict";
/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Student extends Model {
  courses() {
    return this.belongsToMany(
      "App/Models/OfferedCourse",
      "student_id",
      "offered_course_id"
    ).pivotTable("strudent_enrolled_courses");
  }

  static boot() {
    super.boot();

    this.addHook("beforeSave", async (adminInstance) => {
      if (adminInstance.dirty.password) {
        adminInstance.password = await Hash.make(adminInstance.password);
      }
    });
  }
}

module.exports = Student;
