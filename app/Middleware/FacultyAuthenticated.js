"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class FacultyAuthenticated {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response, auth, session }, next) {
    try {
      await auth.check();
    } catch (error) {
      // session.put('redirect_to', request.url())
      response.route("faculty.login");
    }
    await next();
  }
}

module.exports = FacultyAuthenticated;