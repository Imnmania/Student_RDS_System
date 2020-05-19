"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Faculty extends Model {
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
}

module.exports = Faculty;
