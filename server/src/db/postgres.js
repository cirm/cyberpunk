const Promise = require('bluebird');
const monitor = require('pg-monitor');
const Pgp = require('pg-promise');
const conf = require('../config');

const options = { promiseLib: Promise };
monitor.attach(options);
const pgp = new Pgp(options);

const cn = {
  host: conf.db.host,
  port: conf.db.port,
  database: conf.db.database,
  user: conf.db.pgUser,
  password: conf.db.pgPass,
};

/**
 * @typedef {Object} Db - Database access, that we're using for out app
 */
const pool = pgp(cn);

/**
 * Query postgres function (stored procedure).
 * @param {string} string - Function name to query
 * @param {string[]} [values] - Query parameters that the function accepts
 * @returns {json}
 */
const queryFunction = (string, values) => pool.func(string, values);

/**
 * Query against postgres DB
 * @type {Db.function}
 * @param {string} string - Query string
 * @param {string} [values] - Parameters for the query
 * @returns {json}
 */
const query = (string, values) => pool.query(string, values);
// const transaction = (string, values) => pool.tx(string, values);

module.exports = {
  queryFunction,
  query,
};