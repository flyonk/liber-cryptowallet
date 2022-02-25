import axios from 'axios';
import { ICountryInformation } from '@/types/country-phone-types';

export const getFullList = async (): Promise<ICountryInformation[]> => {
  const { data } = await axios.get('/country_dial_info.json');
  return data;
};
