//TODO: Add a compliance check (/^\+[0-9]*$/);
export const formatPhoneNumber = (number?: string) => {
  if (!number) return;

  const deleteCharactersRegExp = new RegExp(/(\(|\)|#|-|\s)/, 'g');

  return number.replaceAll(deleteCharactersRegExp, '');
};
