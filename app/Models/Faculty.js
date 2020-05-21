"use strict";

const Hash = use("Hash");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Faculty extends Model {
  courses() {
    return this.hasMany("App/Models/Section");
  }
  static get dates() {
    return super.dates.concat(["dob", "doj"]);
  }
  static castDates(field, value) {
    if (field === "dob") {
      return `${value.format("YYYY-MM-DD")}`;
    }
    if (field === "doj") {
      return `${value.format("YYYY-MM-DD")}`;
    }
    return super.formatDates(field, value);
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

module.exports = Faculty;
