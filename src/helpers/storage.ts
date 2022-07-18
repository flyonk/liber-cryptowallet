export const set = async (data: { key: string; value: string }) => {
  await localStorage.setItem(data.key, data.value);
};

export const get = async (key: string): Promise<string | null> => {
  const value = await localStorage.getItem(key);
  return value;
};

export const remove = async (key: string): Promise<void> => {
  await localStorage.removeItem(key);
};

export const clearAll = async (): Promise<void> => {
  await localStorage.clear();
};
