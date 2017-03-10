const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const Bluebird = require('bluebird');
const sinonAsPromised = require('sinon-as-promised')(Bluebird);

chai.use(chaiAsPromised);
