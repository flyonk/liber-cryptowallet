const fs = require('fs');
const path = require('path');
const envfile = require('envfile');

const DEFAULT_ENV_JSON_FILENAME = 'env.json';
const DEFAULT_ENV_FILENAME = '.env';
const DEFAULT_ENCODING = 'utf8';
const DEFAULT_PREFIX = 'VUE_APP_';

/**
 *
 * @typedef  {{path?:string, envPath?:string, encoding?:string, prefix?:string, debug?:boolean}} envVarOptions
 */

/**
 *  Load the passed JSON file synchronously and set up environment vars
 *  NOTE: it's important to do this synchronously so that subsequent
 *  code can rely on the environment variables existing.
 * @param {envVarOptions=} options
 * @returns {{status:boolean, messages?:string[], error?:object}}
 */
const load = (options) => {
  const { jsonPath, encoding, envPath } = parseOptions(options);
  try {
    const envString = fs.readFileSync(jsonPath, encoding);
    const envJson = JSON.parse(envString);
    const messages = setEnvVars(envJson);
    writeEnvVars(envPath, envJson);
    const debugMessages = ['>>>debug mode<<<', ...messages];
    return { status: true, messages: debugMessages };
  } catch (err) {
    return { status: false, error: err };
  }
};

/**
 * Read each top level key in the passed Json object
 * create the environment variable with the contents of the passed object's
 * key value
 * write in the original .env file
 * @param {String} sourcePath path to env file to write
 * @param {Object} envObject object that contain env vars retrieved from external url
 */
const writeEnvVars = (sourcePath, envObject) => {
  let parsedFile = envfile.parse(sourcePath);
  for (const key in envObject) {
    parsedFile[`${DEFAULT_PREFIX}${key}`] = JSON.stringify(envObject[key]);
  }
  fs.writeFileSync(sourcePath, envfile.stringify(parsedFile));
};

/**
 * Read each top level key in the passed Json object
 * create the environment variable with the contents of the passed object's
 * key value.
 * @param {Object} envJson
 * @returns array of messages (suitable for debugging)
 */
const setEnvVars = (envJson) => {
  const msg = [];
  const envObject = {};
  for (const key in envJson) {
    process.env[`${DEFAULT_PREFIX}${key}`] = JSON.stringify(envJson[key]);
    envObject[`${DEFAULT_PREFIX}${key}`] = JSON.stringify(envJson[key]);
    msg.push(`>>>Creating ${DEFAULT_PREFIX}${key}`);
  }
  return msg;
};

/**
 * Parse the options object and set up defaults for any optional properties
 * that aren't explicitly set
 * @param {envVarOptions} options
 */
const parseOptions = (options) => {
  const jsonPath = (options && options.path) || getDefaultPath();
  const envPath = (options && options.envPath) || getDefaultEnvPath();
  const encoding = (options && options.encoding) || DEFAULT_ENCODING;
  const prefix = (options && options.prefix) || DEFAULT_PREFIX;
  return { jsonPath, encoding, prefix, envPath };
};

/**  When no path is passed used the project's folder and file named DEFAULT_ENV_JSON_FILENAME
 */
const getDefaultPath = () =>
  path.resolve(process.cwd(), DEFAULT_ENV_JSON_FILENAME);

const getDefaultEnvPath = () =>
  path.resolve(process.cwd(), DEFAULT_ENV_FILENAME);

module.exports = {
  load,
  DEFAULT_ENV_JSON_FILENAME,
  DEFAULT_ENCODING,
  DEFAULT_PREFIX,
};
