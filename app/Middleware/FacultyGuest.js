"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class FacultyGuest {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response, auth }, next) {
    let isAuthenticated = true;

    try {
      const FacultyAuthenticator = auth.authenticator("faculty");
      await FacultyAuthenticator.getUser();
      console.log("checked");
    } catch (error) {
      isAuthenticated = false;
      console.log(error);
    }

    if (isAuthenticated) {
      return response.route("faculty.dashboard");
    }

    await next();
  }
}

module.exports = FacultyGuest;
