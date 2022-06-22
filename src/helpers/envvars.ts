const getArrayFromEnvVar = (envVarKey: string) => {
  let _envVar = process.env[envVarKey];
  if (_envVar) {
    _envVar = _envVar.replaceAll(' ', '').split(',');
  }
  return _envVar || [];
};

export default getArrayFromEnvVar;
