"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class StudentGuest {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response, auth }, next) {
    let isAuthenticated = true;

    try {
      const StudentAuthenticator = auth.authenticator("student");
      await StudentAuthenticator.getUser();
      console.log("checked");
    } catch (error) {
      isAuthenticated = false;
      console.log(error);
    }

    if (isAuthenticated) {
      return response.route("student.dashboard");
    }

    await next();
  }
}

module.exports = StudentGuest;
