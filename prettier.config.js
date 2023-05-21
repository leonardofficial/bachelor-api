/**
 * Changes should be made when possible to the global prettier configuration directly
 * Only add project specific overrides here
 *
 * Allows to override prettier configuration.
 * See https://prettier.io/docs/en/configuration.html
 */

module.exports = {
  // eslint-disable-next-line import/no-extraneous-dependencies,global-require
  ...require('@blacklusion/prettier-config'),
  // custom config here e.g.
  // semi: false,
};
