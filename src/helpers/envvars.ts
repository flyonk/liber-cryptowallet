import SentryUtil from '@/helpers/sentryUtil';

function checkEnvVarExistInDictionary(names: string[], dictionary: string[]) {
  names.forEach((name: string) => {
    if (!dictionary.includes(name)) {
      // Write to sentry that there are not declared env vars
      SentryUtil.capture(
        `Undeclared usage of env var with name: ${name}`,
        'envvars',
        'getArrayFromEnvVar'
      );
    }
  });
}

const getArrayFromEnvVar = (
  envVarKey: string,
  envVarsDictionary?: string[]
) => {
  let _envVar = process.env[envVarKey];
  if (_envVar) {
    _envVar = _envVar.replaceAll(' ', '').split(',');
    if (envVarsDictionary) {
      checkEnvVarExistInDictionary(_envVar, envVarsDictionary);
    }
    return _envVar;
  }
  return [];
};

export default getArrayFromEnvVar;
