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

const pool = pgp(cn);

/**
 * Query postgres function (stored procedure).
 * @param {string} string Function name to query
 * @param {string} values Query parameters that the function accepts
 * @returns {json}
 */
const queryFunction = async(string, values) => await pool.func(string, values);

/**
 * Query against postgres DB
 * @param {string} string Querystring
 * @param {string} values Parameters for the query
 */
const query = (string, values) => pool.query(string, values);
// const transaction = (string, values) => pool.tx(string, values);

module.exports = {
  queryFunction,
  query,
};